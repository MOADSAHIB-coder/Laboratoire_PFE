import { Link } from "react-router-dom";
import { FaUserCog, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

const publics = [
  {
    icon: <FaUserCog className="h-10 w-10 text-blue-600" />,
    title: "Administrateurs",
    to: "/espace-admin",
    hoverText: "Accéder à l’espace administrateur",
    items: [
      "Gestion globale de la plateforme",
      "Création et gestion des utilisateurs",
      "Supervision du système",
    ],
  },
  {
    icon: <FaChalkboardTeacher className="h-10 w-10 text-green-600" />,
    title: "Enseignants",
    to: "/espace-enseignant",
    hoverText: "Accéder à l’espace enseignant",
    items: [
      "Création et gestion des cours et TPs",
      "Suivi des performances des étudiants",
      "Correction et évaluation",
    ],
  },
  {
    icon: <FaUserGraduate className="h-10 w-10 text-purple-600" />,
    title: "Étudiants",
    to: "/espace-etudiant",
    hoverText: "Accéder à l’espace étudiant",
    items: [
      "Accès aux cours et ressources pédagogiques",
      "Réalisation des TPs",
      "Consultation des résultats et feedbacks",
    ],
  },
];

function PublicCard({ icon, title, items, to, hoverText }) {
  return (
    <Link
      to={to}
      title={hoverText}
      aria-label={hoverText}
      className="group block rounded-2xl bg-white p-6 ring-1 ring-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="mb-4">{icon}</div>

      <h3 className="mb-3 text-lg font-semibold text-gray-900">{title}</h3>

      <ul className="space-y-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>

      <div className="mt-5 text-sm font-medium text-blue-600 opacity-0 transition duration-300 group-hover:opacity-100">
        {hoverText}
      </div>
    </Link>
  );
}

export default function Public() {
  return (
    <section className="mx-auto max-w-7xl bg-blue-50 px-6 py-16">
      <h2 className="mb-10 text-2xl font-bold text-gray-900">
        Public concerné
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {publics.map((p, index) => (
          <PublicCard
            key={index}
            icon={p.icon}
            title={p.title}
            items={p.items}
            to={p.to}
            hoverText={p.hoverText}
          />
        ))}
      </div>
    </section>
  );
}
