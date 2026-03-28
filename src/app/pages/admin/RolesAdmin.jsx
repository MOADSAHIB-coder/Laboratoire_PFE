import React from "react";
import { ShieldCheck } from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";

const rolesData = [
  {
    id: 1,
    role: "Administrateur",
    description: "Gère l’ensemble de la plateforme.",
    permissions: [
      "Gérer les utilisateurs",
      "Modifier les paramètres globaux",
      "Accéder à tous les modules",
    ],
  },
  // ajoute d’autres rôles ici si besoin
];

export default function RolesAdmin() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            Gestion des rôles
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Les rôles déterminent les permissions et les accès des utilisateurs
            dans la plateforme.
          </p>
        </div>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rolesData.map((role) => (
            <div
              key={role.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-blue-600" />

                <h2 className="text-lg font-bold text-slate-800">
                  {role.role}
                </h2>
              </div>

              <p className="mt-3 text-sm text-slate-500">{role.description}</p>

              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {role.permissions.map((perm, index) => (
                  <li key={index}>• {perm}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
