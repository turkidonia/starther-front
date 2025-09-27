import React, { useState } from 'react';
import VideoCreateForm from '../mentor/VideoCreateForm'; // ✅ importer ton formulaire
import './espace.css';

function EspaceMentor({ user }) {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="mentor-container">
      {/* Section profil */}
      <section className="mentor-profile">
        <div className="mentor-info">
          <img
            src="https://via.placeholder.com/120"
            alt="Photo mentor"
            className="mentor-avatar"
          />
          <div>
            <h1 className="mentor-name">Profil Mentor</h1>
            <p className="mentor-bio">
              Bienvenue <strong>{user?.username || 'Mentor'}</strong> 👋  
              Cet espace vous permet de partager vos vidéos, 
              guider les mentorées et enrichir la plateforme <strong>START HER</strong>.
            </p>
          </div>
        </div>

        {/* Bouton toggle */}
        <button className="btn-primary" onClick={toggleForm}>
          {showForm ? '❌ Fermer le formulaire' : '➕ Créer une vidéo'}
        </button>
      </section>

      {/* Formulaire affiché uniquement si showForm est vrai */}
      {showForm && (
        <section className="mentor-form">
          <VideoCreateForm user = {user}/>
        </section>
      )}
    </div>
  );
}


export default EspaceMentor;
