import { useState, useEffect } from "react";
import { membres } from "./dataAbout";
import Profil from "./profilMembre";

function AfficherProfils() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = membres.length;

  const ChangerProfil = (index) => {
    if (index < 0) {
      setCurrentIndex(total - 1);
    } else if (index >= total) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
    }, 5000);

    return () => clearInterval(interval);
  }, [total]);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
          Équipe du projet
        </h2>

        {/* Profil actif */}
        <Profil membre={membres[currentIndex]} />

        {/* Cercles de navigation */}
        <div className="flex justify-center gap-3 mt-6">
          {membres.map((_, index) => (
            <button
              key={index}
              onClick={() => ChangerProfil(index)}
              className={`w-3 h-3 rounded-full transition 
                ${index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-blue-400"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AfficherProfils;
