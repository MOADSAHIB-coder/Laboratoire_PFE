import { useState } from "react";
import { membres } from "./dataAbout";

function AfficherProfils() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = membres.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const getIndex = (offset) => {
    return (currentIndex + offset + total) % total;
  };

  const left = membres[getIndex(-1)];
  const center = membres[getIndex(0)];
  const right = membres[getIndex(1)];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
          Équipe du projet
        </h2>

        <div className="relative flex items-center justify-center gap-10">
          {/* bouton gauche */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-20 w-12 h-12 rounded-full bg-blue-600 text-white text-xl shadow-lg hover:bg-blue-700"
          >
            ←
          </button>

          {/* image gauche floutée */}
          <div className="w-48 h-60 overflow-hidden rounded-2xl shadow-lg blur-sm opacity-70 transition">
            <img
              src={left.photo}
              alt={left.nomPrenom}
              className="w-full h-full object-cover"
            />
          </div>

          {/* image centrale */}
          <div className="w-60 h-72 overflow-hidden rounded-3xl shadow-2xl scale-105 transition">
            <img
              src={center.photo}
              alt={center.nomPrenom}
              className="w-full h-full object-cover"
            />
          </div>

          {/* image droite floutée */}
          <div className="w-48 h-60 overflow-hidden rounded-2xl shadow-lg blur-sm opacity-70 transition">
            <img
              src={right.photo}
              alt={right.nomPrenom}
              className="w-full h-full object-cover"
            />
          </div>

          {/* bouton droit */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-20 w-12 h-12 rounded-full bg-blue-600 text-white text-xl shadow-lg hover:bg-blue-700"
          >
            →
          </button>
        </div>

        {/* Informations */}
        <div className="mt-12 flex justify-center">
          <div className="text-center max-w-xl">
            {/* Nom */}
            <h3 className="text-2xl font-bold text-gray-900 tracking-wide">
              {center.nomPrenom}
            </h3>

            {/* Statut */}
            <p className="text-blue-600 text-lg font-medium mt-2">
              {center.statut}
            </p>

            {/* Ligne décorative */}
            <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>

            {/* Role */}
            {center.role && (
              <p className="text-gray-700 mt-4 font-medium">{center.role}</p>
            )}

            {/* Description */}
            {center.description && (
              <p className="text-gray-500 mt-3 leading-relaxed">
                {center.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AfficherProfils;
