import React, { useState } from 'react';

function VideoCreateForm({user}) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const services = [
    {
      id: 1,
      name: 'Formation'
    },
    {
      id: 2,
      name: 'Reconversion'
    },
    {
      id: 3,
      name: 'Orientation'
    },
    {
      id: 4,
      name: 'Insertion Professionnelle'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !url || !description || !duration || !author || !publisher || !serviceId) {
      setError('Tous les champs sont obligatoires');
      setSuccess('');
      return;
    }

    const videoData = {
      title,
      url,
      description,
      duration: parseInt(duration, 10), // radix ajouté
      author: user.email, //author
      publisher,
      serviceId
    };

    fetch('http://localhost:8081/public/v1/videos/', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(videoData)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors de la création de la vidéo');
        return res.json();
      })
      .then(() => {
        setSuccess('Vidéo créée avec succès !');
        setError('');
        setTitle('');
        setUrl('');
        setDescription('');
        setDuration('');
        setAuthor('');
        setPublisher('');
        setServiceId('');
      })
      .catch((err) => {
        setError(err.message);
        setSuccess('');
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Créer une vidéo</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    
      <div>
        <label htmlFor="titre">Titre :</label>
        <input
          id="titre"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="url">URL :</label>
        <input id="url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
      </div>

      <div>
        <label htmlFor="description">Description :</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>

      <div>
        <label htmlFor="duree">Durée (minutes) :</label>
        <input
          id="duree"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="auteur">Auteur :</label>
        <input
          id="auteur"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="publisher">Publisher :</label>
        <input
          id="publisher"
          type="text"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="service">Service :</label>
        <select value={serviceId} onChange={(e) => setServiceId(e.target.value)} required>
          <option value="">--Choisir un service--</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Créer la vidéo</button>
    </form>
  );
}

export default VideoCreateForm;
