import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Імпортуємо наші компоненти
import AppHeader from './components/AppHeader';
import HomePage from './pages/HomePage';
// Ці компоненти ми створимо на наступних кроках, тому поки вони закоментовані
// import LessonsPage from './pages/LessonsPage';
// import GalleryPage from './pages/GalleryPage';
// import ProgressPage from './pages/ProgressPage';

// Імпортуємо наші дані
import { INITIAL_GALLERY } from './data';

function App() {
  // Глобальний стан (State) для вашого 2-го завдання
  // completedLessons зберігає ID уроків, які користувач відмітив як пройдені
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [gallery, setGallery] = useState(INITIAL_GALLERY);
  const [photoCount, setPhotoCount] = useState(5);

  // Функція для перемикання статусу уроку (Пройдено / Не пройдено)
  const handleToggleComplete = (id) => {
    setCompletedLessons(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    // BrowserRouter відповідає за зміну сторінок без перезавантаження (Завдання 3)
    <BrowserRouter>
      {/* Шапка сайту видима на всіх сторінках */}
      <AppHeader />
      
      <main>
        <Routes>
          {/* Головна сторінка */}
          <Route path="/" element={<HomePage />} />
          
          {/* Маршрути для інших сторінок (розкоментуємо пізніше) */}
          {/* <Route path="/lessons" element={<LessonsPage completedLessons={completedLessons} onToggleComplete={handleToggleComplete} />} /> */}
          {/* <Route path="/gallery" element={<GalleryPage gallery={gallery} setGallery={setGallery} photoCount={photoCount} setPhotoCount={setPhotoCount} />} /> */}
          {/* <Route path="/progress" element={<ProgressPage completedLessons={completedLessons} photoCount={photoCount} />} /> */}
        </Routes>
      </main>
      
      {/* Тут пізніше додамо AppFooter */}
    </BrowserRouter>
  );
}

export default App;