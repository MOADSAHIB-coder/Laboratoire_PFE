import {
  FaBook,
  FaFlask,
  FaNetworkWired,
  FaRobot,
  FaChartBar,
  FaComments,
  FaChartLine,
  FaUsers,
  FaShieldAlt,
  FaLaptopCode,
} from "react-icons/fa";

// Donnees de setion fontionnalite

export const features = [
  {
    icon: <FaBook className="text-blue-500 w-8 h-8" />,
    title: "Accès aux cours et TPs",
    description: `Consultation des supports pédagogiques
Téléchargement des cours et documents
Accès centralisé aux TPs`,
  },
  {
    icon: <FaFlask className="text-green-500 w-8 h-8" />,
    title: "Espace TP interactif",
    description: `Réalisation des travaux pratiques directement en ligne
Soumission des devoirs via la plateforme
Visualisation des résultats et feedbacks`,
  },
  {
    icon: <FaNetworkWired className="text-purple-500 w-8 h-8" />,
    title: "Configuration réseau virtuelle",
    description: `Création de topologies réseau
Configuration des équipements (routeurs, switchs, etc.)
Simulation de scénarios réels de réseaux`,
  },
  {
    icon: <FaRobot className="text-yellow-500 w-8 h-8" />,
    title: "Génération automatique de TPs",
    description: `Génération intelligente de TPs personnalisés
Adaptation selon le niveau de l’étudiant
Réduction de la triche et amélioration de l’évaluation individuelle`,
  },
  {
    icon: <FaChartBar className="text-red-500 w-8 h-8" />,
    title: "Suivi et correction",
    description: `Suivi en temps réel des activités des étudiants
Correction des TPs par les enseignants
Publication des résultats et commentaires`,
  },
  {
    icon: <FaComments className="text-indigo-500 w-8 h-8" />,
    title: "Échange et collaboration",
    description: `Espace de discussion étudiants–enseignants
Partage d’idées et questions techniques
Favorisation du travail collaboratif`,
  },
];

// Données de section objectifs

export const objectif = [
  {
    icon: <FaNetworkWired className="w-10 h-10 text-blue-600" />,
    title: "Laboratoire virtuel sécurisé",
    description: "Offrir un environnement de laboratoire fiable et sécurisé.",
  },
  {
    icon: <FaLaptopCode className="w-10 h-10 text-green-600" />,
    title: "TPs pratiques en ligne",
    description:
      "Permettre aux étudiants de réaliser des TPs pratiques à distance.",
  },
  {
    icon: <FaRobot className="w-10 h-10 text-purple-600" />,
    title: "Automatisation intelligente",
    description: "Automatiser la génération et la personnalisation des TPs.",
  },
  {
    icon: <FaChartLine className="w-10 h-10 text-red-600" />,
    title: "Suivi pédagogique",
    description: "Améliorer l’évaluation continue et le suivi des étudiants.",
  },
  {
    icon: <FaUsers className="w-10 h-10 text-indigo-600" />,
    title: "Interaction et collaboration",
    description: "Favoriser les échanges entre étudiants et enseignants.",
  },
  {
    icon: <FaShieldAlt className="w-10 h-10 text-yellow-500" />,
    title: "Compétences avancées",
    description:
      "Renforcer les compétences en réseaux, sécurité et administration système.",
  },
];

export const membres = [
  {
    nomPrenom: "MOAD SAHIB",
    statut: "Etudiant",

    description: "En 2 ème année de Gestion des Résequx et Sécurité",
    photo: "/images/juste2.jpeg",
  },
  {
    nomPrenom: "MEME-LEKO Juste Glavany",
    statut: "Etudiant",

    description: "En 2 ème année de Gestion des Résequx et Sécurité",
    photo: "/images/juste.jpeg",
  },
  {
    nomPrenom: "FRAH LOUBNA",
    statut: "Etudiante",

    description: "En 2 ème année de Gestion des Résequx et Sécurité",
    photo: "/images/juste.jpeg",
  },
];
