import React from 'react';
import { TYPE_LABELS } from '../data';

function GalleryItem({ photo }) {
    return (
    <div className="gallery-item">
        <img src={photo.img} alt={`${TYPE_LABELS[photo.type]} — ${photo.author}`} loading="lazy" />
        <div className="gallery-overlay">
        <span className="gallery-type">{TYPE_LABELS[photo.type]}</span>
        <span className="gallery-author">{photo.author}</span>
        </div>
    </div>
    );
}