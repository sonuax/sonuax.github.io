import React, { useState } from 'react';
import { TYPE_LABELS, INITIAL_GALLERY } from '../data';
import GalleryItem from '../components/GalleryItem';
import LockedGate  from '../components/LockedGate';

function GalleryPage({ user, onOpenAuth, photoCount, setPhotoCount }) {
  const [photos, setPhotos] = useState(() => {
  const saved = localStorage.getItem('userPhotos');
  return saved ? [...INITIAL_GALLERY, ...JSON.parse(saved)] : INITIAL_GALLERY;
});
  const [activeFilter, setActiveFilter]   = useState('all');
  const [uploadVisible, setUploadVisible] = useState(false);
  const [uploadType, setUploadType]       = useState('portrait');
  const [uploadStatus, setUploadStatus]   = useState('');

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

  const filtered = activeFilter === 'all'
    ? photos
    : photos.filter(p => p.type === activeFilter);

  const placeholders = {
            portrait: '/photo/portrait-sp.png',
        landscape: '/photo/landscape-sp.png',
        macro: '/photo/macro-sp.png',
        street: '/photo/street-sp.png',
  };

  function handleUpload() {
    const newPhoto = {
      id:     Date.now(),
      type:   uploadType,
      author: user.displayName || user.email,
      img:    placeholders[uploadType],
    };

    // зберігаємо нові фото в localStorage
  const saved = localStorage.getItem('userPhotos');
  const existing = saved ? JSON.parse(saved) : [];
  localStorage.setItem('userPhotos', JSON.stringify([...existing, newPhoto]));
  
    setPhotos(p => [...p, newPhoto]);
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
            <h2>Гале<span>рея</span></h2>
          </div>
        </div>

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

        <div className="gallery-grid">
          {filtered.map(photo => (
            <GalleryItem key={photo.id} photo={photo} />
          ))}
        </div>

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