import React, { useState, useEffect } from 'react';
import { MODULE_PROGRESS_DATA } from '../data';
import { db } from '../firebase';
import LockedGate from '../components/LockedGate';

// ============================================================
// ProgressPage — захищена сторінка прогресу
// Доступна ТІЛЬКИ для авторизованих користувачів (Варіант 22, п.2)
// Список уроків завантажується з Firebase Firestore.
// Нові props:
//   user      — поточний користувач або null
//   onOpenAuth — відкрити модалку авторизації
// ============================================================
function ProgressPage({ user, completedLessons, onOpenAuth }) {
  const [lessons, setLessons] = useState([]);

  // Завантаження списку уроків з Firestore для відображення прогресу
  useEffect(() => {
    if (!user) return;
    db.getCollection('lessons').then(setLessons);
  }, [user]);

  // Якщо не авторизований — показати заглушку LockedGate
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

  // Обчислення статистики на основі completedLessons
  const completedList = lessons.map(l => ({
    id:    l.id,
    title: l.title,
    done:  completedLessons.has(l.id),
    date:  completedLessons.has(l.id) ? 'Пройдено' : '—',
  }));
  const completedCount = completedList.filter(c => c.done).length;
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

          {/* Список пройдених уроків */}
          <div className="progress-card">
            <h3>Пройдені уроки</h3>
            <div className="completed-list">
              {completedList.map((c, i) => (
                <div key={i} className={`completed-item${c.done ? ' done' : ''}`}>
                  <span className="ci-status" style={!c.done ? { color: 'var(--border)' } : {}}>
                    {c.done ? '✓' : '○'}
                  </span>
                  <span className="ci-title" style={!c.done ? { color: 'var(--muted)' } : {}}>
                    {c.title}
                  </span>
                  <span className="ci-date">{c.date}</span>
                </div>
              ))}
            </div>
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
