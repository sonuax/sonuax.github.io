import React from 'react';
import { LESSONS_DATA } from '../data';

function ProgressPage({ completedLessons, photoCount }) {
    // Derive completed list from state
    const completedList = LESSONS_DATA.map(l => ({
    title: l.title,
    done: completedLessons.has(l.id),
    date: completedLessons.has(l.id) ? 'Пройдено' : '—',
    }));
    const completedCount = completedList.filter(c => c.done).length;
    const pct = Math.round((completedCount / LESSONS_DATA.length) * 100);

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
            <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
            {/* Overall progress card */}
            <div className="progress-card">
                <h3>Загальний прогрес</h3>
                <div className="big-stat">{pct}%</div>
                <p className="big-stat-label">курсу пройдено</p>
                <div className="progress-bar-wrap">
                <div className="progress-bar-label">
                    <span>Прогрес</span>
                    <span>{completedCount}/{LESSONS_DATA.length} уроків</span>
                </div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${pct}%`}}></div>
                </div>
                </div>
            </div>

            {/* Module progress card */}
            <div className="progress-card">
                <h3>По модулях</h3>
                {MODULE_PROGRESS_DATA.map((m, i) => (
                <div className="progress-bar-wrap" key={i} style={i > 0 ? {marginTop:'1rem'} : {}}>
                    <div className="progress-bar-label">
                    <span>{m.label}</span><span>{m.pct}%</span>
                    </div>
                    <div className="progress-bar">
                    <div className="progress-fill" style={{width:`${m.pct}%`}}></div>
                    </div>
                </div>
                ))}
            </div>
            </div>

            {/* Completed lessons card */}
            <div className="progress-card">
            <h3>Пройдені уроки</h3>
            <div className="completed-list">
                {completedList.map((c, i) => (
                <div key={i} className={`completed-item${c.done ? ' done' : ''}`}>
                    <span className="ci-status" style={!c.done ? {color:'var(--border)'} : {}}>
                    {c.done ? '✓' : '○'}
                    </span>
                    <span className="ci-title" style={!c.done ? {color:'var(--muted)'} : {}}>{c.title}</span>
                    <span className="ci-date">{c.date}</span>
                </div>
                ))}
            </div>
            </div>
        </div>

        <div className="stats-row">
            <div className="stat-box"><strong>14</strong><span>Годин навчання</span></div>
            <div className="stat-box"><strong>8</strong><span>Завдань здано</span></div>
            <div className="stat-box"><strong>{photoCount}</strong><span>Фото завантажено</span></div>
        </div>
        </div>
    </section>
    );
}

export default ProgressPage;