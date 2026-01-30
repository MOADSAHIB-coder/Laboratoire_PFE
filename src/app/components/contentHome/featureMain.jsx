import { motion } from "framer-motion";

function MainFeature() {
  const Features = [
    {
      title: "TPs/Cours",
      description:
        "Accédez à tous vos cours et TPs, des supports pédagogiques disponibles à tout moment et téléchargeables.",
      icon: "📚",
    },
    {
      title: "Espace TP interactif",
      description:
        "Réalisez et soumettre vos devoirs directement en ligne et voir les resultats.",
      icon: "💻",
    },
    {
      title: "Génération automatique de TP",
      description:
        "Recevez des TPs générés automatiquent et personnalisés selon niveau.",
      icon: "⚙️",
    },
    {
      title: "Configuration Réseau",
      description:
        "Vous pouvez acceder à l'espace de configurations, créer des topologies et configurer le réseau.",
      icon: "📡",
    },
    {
      title: "Échange entre étudiants et enseignants",
      description:
        "Partagez vos idées et posez vos questions dans l’espace dédié.",
      icon: "💬",
    },
    {
      title: "Suivi et correction",
      description:
        "Les enseignants peuvent surveiller les étudiants, corriger les TPs et soumettre les resultats.",
      icon: "📝",
    },
  ];

  return (
    <section className="p-y-25 text-center relative py-24 bg-gradient-to-br from-blue-500 via-white to-blue-300">
      <h2 className="text-3xl font-bold mb-4">Fonctionnalités et Services</h2>
      <div className="grid grid-cols-3 gap-10 max-w-7xl mx-auto ">
        {Features.map((tache, idx) => (
          <motion.div
            key={idx}
            initial={{
              opacity: 0,
              x: idx % 3 === 0 ? -150 : idx % 3 === 2 ? 100 : 0,
              y: idx % 3 === 1 ? 100 : 0,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            transition={{
              type: "spring",
              ease: "linear",

              stiffness: 300,
              damping: 20,
              delay: idx * 0.2,
            }}
            drag
            dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
            whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05 }}
            viewport={{ once: true }}
            className="p-6 border rounded-r-lg hover:shadow-lg  hover:bg-pink-200 transition  transform duration-300
                hover:-translate-y-3 touch-manipulation"
          >
            <div
              className="hover:shadow-lg  border border-b-8 border-gray-800 touch-manipulation   transform transition duration-300
                hover:-translate-y-3 text-5xl mb-4"
            >
              {" "}
              <button onClick=""> {tache.icon}</button>
            </div>
            <h3 className="text-xl font-semibold mb-2">{tache.title}</h3>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-600"
            >
              {tache.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default MainFeature;
