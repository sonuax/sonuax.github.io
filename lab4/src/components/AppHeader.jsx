import React, { useState } from 'react';

// ============================================================
// AppHeader — навігаційна шапка
// Нові props (порівняно з попередньою версією):
//   user      — поточний користувач або null
//   onOpenAuth — відкрити модалку авторизації
//   onSignOut  — вийти із системи
// ============================================================
function AppHeader({ route, navigate, user, onOpenAuth, onSignOut }) {
  const [navOpen, setNavOpen] = useState(false);

  const links = [
    { id: 'lessons',  label: 'Уроки',        locked: false },
    { id: 'gallery',  label: 'Галерея',       locked: true  }, // захищено
    { id: 'progress', label: 'Мій прогрес',   locked: true  }, // захищено
    { id: 'comments', label: 'Коментарі',     locked: false },
  ];

  function handleNav(id) {
    navigate(id);
    setNavOpen(false);
  }

  return (
    <header>
      <div className="header-inner">
        {/* Логотип */}
        <span className="logo" onClick={() => { navigate('home'); setNavOpen(false); }}>
          Фото<span>Майстер</span>
        </span>

        {/* Гамбургер (мобільний) */}
        <button className="hamburger" onClick={() => setNavOpen(o => !o)} aria-label="Меню">
          <span /><span /><span />
        </button>

        {/* Навігація */}
        <nav className={navOpen ? 'open' : ''}>
          <ul>
            {links.map(l => (
              <li key={l.id}>
                <button
                  className={route === l.id ? 'active' : ''}
                  onClick={() => handleNav(l.id)}
                >
                  {l.label}
                  {/* Іконка замка для захищених розділів (якщо не авторизований) */}
                  {l.locked && !user && (
                    <span className="nav-lock" title="Потрібна авторизація">🔒</span>
                  )}
                </button>
              </li>
            ))}

            {/* Кнопки авторизації */}
            {user ? (
              // Якщо авторизований — показати кнопку «Вийти»
              <li>
                <button className="nav-signout" onClick={() => { onSignOut(); setNavOpen(false); }}>
                  Вийти
                </button>
              </li>
            ) : (
              // Якщо не авторизований — кнопка «Увійти»
              <li>
                <button className="nav-cta" onClick={() => { onOpenAuth(); setNavOpen(false); }}>
                  Увійти
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
