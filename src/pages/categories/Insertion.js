import React, { useEffect, useState } from 'react';
import './categorie.css';

function Insertion({ user }) {
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const videoSample = [
    {
      id: 1,
      title: 'Insertion 1',
      url: 'https://www.youtube.com/embed/8-ErnwLswVw?si=aSPmTyeyFpwZjNcT'
    },
    {
      id: 2,
      title: 'Insertion 2',
      url: 'https://www.youtube.com/embed/7sxpKhIbr0E?si=IL0LZpfJ__0vDRH8'
    },
    {
      id: 3,
      title: 'Insertion 3',
      url: 'https://www.youtube.com/embed/l3of0oOtpas?si=ZMW-eh0733Xmmb50'
    },
    {
      id: 4,
      title: 'Insertion 4',
      url: 'https://www.youtube.com/embed/MLDU8qI2USc?si=iZSUxtXaWceYNGuO'
    }
  ];

  useEffect(() => {
    fetch('http://localhost:8081/public/v1/videos/?service=Insertion-professionnelle')
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
  }, []); // exécution une seule fois au montage  pour eviter la boucle infinie dans le back

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
      <h1 className="page-title">Insertion professionnelle</h1>
      <p className="page-description">
        Nos vidéos sur l’insertion professionnelle vous guident pour intégrer efficacement le marché
        du travail après une formation ou une reconversion.
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

export default Insertion;
