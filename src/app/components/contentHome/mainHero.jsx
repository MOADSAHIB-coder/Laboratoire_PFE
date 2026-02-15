import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import RotationText from "./rotationText";

// Composant MainHero : section principale du site avec un slideshow d'images et des textes animés

function MainHero() {
  const slides = [
    "/images/labo1.jpg",
    "/images/labo4.jpg",
    "/images/labo5.jpg",
    "/images/labo7.jpg",
  ];
  // Textes principaux animés
  const titres = ["Bienvenu sur ESTD-LabTechNet", "Votre laboratoire Virtuel"];
  const textes = [
    "Trouvez vos cours et Programmes",
    "Pour simuler Vos Réseaux",
    "Pour créer Vos TPs",
  ];

  // Directions pour l'animation du texte
  const directions = [
    { x: -100, y: 0 },
    { x: 100, y: 0 },
    { x: 0, y: 100 },
    { x: 0, y: -100 },
  ];

  const [current, setCurrent] = useState(0);

  // Bouton flèche gauche/droite
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };
  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Changement automatique de l'image toutes les 60s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 60000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      className="relative min-h-screen text-end  overflow-hidden"
      style={{ backgroundImage: `url(${slides[current]})` }}
    >
      {/* Toutes les images du slideshow superposées*/}
      {slides.map((slide, idx) => (
        <motion.div
          key={idx}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: idx === current ? 1 : 0 }} // Affiche seulement l'image courante
          transition={{ duration: 2 }} // transition fluide entre images
        ></motion.div>
      ))}

      {/* Dégradé sombre pour améliorer la lisibilité des textes */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/40"></div>

      {/*Texte animé superposé à droite*/}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 flex flex-col  items-end gap-6">
        <RotationText // Sous-textes animés
          items={titres}
          directions={directions}
          interval={8000}
          className="text-white border-l-8 border-white text-lg md:text-5xl font-bold bg-white/20 px-5 py-4 backdrop-blur-sm text-right"
        />
        <RotationText
          items={textes}
          directions={directions}
          interval={5000}
          className="text-red-600 border-l-8 border-white border-l-red-50 text-2xl sm:text-4xl md:text-6xl font-bold bg-white/20 px-5 py-4 backdrop-blur-sm text-right"
        />
      </div>
      {/* Boutons flèches */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
        <button
          onClick={handlePrev}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-2xl"
        >
          ←
        </button>

        <button
          onClick={handleNext}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-2xl"
        >
          →
        </button>
      </div>
    </section>
  );
}

export default MainHero;
