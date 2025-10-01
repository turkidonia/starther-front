import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../pages/home/home.css';

function HeroSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // On déclenche l'animation après que le composant soit monté
    setAnimate(true);
  }, []);

  return (
    <section className="hero py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div
            className={`col-lg-6 hero-left mb-4 mb-lg-0 text-center text-lg-start ${animate ? 'fade-in' : ''}`}
          >
            <h1 className="display-4 fw-bold mb-3">La mission de START HER</h1>
            <p className="lead mb-4 text-justify">
              Transformez votre passion en carrière numérique : rejoignez notre programme de
              mentorat dédié aux femmes en reconversion professionnelle pour un avenir brillant et
              connecté. Nous aidons les femmes à réussir leur reconversion professionnelle grâce à
              l&apos;accompagnement de mentors experts.
            </p>
            <Link to="/contact">
              <button type="button" className="btn-hero btn btn-warning btn-lg shadow-lg">
                Parlez avec un expert
              </button>
            </Link>
          </div>

          <div className={`col-lg-6 hero-right text-center ${animate ? 'fade-in-delay' : ''}`}>
            <div className="ratio ratio-16x9 shadow rounded">
              <iframe
                src="https://www.youtube.com/embed/MM5sNHPQpls"
                title="Vidéo START HER"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
