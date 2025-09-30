import React, { useEffect, useState } from 'react';
import './categorie.css';

function Orientation({ user }) {
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const videoSample = [
    {
      id: 1,
      url: 'https://www.youtube.com/embed/2LhoCfjm8R4',
      title: 'Orientation 1'
    },
    {
      id: 2,
      url: 'https://www.youtube.com/embed/fC9da6eqaqg',
      title: 'Orientation 2'
    },
    {
      id: 3,
      url: 'https://www.youtube.com/embed/mgmVOuLgFB0',
      title: 'Orientation 3'
    },
    {
      id: 4,
      url: 'https://www.youtube.com/embed/MrEDIr4Qrwk?si=wQ1npwCyZp06KnKx',
      title: 'Orientation 4'
    }
  ];

  useEffect(() => {
    fetch('http://localhost:8081/public/v1/videos/?service=orientation')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors de la récupération des vidéos');
        return res.json();
      })
      .then((data) => {
        setVideos(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

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
      <h1 className="page-title">Orientation</h1>
      <p className="page-description">
        Trouvez votre voie grâce à ces vidéos d’orientation. Elles vous aident à identifier vos
        forces, explorer de nouvelles opportunités et construire un projet solide.
      </p>
      <p>{error}</p>

      {message && <p className="video-message">{message}</p>}
      {!user && (
        <div className="video-grid">
          {videoSample.map((video) => (
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
              <iframe
                width="560"
                height="315"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />

              {!user && (
                <div className="video-overlay">
                  <p>Connexion requise pour regarder la vidéo</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {user && (
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
              <iframe
                width="560"
                height="315"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />

              {!user && (
                <div className="video-overlay">
                  <p>Connexion requise pour regarder la vidéo</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

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

export default Orientation;
