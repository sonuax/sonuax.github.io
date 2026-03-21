import React, { useState } from 'react';
// Імпортуємо масиви з даними, які потрібні на цій сторінці
import { LESSONS_DATA, MODULE_INFO } from '../data';

function LessonsPage({ completedLessons, onToggleComplete }) {
    const [activeModule, setActiveModule] = useState(0);

    return (
    <section id="lessons" className="page-enter">
        <div className="container">
        <div className="section-header">
            <div>
            <span className="section-label">Програма курсу</span>
            <h2>Відео-<span>уроки</span></h2>
            </div>
        </div>

        {/* MODULE TABS — for loop equivalent via .map() */}
        <div className="lesson-tabs">
            {MODULE_INFO.map((m, i) => (
            <button
                key={i}
                className={`tab-btn${activeModule === i ? ' active' : ''}`}
                onClick={() => setActiveModule(i)}
            >
                Модуль {i + 1}: {['Основи','Композиція','Освітлення','Редагування'][i]}
            </button>
            ))}
        </div>

        {/* Dynamic info box — state-driven DOM update */}
        <div className="lesson-info-box">
            <h3>{MODULE_INFO[activeModule].title}</h3>
            <p>{MODULE_INFO[activeModule].desc}</p>
        </div>

        {/* LESSON CARDS — for loop rendered with .map() + conditional styling */}
        <div className="lessons-grid">
            {LESSONS_DATA.map((lesson, i) => (
            <LessonCard
                key={lesson.id}
                lesson={lesson}
                index={i}
                isCompleted={completedLessons.has(lesson.id)}
                onToggleComplete={onToggleComplete}
            />
            ))}
        </div>

        {/* WHILE-LOOP LIST — rendered via .map() with index-based conditional */}
        <div id="while-lessons">
            <h3>Повний список уроків</h3>
            <div className="while-list">
            {LESSONS_DATA.map((lesson, i) => (
                <div
                key={lesson.id}
                className="while-item"
                style={completedLessons.has(lesson.id) ? {borderColor: 'rgba(109,184,122,0.25)'} : {}}
                >
                <span className="while-num">{i + 1}</span>
                <span className="while-title" style={!completedLessons.has(lesson.id) ? {color:'var(--muted)'} : {}}>
                    {lesson.title}
                </span>
                {completedLessons.has(lesson.id)
                    ? <span style={{color:'var(--success)', fontSize:'0.75rem'}}>✓ Пройдено</span>
                    : <span style={{color:'var(--border)', fontSize:'0.75rem'}}>○ Очікує</span>
                }
                <span className="while-dur">{lesson.duration}</span>
                </div>
            ))}
            </div>
        </div>

        {/* TOPICS ARTICLE */}
        <article className="topics-article">
            <div>
            <h3>Теми курсу</h3>
            <ul className="topics-list">
                {['Основи фотографії та робота з камерою','Техніки зйомки в різних умовах освітлення','Композиція та художнє бачення','Портретна та пейзажна фотографія'].map((t, i) => (
                <li key={i} style={{color: i % 3 === 0 ? 'var(--text)' : i % 3 === 1 ? 'var(--muted)' : '#aaa'}}>{t}</li>
                ))}
            </ul>
            </div>
            <div>
            <h3>Програмне забезпечення</h3>
            <ul className="topics-list">
                {['Adobe Lightroom Classic та CC','Adobe Photoshop для ретуші','Capture One Pro','Luminar Neo — AI-інструменти'].map((t, i) => (
                <li key={i} style={{color: i % 3 === 0 ? 'var(--text)' : i % 3 === 1 ? 'var(--muted)' : '#aaa'}}>{t}</li>
                ))}
            </ul>
            </div>
            <div>
            <h3>Формати</h3>
            <ul className="topics-list">
                {['Відеоуроки з прикладами','Текстові матеріали та шпаргалки','Практичні завдання та проєкти','Зворотний зв\'язок від ментора'].map((t, i) => (
                <li key={i} style={{color: i % 3 === 0 ? 'var(--text)' : i % 3 === 1 ? 'var(--muted)' : '#aaa'}}>{t}</li>
                ))}
            </ul>
            </div>
        </article>
        </div>
    </section>
    );
}

export default LessonsPage;