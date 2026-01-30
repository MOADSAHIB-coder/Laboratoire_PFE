import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function MainHero() {
  const slides = [
    "/images/labo1.jpg",
    "/images/labo4.jpg",
    "/images/labo3.jpg",
    "/images/labo5.jpg",
    "/images/labo7.jpg",
    "/images/labo9.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidde"
      style={{ backgroundImage: `url(${slides[current]})` }}
    >
      {slides.map((slide, idx) => (
        <motion.div
          key={idx}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: idx === current ? 1 : 0 }}
          transition={{ duration: 2 }}
        ></motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/40"></div>
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 flex flex-col justify-center min-h-screen"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-yellow-300 mb-4 "
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Bienvenu sur LabTeCH
        </motion.h1>
        <p className="text-lg sm:text-xl text-white mb-6">
          {" "}
          Votre laboratoire virtuel pour la réalisation de TP réseau et
          l’apprentissage des cours.
        </p>
      </motion.div>
    </section>
  );
}

export default MainHero;
