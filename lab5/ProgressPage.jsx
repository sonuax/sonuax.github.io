import React, { useState, useEffect } from 'react';
import { MODULE_PROGRESS_DATA } from '../data';
import { db } from '../firebase';
import LockedGate from '../components/LockedGate';

// ============================================================
// URL сервера:
// - локально:    http://localhost:5000
// - після деплою на Render: замінити на свій URL
//   наприклад:  https://fotomaister-server.onrender.com
// ============================================================
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'https://sonuax-github-io.onrender.com';

function ProgressPage({ user, completedLessons, onOpenAuth }) {
  const [lessons, setLessons]             = useState([]);
  const [serverCompleted, setServerCompleted] = useState([]); // дані з сервера
  const [serverLoading, setServerLoading] = useState(false);
  const [serverError, setServerError]     = useState(null);

  // Завантаження уроків з Firestore
  useEffect(() => {
    if (!user) return;
    db.getCollection('lessons').then(setLessons);
  }, [user]);

  // GET /api/lessons/completed?userId=...
  // Завантаження пройдених уроків з сервера (відсортованих за датою)
  useEffect(() => {
    if (!user) return;

    setServerLoading(true);
    setServerError(null);

    fetch(`${SERVER_URL}/api/lessons/completed?userId=${user.uid}`)
      .then(res => {
        if (!res.ok) throw new Error('Помилка відповіді сервера');
        return res.json();
      })
      .then(data => {
        setServerCompleted(data);
        setServerLoading(false);
      })
      .catch(err => {
        console.error('GET completed lessons error:', err);
        setServerError('Не вдалося завантажити дані з сервера');
        setServerLoading(false);
      });
  }, [user]);

  // Якщо не авторизований — показати заглушку
  if (!user) {
    return (
      <section id="progress" className="page-enter">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-label">Статистика навчання</span>
              <h2>Мій <span>прогрес</span></h2>
            </div>
          </div>
          <LockedGate sectionName="Мій прогрес" onOpenAuth={onOpenAuth} />
        </div>
      </section>
    );
  }

  // Обчислення прогресу на основі даних з сервера
  const completedIds = new Set(serverCompleted.map(c => c.lessonId));
  const completedCount = lessons.filter(l => completedIds.has(String(l.id))).length;
  const pct = lessons.length
    ? Math.round((completedCount / lessons.length) * 100)
    : 0;

  return (
    <section id="progress" className="page-enter">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-label">Статистика навчання</span>
            <h2>Мій <span>прогрес</span></h2>
          </div>
        </div>

        <div className="progress-layout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Загальний прогрес */}
            <div className="progress-card">
              <h3>Загальний прогрес</h3>
              <div className="big-stat">{pct}%</div>
              <p className="big-stat-label">курсу пройдено</p>
              <div className="progress-bar-wrap">
                <div className="progress-bar-label">
                  <span>Прогрес</span>
                  <span>{completedCount}/{lessons.length} уроків</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>

            {/* По модулях */}
            <div className="progress-card">
              <h3>По модулях</h3>
              {MODULE_PROGRESS_DATA.map((m, i) => (
                <div className="progress-bar-wrap" key={i} style={i > 0 ? { marginTop: '1rem' } : {}}>
                  <div className="progress-bar-label">
                    <span>{m.label}</span><span>{m.pct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Пройдені уроки — дані з сервера, відсортовані за датою */}
          <div className="progress-card">
            <h3>Пройдені уроки</h3>

            {serverError && (
              <div className="db-error">{serverError}</div>
            )}

            {serverLoading ? (
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>
                Завантаження...
              </p>
            ) : (
              <div className="completed-list">
                {lessons.map((l, i) => {
                  const done = completedIds.has(String(l.id));
                  // Знаходимо дату проходження з даних сервера
                  const serverEntry = serverCompleted.find(
                    c => c.lessonId === String(l.id)
                  );
                  const dateLabel = serverEntry
                    ? new Date(serverEntry.completedAt).toLocaleDateString('uk-UA')
                    : '—';

                  return (
                    <div key={i} className={`completed-item${done ? ' done' : ''}`}>
                      <span className="ci-status" style={!done ? { color: 'var(--border)' } : {}}>
                        {done ? '✓' : '○'}
                      </span>
                      <span className="ci-title" style={!done ? { color: 'var(--muted)' } : {}}>
                        {l.title}
                      </span>
                      {/* Дата проходження з сервера */}
                      <span className="ci-date">{done ? dateLabel : '—'}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-box"><strong>14</strong><span>Годин навчання</span></div>
          <div className="stat-box"><strong>{completedCount}</strong><span>Уроків пройдено</span></div>
          <div className="stat-box"><strong>{pct}%</strong><span>Загальний прогрес</span></div>
        </div>
      </div>
    </section>
  );
}

export default ProgressPage;
