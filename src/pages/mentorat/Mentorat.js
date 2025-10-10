import React from 'react';
import { Link } from 'react-router-dom';
import './mentorat.css';
import { FaStar } from 'react-icons/fa';

const mentors = [
  {
    id: 1,
    name: 'Sophie Dupont',
    domaine: 'Développement Web',
    note: 4.8,
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Amélie Bernard',
    domaine: 'Marketing Digital',
    note: 4.6,
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    id: 3,
    name: 'Claire Martin',
    domaine: 'Data & IA',
    note: 4.9,
    image: 'https://randomuser.me/api/portraits/women/12.jpg'
  },
  {
    id: 4,
    name: 'Julie Lefèvre',
    domaine: 'Entrepreneuriat',
    note: 4.7,
    image: 'https://randomuser.me/api/portraits/women/19.jpg'
  }
];

function Mentorat() {
  return (
    <section className="mentorat">
      <div className="mentorat-header">
        <h1>Nos Mentors</h1>
        <p>
          Découvrez nos mentors passionnés, expertes dans leur domaine, prêtes à guider les femmes
          dans leur reconversion professionnelle grâce à un accompagnement personnalisé.
        </p>
      </div>

      <div className="mentors-grid">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="mentor-card">
            <img src={mentor.image} alt={mentor.name} className="mentor-img" />
            <h3>{mentor.name}</h3>
            <p className="mentor-domaine">{mentor.domaine}</p>
            <div className="mentor-rating">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} color={i < Math.round(mentor.note) ? '#FF7E33' : '#ddd'} />
              ))}
              <span className="mentor-note">{mentor.note.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="contact-button-container">
        <Link to="/contact">
          <button type="button" className="contact-button">
            Contactez-nous
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Mentorat;
