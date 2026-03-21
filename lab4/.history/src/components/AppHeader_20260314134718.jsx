import React, { useState } from 'react';
import { ROUTES } from '../data';

function AppHeader({ route, navigate }) {
    const [navOpen, setNavOpen] = useState(false);
    const links = [
    { id: 'lessons',  label: 'Уроки',       desc: 'Відеоуроки та матеріали' },
    { id: 'gallery',  label: 'Галерея',      desc: 'Роботи студентів' },
    { id: 'progress', label: 'Мій прогрес',  desc: 'Ваша статистика' },
    { id: 'comments', label: 'Коментарі',    desc: 'Залиште відгук' },
    ];
    return (
    <header>
        <div className="header-inner">
        <span className="logo" onClick={() => { navigate('home'); setNavOpen(false); }}>
            Фото<span>Майстер</span>
        </span>
        <button className="hamburger" onClick={() => setNavOpen(o => !o)} aria-label="Меню">
            <span/><span/><span/>
        </button>
        <nav className={navOpen ? 'open' : ''}>
            <ul>
            {links.map(l => (
                <li key={l.id}>
                <button
                    className={route === l.id ? 'active' : ''}
                    onClick={() => { navigate(l.id); setNavOpen(false); }}
                >
                    {l.label}
                </button>
                </li>
            ))}
            <li>
                <button className="nav-cta" onClick={() => { navigate('comments'); setNavOpen(false); }}>
                Почати навчання
                </button>
            </li>
            </ul>
        </nav>
        </div>
    </header>
    );
}

export default AppHeader;