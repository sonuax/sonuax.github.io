import React, { useState } from 'react';
import { auth } from '../firebase';

// ============================================================
// AuthModal — модальне вікно реєстрації та входу
// Props:
//   onClose — закрити модальне вікно
// ============================================================
function AuthModal({ onClose }) {
  const [tab, setTab]         = useState('login');   // 'login' | 'register'
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg]         = useState(null);      // { type: 'success'|'error', text }
  const [loading, setLoading] = useState(false);

  function switchTab(t) {
    setTab(t);
    setMsg(null);
    setEmail('');
    setPassword('');
    setConfirm('');
  }

  async function handleSubmit() {
    setMsg(null);
    if (!email.trim() || !password.trim()) {
      setMsg({ type: 'error', text: "Заповніть всі поля" });
      return;
    }
    if (tab === 'register' && password !== confirm) {
      setMsg({ type: 'error', text: 'Паролі не збігаються' });
      return;
    }

    setLoading(true);
    try {
      if (tab === 'register') {
        // Firebase: createUserWithEmailAndPassword(auth, email, password)
        await auth.createUserWithEmailAndPassword(email, password);
        setMsg({ type: 'success', text: 'Акаунт створено! Ви увійшли в систему.' });
        setTimeout(onClose, 1100);
      } else {
        // Firebase: signInWithEmailAndPassword(auth, email, password)
        await auth.signInWithEmailAndPassword(email, password);
        onClose();
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  }

  // Закриття по кліку на фон
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-box">
        {/* Заголовок */}
        <div className="modal-header">
          <h2 className="modal-title">
            Фото<span>Майстер</span>
          </h2>
          <p className="modal-subtitle">
            Увійдіть або зареєструйтесь для доступу до всіх розділів платформи
          </p>
        </div>

        {/* Вкладки Вхід / Реєстрація */}
        <div className="modal-tabs">
          <button
            className={`modal-tab${tab === 'login' ? ' active' : ''}`}
            onClick={() => switchTab('login')}
          >
            Вхід
          </button>
          <button
            className={`modal-tab${tab === 'register' ? ' active' : ''}`}
            onClick={() => switchTab('register')}
          >
            Реєстрація
          </button>
        </div>

        {/* Поля форми */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Мін. 6 символів"
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        {tab === 'register' && (
          <div className="form-group">
            <label>Підтвердіть пароль</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Повторіть пароль"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>
        )}

        {/* Повідомлення про результат */}
        {msg && (
          <div className={`form-msg form-msg--${msg.type}`}>
            {msg.text}
          </div>
        )}

        {/* Кнопка надсилання */}
        <button
          className="btn btn-primary modal-submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? 'Завантаження...'
            : tab === 'login' ? 'Увійти' : 'Зареєструватись'}
        </button>

        {/* Перемикач між вкладками */}
        <p className="auth-switch">
          {tab === 'login' ? (
            <>Ще немає акаунту?{' '}
              <button onClick={() => switchTab('register')}>Зареєструватись</button>
            </>
          ) : (
            <>Вже є акаунт?{' '}
              <button onClick={() => switchTab('login')}>Увійти</button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
