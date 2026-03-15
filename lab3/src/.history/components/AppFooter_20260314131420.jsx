import React from 'react';
import { ROUTES } from '../data';

function AppFooter({ navigate }) {
    return (
    <footer>
        <div className="footer-inner">
        <div className="footer-brand">
            <span className="logo" onClick={() => navigate('home')} style={{cursor:'pointer'}}>Фото<span>Майстер</span></span>
            <p>Онлайн-платформа для тих, хто хоче навчитися фотографувати красиво — від перших кроків до впевненої майстерності.</p>
        </div>
        <div className="footer-col">
            <h4>Платформа</h4>
            <ul>
            {['Уроки','Галерея','Мій прогрес','Спільнота'].map(t => <li key={t}>{t}</li>)}
            </ul>
        </div>
        <div className="footer-col">
            <h4>Курси</h4>
            <ul>
            {['Основи фотографії','Портретна зйомка','Пейзажна фотографія','Обробка у Lightroom'].map(t => <li key={t}>{t}</li>)}
            </ul>
        </div>
        <div className="footer-col">
            <h4>Контакти</h4>
            <div className="contact-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            вул. С. Бандери, 22, Львів
            </div>
            <div className="contact-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.37a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +38 (044) 123-45-67
            </div>
            <div className="contact-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            info@fotomaister.ua
            </div>
        </div>
        </div>
        <div className="footer-bottom">
        <p>© 2026 ФотоМайстер. Усі права захищені.</p>
        <p>Створено для студентів з ❤️ до фотографії</p>
        </div>
    </footer>
    );
}

export default AppFooter;