import Card from "../../../components/contentHome/teamCard";

import { FaFlask, FaNetworkWired, FaRobot, FaChartBar } from "react-icons/fa";
import { BookOpen, MessageSquare } from "lucide-react";

// Liste des fonctionnalités affichées sous forme de cartes

export const features = [
  {
    icon: <BookOpen className="text-blue-500 w-8 h-8" />,
    title: "Accès aux cours et TPs",
    description: `Consultation des supports pédagogiques
Téléchargement des cours et documents
Accès centralisé aux TPs`,
    href: "#cours",
  },
  {
    icon: <FaFlask className="text-green-500 w-8 h-8" />,
    title: "Espace TP interactif",
    description: `Réalisation des travaux pratiques directement en ligne
Soumission des devoirs via la plateforme
Visualisation des résultats et feedbacks`,
    href: "#tp",
  },
  {
    icon: <FaNetworkWired className="text-purple-500 w-8 h-8" />,
    title: "Configuration réseau virtuelle",
    description: `Création de topologies réseau
Configuration des équipements (routeurs, switchs, etc.)
Simulation de scénarios réels de réseaux`,
    href: "#reseau",
  },
  {
    icon: <FaRobot className="text-yellow-500 w-8 h-8" />,
    title: "Génération automatique de TPs",
    description: `Génération intelligente de TPs personnalisés
Adaptation selon le niveau de l’étudiant
Réduction de la triche et amélioration de l’évaluation individuelle`,
    href: "#generation",
  },
  {
    icon: <FaChartBar className="text-red-500 w-8 h-8" />,
    title: "Suivi et correction",
    description: `Suivi en temps réel des activités des étudiants
Correction des TPs par les enseignants
Publication des résultats et commentaires`,
    href: "#suivi",
  },
  {
    icon: <MessageSquare className="text-indigo-500 w-8 h-8" />,
    title: "Échange et collaboration",
    description: `Espace de discussion étudiants–enseignants
Partage d’idées et questions techniques
Favorisation du travail collaboratif`,
    href: "#collaboration",
  },
];

// Section qui affiche les fonctionnalités principales sous forme de cartes

export default function Fonctionalite() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 bg-white">
      <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-blue-950 pb-6">
        Services&Fonctionnatés
      </h2>
      {/* Génération dynamique des cartes à partir des fonctionnalités */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            href={`/fonctionnalite${feature.href || ""}`}
          />
        ))}
      </div>
    </section>
  );
}

<Card />;
