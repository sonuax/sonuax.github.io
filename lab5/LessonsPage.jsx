import React, { useState, useEffect } from 'react';
import { MODULE_INFO } from '../data';
import { db } from '../firebase';
import LessonCard from '../components/LessonCard';

// ============================================================
// URL сервера:
// - локально:    http://localhost:5000
// - після деплою на Render: замінити на свій URL
//   наприклад:  https://fotomaister-server.onrender.com
// ============================================================
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'https://sonuax-github-io.onrender.com';

function LessonsPage({ completedLessons, onToggleComplete, user }) {
  const [activeModule, setActiveModule] = useState(0);
  const [lessons, setLessons]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [dbError, setDbError]           = useState(null);

  // Завантаження уроків з Firestore при монтуванні
  useEffect(() => {
    db.getCollection('lessons')
      .then(data => {
        setLessons(data);
        setLoading(false);
      })
      .catch(err => {
        setDbError('Помилка завантаження уроків: ' + err.message);
        setLoading(false);
      });
  }, []);

  // ============================================================
  // POST /api/lessons/completed
  // Викликається при натисканні «Відмітити» / «Пройдено»
  // Зберігає або видаляє запис у Firestore через сервер
  // ============================================================
  async function handleToggleWithServer(lessonId) {
    // Спочатку оновлюємо локальний стан (UI реагує миттєво)
    onToggleComplete(lessonId);

    // Якщо користувач не авторизований — тільки локальний стан
    if (!user) return;

    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    try {
      const response = await fetch(`${SERVER_URL}/api/lessons/completed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId:      user.uid,
          lessonId:    String(lessonId),
          lessonTitle: lesson.title,
        }),
      });

      if (!response.ok) {
        throw new Error('Помилка відповіді сервера');
      }

      const data = await response.json();
      console.log('Server response:', data.action, data.lessonId);
    } catch (err) {
      console.error('POST /api/lessons/completed error:', err);
      // Якщо запит не вдався — повертаємо локальний стан назад
      onToggleComplete(lessonId);
    }
  }

  return (
    <section id="lessons" className="page-enter">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-label">Програма курсу</span>
            <h2>
              Відео-<span>уроки</span>
              <span className="db-badge" title="Дані завантажено з Firebase Firestore">
                🔥 Firestore
              </span>
            </h2>
          </div>
        </div>

        {/* MODULE TABS */}
        <div className="lesson-tabs">
          {MODULE_INFO.map((m, i) => (
            <button
              key={i}
              className={`tab-btn${activeModule === i ? ' active' : ''}`}
              onClick={() => setActiveModule(i)}
            >
              Модуль {i + 1}: {['Основи', 'Композиція', 'Освітлення', 'Редагування'][i]}
            </button>
          ))}
        </div>

        <div className="lesson-info-box">
          <h3>{MODULE_INFO[activeModule].title}</h3>
          <p>{MODULE_INFO[activeModule].desc}</p>
        </div>

        {dbError && <div className="db-error">{dbError}</div>}

        {loading ? (
          <div className="lessons-grid">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="lesson-card skeleton-card" />
            ))}
          </div>
        ) : (
          <>
            <div className="lessons-grid">
              {lessons.map((lesson, i) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  index={i}
                  isCompleted={completedLessons.has(lesson.id)}
                  onToggleComplete={handleToggleWithServer}
                />
              ))}
            </div>

            {/* Повний список уроків */}
            <div id="while-lessons">
              <h3>Повний список уроків</h3>
              <div className="while-list">
                {lessons.map((lesson, i) => (
                  <div
                    key={lesson.id}
                    className="while-item"
                    style={completedLessons.has(lesson.id)
                      ? { borderColor: 'rgba(109,184,122,0.25)' }
                      : {}}
                  >
                    <span className="while-num">{i + 1}</span>
                    <span
                      className="while-title"
                      style={!completedLessons.has(lesson.id) ? { color: 'var(--muted)' } : {}}
                    >
                      {lesson.title}
                    </span>
                    {completedLessons.has(lesson.id)
                      ? <span style={{ color: 'var(--success)', fontSize: '0.75rem' }}>✓ Пройдено</span>
                      : <span style={{ color: 'var(--border)', fontSize: '0.75rem' }}>○ Очікує</span>
                    }
                    <span className="while-dur">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Теми курсу */}
            <article className="topics-article">
              <div>
                <h3>Теми курсу</h3>
                <ul className="topics-list">
                  {['Основи фотографії та робота з камерою', 'Техніки зйомки в різних умовах освітлення', 'Композиція та художнє бачення', 'Портретна та пейзажна фотографія'].map((t, i) => (
                    <li key={i} style={{ color: i % 3 === 0 ? 'var(--text)' : i % 3 === 1 ? 'var(--muted)' : '#aaa' }}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Програмне забезпечення</h3>
                <ul className="topics-list">
                  {['Adobe Lightroom Classic та CC', 'Adobe Photoshop для ретуші', 'Capture One Pro', 'Luminar Neo — AI-інструменти'].map((t, i) => (
                    <li key={i} style={{ color: i % 3 === 0 ? 'var(--text)' : i % 3 === 1 ? 'var(--muted)' : '#aaa' }}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Формати</h3>
                <ul className="topics-list">
                  {["Відеоуроки з прикладами", "Текстові матеріали та шпаргалки", "Практичні завдання та проєкти", "Зворотний зв'язок від ментора"].map((t, i) => (
                    <li key={i} style={{ color: i % 3 === 0 ? 'var(--text)' : i % 3 === 1 ? 'var(--muted)' : '#aaa' }}>{t}</li>
                  ))}
                </ul>
              </div>
            </article>
          </>
        )}
      </div>
    </section>
  );
}

export default LessonsPage;
