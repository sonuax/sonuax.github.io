const express = require('express');
const cors    = require('cors');
const admin   = require('firebase-admin');

// ============================================================
// Ініціалізація Firebase Admin SDK
// serviceAccountKey.json — завантажити з:
// Firebase Console → Project Settings → Service Accounts → Generate new private key
// ============================================================
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db  = admin.firestore();
const app = express();

// ============================================================
// Middleware
// ============================================================
app.use(cors());              // дозволяємо запити з фронтенду
app.use(express.json());      // парсимо JSON у тілі запитів
app.use(express.static('public')); // хостинг статичних файлів (Завдання 1)

// ============================================================
// Перевірка роботи сервера
// GET /api/message → { message: "Hello from the backend!" }
// ============================================================
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// ============================================================
// Завдання 2, 3: Маршрути для пройдених уроків
// Колекція Firestore: "completedLessons"
// Документ: { userId, lessonId, lessonTitle, completedAt }
// ============================================================

// GET /api/lessons/completed?userId=...
// Отримати всі пройдені уроки користувача, відсортовані за датою (нові спочатку)
app.get('/api/lessons/completed', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId є обовязковим параметром' });
  }

  try {
    const snapshot = await db
      .collection('completedLessons')
      .where('userId', '==', userId)
      .orderBy('completedAt', 'desc')   // сортування за датою проходження
      .get();

    const lessons = [];
    snapshot.forEach(doc => {
      lessons.push({ id: doc.id, ...doc.data() });
    });

    res.json(lessons);
  } catch (err) {
    console.error('GET /api/lessons/completed error:', err);
    res.status(500).json({ error: 'Помилка отримання даних' });
  }
});

// POST /api/lessons/completed
// Зберегти інформацію про пройдений урок з датою проходження
// Body: { userId, lessonId, lessonTitle }
app.post('/api/lessons/completed', async (req, res) => {
  const { userId, lessonId, lessonTitle } = req.body;

  // Валідація вхідних даних
  if (!userId || !lessonId || !lessonTitle) {
    return res.status(400).json({ error: 'userId, lessonId та lessonTitle є обовязковими' });
  }

  try {
    // Перевіряємо чи урок вже позначено як пройдений
    const existing = await db
      .collection('completedLessons')
      .where('userId', '==', userId)
      .where('lessonId', '==', lessonId)
      .get();

    if (!existing.empty) {
      // Якщо вже існує — видаляємо (toggle: зняти позначку)
      const docId = existing.docs[0].id;
      await db.collection('completedLessons').doc(docId).delete();
      return res.json({ action: 'removed', lessonId });
    }

    // Зберігаємо новий запис з датою проходження
    const newDoc = {
      userId,
      lessonId,
      lessonTitle,
      completedAt: new Date().toISOString(), // дата проходження у форматі ISO 8601
    };

    const ref = await db.collection('completedLessons').add(newDoc);
    res.status(201).json({ action: 'added', id: ref.id, ...newDoc });
  } catch (err) {
    console.error('POST /api/lessons/completed error:', err);
    res.status(500).json({ error: 'Помилка збереження даних' });
  }
});

// ============================================================
// Захищений маршрут (Завдання 3 із порядку виконання)
// GET /api/protected — доступний тільки з валідним Firebase токеном
// ============================================================
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

app.get('/api/protected', verifyToken, (req, res) => {
  res.json({
    message: 'You have accessed a protected route!',
    user: req.user,
  });
});

// ============================================================
// Запуск сервера
// ============================================================
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
