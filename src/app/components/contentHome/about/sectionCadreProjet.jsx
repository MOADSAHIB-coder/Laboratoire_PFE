import { FaUserCog, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

const publics = [
  {
    icon: <FaUserCog className="w-10 h-10 text-blue-600" />,
    title: "Administrateurs",
    items: [
      "Gestion globale de la plateforme",
      "Création et gestion des utilisateurs",
      "Supervision du système",
    ],
  },
  {
    icon: <FaChalkboardTeacher className="w-10 h-10 text-green-600" />,
    title: "Enseignants",
    items: [
      "Création et gestion des cours et TPs",
      "Suivi des performances des étudiants",
      "Correction et évaluation",
    ],
  },
  {
    icon: <FaUserGraduate className="w-10 h-10 text-purple-600" />,
    title: "Étudiants",
    items: [
      "Accès aux cours et ressources pédagogiques",
      "Réalisation des TPs",
      "Consultation des résultats et feedbacks",
    ],
  },
];

function PublicCard({ icon, title, items }) {
  return (
    <div
      className="rounded-2xl bg-white p-6 ring-1 ring-gray-200 shadow-sm 
                 transition-all duration-300
                 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Public() {
  return (
    <section className="mx-auto max-w-7xl bg-blue-50 px-6 py-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-10">
        Public concerné
      </h2>

      <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2">
        {publics.map((p, index) => (
          <PublicCard
            key={index}
            icon={p.icon}
            title={p.title}
            items={p.items}
          />
        ))}
      </div>
    </section>
  );
}
