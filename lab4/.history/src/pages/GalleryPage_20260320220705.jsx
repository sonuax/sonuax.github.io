import React, { useState, useEffect } from 'react';
import { TYPE_LABELS } from '../data';
import { db } from '../firebase';
import GalleryItem from '../components/GalleryItem';
import LockedGate  from '../components/LockedGate';

// ============================================================
// GalleryPage — захищена сторінка галереї
// Доступна ТІЛЬКИ для авторизованих користувачів (Варіант 22, п.2)
// Дані галереї завантажуються з Firebase Firestore.
// Нові props:
//   user      — поточний користувач або null
//   onOpenAuth — відкрити модалку авторизації
// ============================================================
function GalleryPage({ user, onOpenAuth, photoCount, setPhotoCount }) {
  const [photos, setPhotos]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [uploadVisible, setUploadVisible] = useState(false);
  const [uploadType, setUploadType]   = useState('portrait');
  const [uploadStatus, setUploadStatus] = useState('');

  // Завантаження галереї з Firestore при монтуванні (тільки якщо авторизований)
  // Реальний Firebase:
  //   const snap = await getDocs(collection(db, 'gallery'));
  //   setPhotos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  useEffect(() => {
    if (!user) return; // не завантажувати якщо не авторизований
    db.getCollection('gallery')
      .then(data => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // Якщо не авторизований — показати заглушку LockedGate
  if (!user) {
    return (
      <section id="gallery" className="page-enter">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-label">Роботи студентів</span>
              <h2>Гале<span>рея</span></h2>
            </div>
          </div>
          <LockedGate sectionName="Галерея" onOpenAuth={onOpenAuth} />
        </div>
      </section>
    );
  }

  // Фільтрація фото
  const filtered = activeFilter === 'all'
    ? photos
    : photos.filter(p => p.type === activeFilter);

  // Заглушки фото для «завантаження»
  const placeholders = {
    portrait:  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
    landscape: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80',
    macro:     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80',
    street:    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80',
  };

  // Запис нового фото у Firestore
  // Реальний Firebase:
  //   const ref = await addDoc(collection(db, 'gallery'), newPhoto);
  //   setPhotos(p => [...p, { id: ref.id, ...newPhoto }]);
  async function handleUpload() {
    const newPhoto = {
      type:   uploadType,
      author: user.displayName || user.email,
      img:    placeholders[uploadType],
    };
    const saved = await db.addDocument('gallery', newPhoto);
    setPhotos(p => [...p, saved]);
    setPhotoCount(c => c + 1);
    setUploadVisible(false);
    setUploadStatus(`✓ Фото «${TYPE_LABELS[uploadType]}» додано до галереї!`);
    setTimeout(() => setUploadStatus(''), 3000);
  }

  return (
    <section id="gallery" className="page-enter">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-label">Роботи студентів</span>
            <h2>
              Гале<span>рея</span>
              <span className="db-badge" title="Дані завантажено з Firebase Firestore">
                🔥 Firestore
              </span>
            </h2>
          </div>
        </div>

        {/* Фільтри */}
        <div className="filter-bar">
          {['all', 'portrait', 'landscape', 'macro', 'street'].map(f => (
            <button
              key={f}
              className={`filter-btn${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f === 'all' ? 'Всі' : TYPE_LABELS[f]}
            </button>
          ))}
          <span className="filter-count">{filtered.length} фото</span>
        </div>

        {/* Галерея або скелетон */}
        {loading ? (
          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="gallery-item skeleton-card" />
            ))}
          </div>
        ) : (
          <div className="gallery-grid">
            {filtered.map(photo => (
              <GalleryItem key={photo.id} photo={photo} />
            ))}
          </div>
        )}

        {/* Завантаження фото */}
        <div className="upload-controls">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setUploadVisible(v => !v)}
          >
            📷 Завантажити фотографію
          </button>
          {uploadStatus && (
            <span style={{ fontSize: '0.82rem', color: 'var(--success)' }}>
              {uploadStatus}
            </span>
          )}
        </div>

        <div className={`upload-zone${uploadVisible ? ' visible' : ''}`}>
          <p style={{ marginBottom: '1rem' }}>Оберіть тип знімка:</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.2rem' }}>
            {['portrait', 'landscape', 'macro', 'street'].map(t => (
              <button
                key={t}
                className={`filter-btn${uploadType === t ? ' active' : ''}`}
                onClick={() => setUploadType(t)}
              >
                {TYPE_LABELS[t]}
              </button>
            ))}
          </div>
          <button className="btn btn-primary" onClick={handleUpload}>
            Додати до галереї
          </button>
          <p style={{ marginTop: '0.75rem', fontSize: '0.78rem' }}>
            <strong>Оберіть тип</strong> та натисніть кнопку
          </p>
        </div>
      </div>
    </section>
  );
}

export default GalleryPage;