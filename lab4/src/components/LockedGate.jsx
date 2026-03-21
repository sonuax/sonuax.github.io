import React from 'react';

// ============================================================
// LockedGate — заглушка для захищених сторінок
// Відображається замість вмісту, якщо користувач не авторизований.
// Props:
//   sectionName — назва розділу (відображається у тексті)
//   onOpenAuth  — відкрити модальне вікно авторизації
// ============================================================
function LockedGate({ sectionName, onOpenAuth }) {
  return (
    <div className="locked-gate page-enter">
      <div className="lock-icon">🔒</div>
      <h3>Розділ «{sectionName}» закрито</h3>
      <p>
        Цей розділ доступний лише для авторизованих користувачів.
        Увійдіть або зареєструйтесь, щоб продовжити навчання.
      </p>
      <button className="btn btn-primary" onClick={onOpenAuth}>
        Увійти / Зареєструватись
      </button>
    </div>
  );
}

export default LockedGate;
