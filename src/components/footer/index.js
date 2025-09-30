import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/image.png';
import SAP from '../../assets/logo3.png';
import desCodeuses from '../../assets/logo1.png';
import franceTravail from '../../assets/logo2.png';

import './footer.css';

function Footer() {
  useEffect(() => {
    const logos = document.querySelectorAll('.partners-logos img');

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    logos.forEach((logo) => observer.observe(logo));
  }, []);

  return (
    <footer className="footer text-light py-5">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Logo */}
          <div className="col-md-3 mb-4">
            <img
              src={logo}
              alt="Logo du site"
              className="img-fluid"
              style={{ maxWidth: '200px' }}
            />
          </div>

          {/* Info */}
          <div className="col-md-3 mb-4">
            <h3 className="footer-title">START HER</h3>
            <p>
              Nous sommes une plateforme de mentorat dédiée à l&apos;accompagnement des femmes dans
              leur parcours de reconversion professionnelle.
            </p>
            <p>
              Rejoignez-nous pour accéder à des ressources éducatives, des témoignages et plus
              encore.
            </p>
          </div>

          {/* Partenaires */}
          <div className="col-md-3 mb-4">
            <h4 className="footer-subtitle">Nos Partenaires</h4>
            <div className="d-flex justify-content-center justify-content-md-start flex-wrap partners-logos">
              <a
                href="https://www.sap.com/france/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={SAP} alt="SAP" className="m-2" />
              </a>
              <a href="https://descodeuses.org/" target="_blank" rel="noopener noreferrer">
                <img src={desCodeuses} alt="DesCodeuses" className="m-2" />
              </a>
              <a href="https://www.francetravail.fr/" target="_blank" rel="noopener noreferrer">
                <img src={franceTravail} alt="France Travail" className="m-2" />
              </a>
            </div>
          </div>

          {/* Liens */}
          <div className="col-md-3 mb-4">
            <h4 className="footer-subtitle">Liens Utiles</h4>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/confidentialite" target="_blank">
                  Politique de confidentialité
                </NavLink>
              </li>
              <li>
                <NavLink to="/conditions" target="_blank">
                  Conditions d&apos;utilisation
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" target="_blank">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas de page */}
        <div className="text-center mt-4 footer-bottom">
          <p>&copy; {new Date().getFullYear()} START HER. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
