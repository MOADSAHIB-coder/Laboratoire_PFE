// src/components/componentAdmin/LoginHistoryTable.jsx
import React from "react";

export default function LoginHistoryTable({ loginHistory }) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-base md:text-lg font-semibold mb-2 text-slate-800">
        Historique de connexion
      </h3>
      <p className="text-xs md:text-sm text-gray-500 mb-4">
        Derniers événements de connexion (succès / échecs) avec durée de
        session.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 text-xs md:text-sm">
          <thead>
            <tr className="text-left text-[11px] md:text-xs text-gray-500">
              <th className="px-3 py-2">Utilisateur</th>
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2">Statut</th>
              <th className="px-3 py-2">Durée</th>
              <th className="px-3 py-2">Date / Heure</th>
            </tr>
          </thead>
          <tbody>
            {(loginHistory || []).slice(0, 10).map((a, idx) => (
              <tr key={a.id ?? idx}>
                <td className="px-3 py-2 bg-gray-50 rounded-l-xl">
                  {a.username || "-"}
                </td>
                <td className="px-3 py-2 bg-gray-50">{a.action}</td>
                <td className="px-3 py-2 bg-gray-50">{a.status}</td>
                <td className="px-3 py-2 bg-gray-50">
                  {a.duration || a.duree || "-"}
                </td>
                <td className="px-3 py-2 bg-gray-50 rounded-r-xl">
                  {a.time ? new Date(a.time).toLocaleString("fr-FR") : "-"}
                </td>
              </tr>
            ))}
            {(!loginHistory || loginHistory.length === 0) && (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-2 text-center text-slate-400"
                >
                  Aucune donnée disponible.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
