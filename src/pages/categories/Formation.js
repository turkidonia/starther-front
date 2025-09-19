import React, { useState } from 'react';
import './categorie.css';

function Formation({user}) {
  const [message, setMessage] = useState('');

  const videos = [
    { id: 1, url: 'https://www.youtube.com/embed/1hHMwLxN6EM', title: 'Formation 1' },
    { id: 2, url: 'https://www.youtube.com/embed/jV8B24rSN5o', title: 'Formation 2' },
    { id: 3, url: 'https://www.youtube.com/embed/2ePf9rue1Ao', title: 'Formation 3' },
    { id: 4, url: 'https://www.youtube.com/embed/5MgBikgcWnY', title: 'Formation 4' }
  ];

  const handleVideoClick = (video) => {
    if (!user) {
      setMessage('Vous devez créer un compte ou vous connecter pour accéder à cette vidéo.');
      return;
    }
    window.open(video.url, '_blank');
  };

  const handleLoginClick = () => {
    
    window.location.href = '/login';
  };

  return (
    <div className="page-container">
      
      <h1 className="page-title">Formation{user?.username}</h1>
      <p className="page-description">
        Découvrez nos vidéos de formation dédiées à la reconversion professionnelle des femmes. Ces
        ressources vous accompagnent pas à pas pour acquérir de nouvelles compétences.
      </p>

      {message && <p className="video-message">{message}</p>}

      <div className="video-grid">
        {videos.map((video) => (
          <div
            key={video.id}
            className="video-wrapper"
            role="button"
            tabIndex={0}
            onClick={() => handleVideoClick(video)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleVideoClick(video);
            }}
          >
            <iframe src={video.url} title={video.title} allowFullScreen />

            {!user && (
              <div className="video-overlay">
                <p>Connexion requise pour regarder la vidéo</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bouton connexion visible seulement si non connecté */}
      {!user && (
        <div className="login-button-container">
          <button type="button" className="login-button" onClick={handleLoginClick}>
            Se connecter
          </button>
        </div>
      )}
    </div>
  );
}

export default Formation;
