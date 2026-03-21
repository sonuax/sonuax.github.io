import React from 'react';

function HomePage({ navigate }) {
    return (
    <main>
        <section className="hero page-enter">
        <div className="hero-bg"></div>
        <div className="hero-img-wrap">
            <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=80" alt="Фотографія" />
        </div>
        <div className="hero-content container">
            <span className="hero-tag">Онлайн-платформа для фотографів</span>
            <h1>Опануй мистецтво<br /><em>фотографії</em></h1>
            <p>Від основ до майстерності — структуровані відеоуроки, реальна практика та персональний трекер прогресу.</p>
            <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate('lessons')}>▶ Переглянути уроки</button>
            <button className="btn btn-outline" onClick={() => navigate('progress')}>Мій прогрес</button>
            </div>
            <div className="hero-stats">
            <div><strong>48</strong><span>Уроків</span></div>
            <div><strong>12</strong><span>Модулів</span></div>
            <div><strong>2.4k</strong><span>Студентів</span></div>
            </div>
        </div>
        </section>
    </main>
    );
}

export default HomePage;