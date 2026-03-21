import React from 'react';

// ============================================================
// UserBar — зелена смужка статусу авторизованого користувача
// Відображається під хедером тільки якщо user !== null.
// Props:
//   user     — об'єкт поточного користувача { email, displayName }
//   onSignOut — функція виходу
// ============================================================
function UserBar({ user, onSignOut }) {
  if (!user) return null;

  return (
    <div className="user-bar">
      <span className="user-bar-dot" />
      <span>Авторизовано:</span>
      <strong>{user.email}</strong>
      <span className="user-bar-sep">•</span>
      <button className="user-bar-signout" onClick={onSignOut}>
        Вийти →
      </button>
    </div>
  );
}

export default UserBar;
