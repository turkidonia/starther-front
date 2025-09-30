import React from 'react';
import { Link } from 'react-router-dom';
import '../../pages/home/home.css';
import { FaUserGraduate, FaChalkboardTeacher, FaStar } from 'react-icons/fa';

function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-image">
        <img
          src="https://d9hhrg4mnvzow.cloudfront.net/info.studi.com/catalogue-j/58d8452b-studi-catalogue-desktop-v3-09_1000000000000000000028.png"
          alt="Illustration formation"
        />
      </div>
      <div className="contact-content">
        <h2 className="contact-title">Pourquoi START HER ?</h2>
        <div className="stats">
          <div className="stat">
            <FaUserGraduate className="stat-icon" />
            <p className="stat-number">1 200</p>
            <p className="stat-text">Apprenants en cours de formation</p>
          </div>
          <div className="stat">
            <FaChalkboardTeacher className="stat-icon" />
            <p className="stat-number">450</p>
            <p className="stat-text">Conseillers, formateurs et coachs</p>
          </div>
          <div className="stat">
            <FaStar className="stat-icon" />
            <p className="stat-number">4.50/5</p>
            <p className="stat-text">sur MonCompteFormation.gouv.fr</p>
          </div>
        </div>
        <div className="contact-button-wrapper">
          <Link to="/contact">
            <button type="button" className="btn-contact">
              Contactez-nous
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
