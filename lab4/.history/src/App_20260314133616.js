import React, { useState, useEffect, useCallback } from 'react';

// Імпортуємо ваші компоненти
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import HomePage from './pages/HomePage';

import LessonsPage from './pages/LessonsPage';
import GalleryPage from './pages/GalleryPage';
import ProgressPage from './pages/ProgressPage';
import CommentsPage from './pages/CommentsPage';

// Імпортуємо дані
import { INITIAL_GALLERY, ROUTES } from './data';

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

function App() {
  const { route, navigate } = useRouter();

  // Global state — lifted up and passed as props (state management)
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [gallery, setGallery] = useState(INITIAL_GALLERY);
  const [comments, setComments] = useState([]);
  const [photoCount, setPhotoCount] = useState(5);

  // Toggle lesson completion — state update + side-effect
  const handleToggleComplete = useCallback((id) => {
    setCompletedLessons(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Routing — renders different page components without browser reload
  function renderPage() {
    switch (route) {
      case 'lessons':
        return <LessonsPage completedLessons={completedLessons} onToggleComplete={handleToggleComplete} />;
      case 'gallery':
        return <GalleryPage gallery={gallery} setGallery={setGallery} photoCount={photoCount} setPhotoCount={setPhotoCount} />;
      case 'progress':
        return <ProgressPage completedLessons={completedLessons} photoCount={photoCount} />;
      case 'comments':
        return <CommentsPage comments={comments} setComments={setComments} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  }

  return (
    <>
      <AppHeader route={route} navigate={navigate} />
      <main>{renderPage()}</main>
      <AppFooter navigate={navigate} />
    </>
  );
}

export default App;