import React, { useEffect, useState } from 'react';
import './categorie.css';

function Reconversion({ user }) {
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const videoSample = [
    {
      id: 1,
      title: 'La reconversion professionnelle, c’est quoi ?',
      url: 'https://www.youtube.com/embed/hzQ4xR8pA5E'
    },
    {
      id: 2,
      title: "Les secrets d'une reconversion réussie",
      url: 'https://www.youtube.com/embed/jHNK6PD1-Tk'
    },
    {
      id: 3,
      title: 'Reconversion professionnelle après 50 ans',
      url: 'https://www.youtube.com/embed/G9TEgwqZXN4'
    },
    {
      id: 4,
      title: 'Changer de métier : par où commencer ?',
      url: 'https://www.youtube.com/embed/Gx7NF7cpgfk?si=qjeKWG5JB_KTLF73'
    }
  ];

  useEffect(() => {
    fetch('http://localhost:8081/public/v1/videos/?service=reconversion')
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
      <h1 className="page-title">Reconversion</h1>
      <p className="page-description">
        Découvrez des vidéos pour vous accompagner dans votre reconversion professionnelle. Apprenez
        de nouvelles compétences et explorez différentes voies professionnelles.
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
export default Reconversion;
