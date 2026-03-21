// ============================================================
// firebase.js — Налаштування Firebase
//
// ІНСТРУКЦІЯ ДЛЯ ПІДКЛЮЧЕННЯ РЕАЛЬНОГО FIREBASE:
// 1. Зареєструйтесь на https://firebase.google.com/
// 2. Створіть проєкт у Firebase Console
// 3. Увімкніть Authentication → Sign-in method → Email/Password
// 4. Увімкніть Firestore Database
// 5. Замініть значення у firebaseConfig на свої (з Project Settings)
// 6. Розкоментуйте блок "РЕАЛЬНИЙ FIREBASE" нижче
// 7. Видаліть блок "СИМУЛЯЦІЯ FIREBASE"
// ============================================================

// ------ РЕАЛЬНИЙ FIREBASE (розкоментувати після налаштування) ------
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
//
// const firebaseConfig = {
//   apiKey:            "YOUR_API_KEY",
//   authDomain:        "YOUR_AUTH_DOMAIN",
//   projectId:         "YOUR_PROJECT_ID",
//   storageBucket:     "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId:             "YOUR_APP_ID",
//   measurementId:     "YOUR_MEASUREMENT_ID",   // необов'язково
// };
//
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db   = getFirestore(app);
// -------------------------------------------------------------------


// ============================================================
// СИМУЛЯЦІЯ FIREBASE (лише для локальної розробки без мережі)
// Повністю відтворює поведінку Firebase Auth та Firestore.
// ============================================================

// ---------- Auth simulation ----------
const _users = {};          // email → { uid, email, password, displayName }
let   _currentUser = null;
const _authListeners = [];

function _notifyAuth() {
  _authListeners.forEach(fn => fn(_currentUser));
}

export const auth = {
  /**
   * Відповідає firebase/auth → onAuthStateChanged(auth, callback)
   * Викликає callback одразу з поточним станом і при кожній зміні.
   */
  onAuthStateChanged: (callback) => {
    _authListeners.push(callback);
    callback(_currentUser);
    return () => {
      const idx = _authListeners.indexOf(callback);
      if (idx > -1) _authListeners.splice(idx, 1);
    };
  },

  /**
   * Відповідає firebase/auth → createUserWithEmailAndPassword(auth, email, password)
   */
  createUserWithEmailAndPassword: async (email, password) => {
    if (!email || !password) throw new Error("Email та пароль обов'язкові");
    if (password.length < 6) throw new Error('Пароль має містити щонайменше 6 символів');
    if (_users[email]) throw new Error('Користувач з таким email вже існує');
    const uid = 'uid_' + Math.random().toString(36).slice(2, 10);
    _users[email] = { uid, email, password, displayName: email.split('@')[0] };
    _currentUser = { uid: _users[email].uid, email, displayName: _users[email].displayName };
    _notifyAuth();
    return { user: _currentUser };
  },

  /**
   * Відповідає firebase/auth → signInWithEmailAndPassword(auth, email, password)
   */
  signInWithEmailAndPassword: async (email, password) => {
    const u = _users[email];
    if (!u || u.password !== password) throw new Error('Невірний email або пароль');
    _currentUser = { uid: u.uid, email: u.email, displayName: u.displayName };
    _notifyAuth();
    return { user: _currentUser };
  },

  /**
   * Відповідає firebase/auth → signOut(auth)
   */
  signOut: async () => {
    _currentUser = null;
    _notifyAuth();
  },
};

// ---------- Firestore simulation ----------
const _db = {
  lessons: [
    { id: 'l1', module: 0, title: 'Трикутник експозиції',            type: 'Відео',         duration: '18 хв', difficulty: 'easy',   diffLabel: 'Початківець', module_label: 'Модуль 1', img: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=600&q=80', desc: 'Витримка, діафрагма та ISO — як три параметри визначають результат знімка.',         full: 'Детально розглядаємо кожен елемент трикутника: витримка, діафрагма, ISO. Практичні вправи у режимі M.' },
    { id: 'l2', module: 0, title: "Типи об'єктивів та їх використання", type: 'Відео',       duration: '22 хв', difficulty: 'easy',   diffLabel: 'Початківець', module_label: 'Модуль 1', img: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=600&q=80', desc: "Прайм vs зум — який обрати для вашого жанру.",                                      full: "Від 14мм до 400мм. Розбираємо фокусний діапазон та вплив на перспективу." },
    { id: 'l3', module: 1, title: 'Правило третин та золота спіраль', type: 'Відео',         duration: '24 хв', difficulty: 'easy',   diffLabel: 'Початківець', module_label: 'Модуль 2', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80', desc: 'Правило третин, золота спіраль та провідні лінії.',                                  full: 'Класичні правила побудови кадру. Навчитесь свідомо їх порушувати для художнього ефекту.' },
    { id: 'l4', module: 2, title: 'Натуральне та штучне освітлення',  type: 'Текст + Відео', duration: '31 хв', difficulty: 'medium', diffLabel: 'Середній',    module_label: 'Модуль 3', img: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=600&q=80', desc: 'Золота година, блакитна година та студійне світло.',                                 full: 'Схеми студійного освітлення: Rembrandt, butterfly, split. Робота зі спалахом TTL.' },
    { id: 'l5', module: 3, title: 'Lightroom: базова корекція',       type: 'Відео',         duration: '35 хв', difficulty: 'medium', diffLabel: 'Середній',    module_label: 'Модуль 4', img: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&q=80', desc: 'Кольорова корекція, тональний контраст та маски.',                                  full: 'Панель Basic у Lightroom. Гістограма, криві тонів, HSL. Створення власного пресету.' },
    { id: 'l6', module: 3, title: 'Кольоровий грейдинг',             type: 'Відео',         duration: '28 хв', difficulty: 'hard',   diffLabel: 'Просунутий',  module_label: 'Модуль 4', img: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&q=80', desc: 'Split-toning та кінематографічний стиль обробки.',                                  full: 'Кінематографічний look. Color Grading у Lightroom та Camera Raw. Теорія кольору.' },
  ],
  gallery: [
    { id: 'g1', type: 'landscape', author: 'Марія К.',    img: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80' },
    { id: 'g2', type: 'portrait',  author: 'Олег Д.',     img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80' },
    { id: 'g3', type: 'street',    author: 'Тетяна Б.',   img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80' },
    { id: 'g4', type: 'landscape', author: 'Іван С.',     img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
    { id: 'g5', type: 'portrait',  author: 'Юлія М.',     img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
    { id: 'g6', type: 'macro',     author: 'Дмитро Л.',   img: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=600&q=80' },
    { id: 'g7', type: 'street',    author: 'Катерина Р.', img: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80' },
    { id: 'g8', type: 'macro',     author: 'Андрій П.',   img: 'https://images.unsplash.com/photo-1504194104404-433180773017?w=600&q=80' },
  ],
};

export const db = {
  /**
   * Читання колекції.
   * Реальний Firebase:
   *   const snap = await getDocs(collection(db, collectionName));
   *   return snap.docs.map(d => ({ id: d.id, ...d.data() }));
   */
  getCollection: async (collectionName) => {
    await new Promise(r => setTimeout(r, 700)); // імітація затримки мережі
    return [...(_db[collectionName] ?? [])];
  },

  /**
   * Запис документа.
   * Реальний Firebase:
   *   const ref = await addDoc(collection(db, collectionName), data);
   *   return { id: ref.id, ...data };
   */
  addDocument: async (collectionName, data) => {
    await new Promise(r => setTimeout(r, 400));
    const newDoc = { id: 'doc_' + Date.now(), ...data };
    if (!_db[collectionName]) _db[collectionName] = [];
    _db[collectionName].push(newDoc);
    return newDoc;
  },
};
