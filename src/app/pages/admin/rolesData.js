export const rolesData = [
  {
    id: 1,
    role: "Admin",
    description: "Accès complet à la plateforme",
    permissions: [
      "Gestion utilisateurs",
      "Supervision",
      "Sécurité",
      "Maintenance",
      "Cours et TP",
    ],
  },
  {
    id: 2,
    role: "Professeur",
    description: "Gestion pédagogique",
    permissions: [
      "Créer cours",
      "Créer TP",
      "Voir étudiants",
      "générer TP",
      "Corriger TP",
      "Suivi pédagogique",
      "Ajouter TP",
      "Supprimer TP",
      "Suivre progression",
    ],
  },
  {
    id: 3,
    role: "Étudiant",
    description: "Accès à l’apprentissage",
    permissions: ["Voir cours", "Lancer TP", "Discussion", "générer TP"],
  },
];

{
  /* Badge de statut (en_attente, actif, suspendu) */
}
<td className="px-6 py-4">
  <span
    className={`px-3 py-1 rounded-full border text-xs font-semibold ${
      statusClasses[student.statut] || ""
    }`}
  >
    {student.statut}
  </span>
</td>;

{
  /* Boutons d'actions */
}
<td className="px-6 py-4">
  <div className="flex flex-wrap justify-center gap-2 text-xs">
    {/* VALIDER COMPTE : visible si pas déjà actif */}
    {student.statut !== "actif" && (
      <button
        className="rounded-lg border px-3 py-1 text-emerald-600"
        onClick={() => handleAction(student.id, "valider_compte")}
      >
        Valider compte
      </button>
    )}

    {/* DESACTIVER COMPTE : visible si pas déjà suspendu */}
    {student.statut !== "suspendu" && (
      <button
        className="rounded-lg border px-3 py-1 text-amber-600"
        onClick={() => handleAction(student.id, "desactiver_compte")}
      >
        Désactiver compte
      </button>
    )}

    {/* SUPPRIMER DEFINITIF */}
    <button
      className="rounded-lg border px-3 py-1 text-rose-600"
      onClick={() => handleDelete(student.id)}
    >
      Supprimer
    </button>
  </div>
</td>;
