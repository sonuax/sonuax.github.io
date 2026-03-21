import React, { useState } from 'react';

function CommentsPage({ comments, setComments }) {
    const [name, setName]       = useState('');
    const [email, setEmail]     = useState('');
    const [lesson, setLesson]   = useState('');
    const [comment, setComment] = useState('');
    const [errors, setErrors]   = useState({});

    function validate() {
    const errs = {};
    if (!name.trim()) errs.name = true;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = true;
    if (!comment.trim()) errs.comment = true;
    return errs;
    }

    function handleSubmit() {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setComments(prev => [{
        id: Date.now(), name, email, lesson, comment
    }, ...prev]);
    setName(''); setEmail(''); setLesson(''); setComment('');
    }

    return (
    <section id="comments" className="page-enter">
        <div className="container">
        <div className="section-header">
            <div>
            <span className="section-label">Спільнота</span>
            <h2>Коментарі та <span>відгуки</span></h2>
            </div>
        </div>

        <div className="comments-layout">
            {/* Comment form */}
            <div className="comment-form">
            <h3>Залишити коментар</h3>
            <div className="form-group">
                <label>Ім'я *</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ваше ім'я" />
                {errors.name && <div className="field-error show">Будь ласка, введіть ім'я</div>}
            </div>
            <div className="form-group">
                <label>Email *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
                {errors.email && <div className="field-error show">Введіть коректний email</div>}
            </div>
            <div className="form-group">
                <label>Урок</label>
                <select value={lesson} onChange={e => setLesson(e.target.value)}>
                <option value="">— оберіть урок —</option>
                <option>Трикутник експозиції</option>
                <option>Типи об'єктивів</option>
                <option>Режими зйомки</option>
                <option>Правило третин</option>
                <option>Робота зі світлом</option>
                <option>Lightroom: базова корекція</option>
                </select>
            </div>
            <div className="form-group">
                <label>Коментар *</label>
                <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Поділіться враженнями..." />
                {errors.comment && <div className="field-error show">Коментар не може бути порожнім</div>}
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Надіслати коментар</button>
            </div>

            {/* Comments list */}
            <div>
            <h3 style={{fontFamily:'var(--font-display)', fontSize:'1.4rem', marginBottom:'1.5rem'}}>Коментарі студентів</h3>
            {comments.length === 0
                ? <p style={{fontSize:'0.9rem', color:'var(--muted)', fontStyle:'italic'}}>Коментарів ще немає. Будьте першим!</p>
                : comments.map(c => (
                <div key={c.id} className="comment-item">
                    <div className="comment-header">
                    <span className="comment-author">{c.name}</span>
                    <span className="comment-email">{c.email}</span>
                    </div>
                    {c.lesson && <div className="comment-lesson">Урок: {c.lesson}</div>}
                    <p className="comment-text">{c.comment}</p>
                </div>
                ))
            }
            </div>
        </div>
        </div>
    </section>
    );
}

export default CommentsPage;