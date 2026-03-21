import React, { useState } from 'react';

function LessonCard({ lesson, index, isCompleted, onToggleComplete }) {
    const [expanded, setExpanded] = useState(false);
    const borderStyle = lesson.difficulty === 'hard'
    ? 'rgba(232,124,110,0.2)' : lesson.difficulty === 'medium'
    ? 'rgba(232,201,110,0.15)' : undefined;

    return (
    <article className="lesson-card" style={borderStyle ? {borderColor: borderStyle} : {}}>
        <div className="lesson-thumb">
        <img src={lesson.img} alt={lesson.title} loading="lazy" />
        <span className="lesson-badge">{lesson.type} • {lesson.duration}</span>
        {isCompleted && <span className="lesson-done-badge">✓ Пройдено</span>}
        </div>
        <div className="lesson-body" style={index % 2 !== 0 ? {background:'var(--surface2)'} : {}}>
        <div className="lesson-meta">
            <span>📷 {lesson.module_label}</span>
            <span>⏱ {lesson.duration}</span>
        </div>
        <h3>{lesson.title}</h3>
        <p>{lesson.desc}</p>
        <button className="lesson-expand-btn" onClick={() => setExpanded(e => !e)}>
            <span>{expanded ? '▾' : '▸'}</span>
            <span>{expanded ? 'Приховати' : 'Детальніше'}</span>
        </button>
        <div className={`lesson-full${expanded ? ' open' : ''}`}>{lesson.full}</div>
        </div>
        <div className="lesson-footer">
        <span className={`difficulty ${lesson.difficulty}`}>{lesson.diffLabel}</span>
        <button
            className={`mark-done-btn ${isCompleted ? 'done' : 'undone'}`}
            onClick={() => onToggleComplete(lesson.id)}
        >
            {isCompleted ? '✓ Пройдено' : 'Відмітити'}
        </button>
        </div>
    </article>
    );
}