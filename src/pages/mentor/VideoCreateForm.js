import React, { useState } from 'react';

function VideoCreateForm({ user }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !url || !description || !duration || !serviceId) {
      setError('Tous les champs sont obligatoires');
      setSuccess('');
      return;
    }

    const durationInt = parseInt(duration, 10);
    const serviceIdInt = parseInt(serviceId, 10);

    if (Number.isNaN(durationInt) || Number.isNaN(serviceIdInt)) {
      setError('Veuillez remplir correctement tous les champs numériques');
      setSuccess('');
      return;
    }

    const videoData = {
      title: title.trim(),
      url: url.trim(),
      description: description.trim(),
      duration: durationInt,
      author: user.email, // automatiquement l'email du mentor
      serviceId: serviceIdInt,
      utilisateurId: user.id // id du mentor
    };
    console.log('Envoi au backend :', JSON.stringify(videoData));

    try {
      const res = await fetch('http://localhost:8081/public/v1/videos/', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videoData)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erreur lors de la création de la vidéo: ${text}`);
      }

      // Parser JSON seulement si présent et valide
      const text = await res.text();
      let data = {};
      try {
        data = JSON.parse(text);
        console.log('Vidéo créée :', data);
      } catch {
        console.warn('Réponse non-JSON ou vide:', text);
      }

      setSuccess(`Vidéo "${data.title || title}" créée avec succès !`);

      setSuccess('Vidéo créée avec succès !');
      setError('');
      setTitle('');
      setUrl('');
      setDescription('');
      setDuration('');
      setServiceId('');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
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
