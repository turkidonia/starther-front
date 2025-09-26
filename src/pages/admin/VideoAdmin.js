import React, { useEffect, useState } from 'react';

function VideoAdmin() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8081/public/v1/videos/')
      .then((res) => {
        if (!res.ok)
          throw new Error('Erreur lors de la récupération des vidéos');
        return res.json();
      })
      .then((data) => {
        setVideos(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []); // important: tableau vide pour éviter des appels infinis

  const toggleActive = async (id, next) => {
    // Optimistic update
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isActive: next } : v))
    );

    try {
      const res = await fetch(
        `http://localhost:8081/public/v1/videos/${id}/active`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ active: next })
        }
      );
      if (!res.ok) throw new Error(`Erreur serveur ${res.status}`);
    } catch (e) {
      // rollback si erreur
      setVideos((prev) =>
        prev.map((v) => (v.id === id ? { ...v, isActive: !next } : v))
      );
      alert("Impossible de mettre à jour l'état actif: " + e.message);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Gestion des vidéos</h1>

      {/* Si erreur */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Si aucune vidéo */}
      {videos.length === 0 && !error ? (
        <p>Aucune vidéo trouvée.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: 'collapse', width: '100%' }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Titre</th>
              <th>URL</th>
              <th>Description</th>
              <th>Durée</th>
              <th>Auteur</th>
              <th>Éditeur</th>
              <th>Service</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.id}>
                <td>{video.id}</td>
                <td>{video.title}</td>
                <td>
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    {video.url}
                  </a>
                </td>
                <td>{video.description}</td>
                <td>{video.duration} min</td>
                <td>{video.author}</td>
                <td>{video.publisher}</td>
                <td>{video.service ? video.service.name : '—'}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={!!video.isActive}
                    onChange={(e) => toggleActive(video.id, e.target.checked)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VideoAdmin;
