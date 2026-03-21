import React, { useState, useEffect, useCallback } from 'react';

// компоненти
import AppHeader  from './components/AppHeader';
import AppFooter  from './components/AppFooter';
import AuthModal  from './components/AuthModal';
import UserBar    from './components/UserBar';

// сторінки
import HomePage    from './pages/HomePage';
import LessonsPage from './pages/LessonsPage';
import GalleryPage from './pages/GalleryPage';
import ProgressPage from './pages/ProgressPage';
import CommentsPage from './pages/CommentsPage';

// Firebase (auth — для onAuthStateChanged / signOut)
import { auth } from './firebase';

// дані
import { ROUTES } from './data';

// ============================================================
// Хук useRouter — хеш-маршрутизація без перезавантаження
// ============================================================
function useRouter() {
  const [route, setRoute] = useState(() => {
    const h = window.location.hash.replace('#', '') || 'home';
    return ROUTES[h] ? h : 'home';
  });

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace('#', '') || 'home';
      setRoute(ROUTES[h] ? h : 'home');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((to) => {
    window.location.hash = to;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { route, navigate };
}

// ============================================================
// App — кореневий компонент
// ============================================================
function App() {
  const { route, navigate } = useRouter();

  // ── Стан авторизації (Firebase Authentication)
  // user = null  → не авторизований
  // user = {...} → авторизований { uid, email, displayName }
  const [user, setUser]             = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // очікування onAuthStateChanged
  const [showAuth, setShowAuth]     = useState(false);  // показати модалку

  // Підписка на зміни стану авторизації — виконується один раз при монтуванні.
  // Реальний Firebase: onAuthStateChanged(auth, callback)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return unsubscribe; // відписка при розмонтуванні
  }, []);

  // Вихід із системи
  // Реальний Firebase: signOut(auth)
  async function handleSignOut() {
    await auth.signOut();
    navigate('home');
  }

  // ── Глобальний стан додатку
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [photoCount, setPhotoCount]             = useState(5);

  const handleToggleComplete = useCallback((id) => {
    setCompletedLessons(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  // ── Спінер під час перевірки Auth стану
  if (authLoading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-spinner" />
        <p>Перевірка авторизації...</p>
      </div>
    );
  }

  // ── Рендеринг сторінки за поточним маршрутом
  function renderPage() {
    switch (route) {
      case 'lessons':
        return (
          <LessonsPage
            completedLessons={completedLessons}
            onToggleComplete={handleToggleComplete}
          />
        );
      case 'gallery':
        return (
          <GalleryPage
            user={user}
            onOpenAuth={() => setShowAuth(true)}
            photoCount={photoCount}
            setPhotoCount={setPhotoCount}
          />
        );
      case 'progress':
        return (
          <ProgressPage
            user={user}
            completedLessons={completedLessons}
            onOpenAuth={() => setShowAuth(true)}
          />
        );
      case 'comments':
        return <CommentsPage />;
      default:
        return <HomePage navigate={navigate} user={user} onOpenAuth={() => setShowAuth(true)} />;
    }
  }

  return (
    <>
      {/* Модальне вікно авторизації */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      <AppHeader
        route={route}
        navigate={navigate}
        user={user}
        onOpenAuth={() => setShowAuth(true)}
        onSignOut={handleSignOut}
      />

      {/* Смужка статусу авторизованого користувача */}
      <UserBar user={user} onSignOut={handleSignOut} />

      <main>{renderPage()}</main>

      <AppFooter navigate={navigate} />
    </>
  );
}

export default App;
