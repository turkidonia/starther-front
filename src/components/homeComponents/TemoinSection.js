import React from 'react';
import '../../pages/home/home.css';

const temoignages = [
  {
    name: 'Leïla, 32 ans – De secrétaire médicale à développeuse web',
    embedUrl: 'https://www.youtube.com/embed/SEfNHwrK2yA',
    text: "J'ai toujours été curieuse de comprendre comment fonctionnaient les sites que j'utilisais. Grâce à START HER, j'ai pu suivre des vidéos claires et motivantes, et surtout échanger avec une mentore qui avait suivi le même chemin. Aujourd'hui, je travaille en tant que développeuse web junior dans une startup e-santé. Je n'aurais jamais cru cela possible il y a deux ans."
  },
  {
    name: 'Fatou, 40 ans – De vendeuse en prêt-à-porter à UX Designer',
    embedUrl: 'https://www.youtube.com/embed/5B_QWXSsquM',
    text: "Après 15 ans dans le commerce, j'avais besoin de changement, mais je ne savais pas par où commencer. Sur START HER, j'ai trouvé un accompagnement bienveillant et des témoignages dans lesquels je me reconnaissais. Aujourd'hui, je suis en alternance dans une agence de design, et je crée des expériences utilisateurs inclusives."
  },
  {
    name: 'Julie, 28 ans – De professeure des écoles à cheffe de projet digital',
    embedUrl: 'https://www.youtube.com/embed/O-aaiiazhms',
    text: "L'enseignement m'a appris la rigueur et la pédagogie, mais je voulais explorer d'autres horizons. J'ai suivi les modules vidéo sur la gestion de projet digital, et j'ai pu poser toutes mes questions à ma mentore, qui avait aussi un profil littéraire. Grâce à elle, j'ai décroché mon premier stage en gestion de produit !"
  },
  {
    name: 'Samira, 35 ans – De mère au foyer à développeuse freelance',
    embedUrl: 'https://www.youtube.com/embed/aKITSPI5SXE',
    text: "Après plusieurs années consacrées à mes enfants, je pensais qu'un retour à l'emploi dans la tech serait inaccessible. START HER m'a redonné confiance, étape par étape. Les parcours partagés par d'autres femmes m'ont inspirée. Aujourd'hui, je développe des sites pour des clientes entrepreneuses comme moi."
  }
];

function TemoinSection() {
  return (
    <section className="temoignages">
      <h2>Nos mentorées racontent leur parcours</h2>
      {temoignages.map((t) => (
        <div key={t.name + t.embedUrl} className="temoignage-bloc">
          <div className="temoignage-titre">
            <h3>{t.name}</h3>
          </div>
          <div className="temoignage-video">
            <iframe
              width="560"
              height="315"
              src={t.embedUrl}
              title={t.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="temoignage-texte text-justify">{t.text}</p>
        </div>
      ))}
    </section>
  );
}

export default TemoinSection;
