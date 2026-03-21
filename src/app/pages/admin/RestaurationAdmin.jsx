import React, { useEffect, useState } from "react";
import {
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/API_Djando";

const statToneClasses = {
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
  rose: "border-rose-200 bg-rose-50 text-rose-700",
};

const statusClasses = {
  stable: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
};

export default function RestaurationAdmin() {
  const [stats, setStats] = useState([]);
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [restoreMessage, setRestoreMessage] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      setRestoreMessage(null);

      const res = await api.get("admin/restore/");
      setStats(res.data.stats || []);
      setPoints(res.data.points || []);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Erreur lors du chargement des points de restauration",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRestore = async (id) => {
    if (!window.confirm("Confirmer la restauration depuis ce point ?")) return;

    try {
      setLoading(true);
      setError(null);
      setRestoreMessage(null);

      const res = await api.post(`admin/restore/${id}/run/`);
      setRestoreMessage(res.data.message || "Restauration lancée.");
      // Optionnel : rafraîchir les points après restauration
      // await fetchData();
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Erreur lors du lancement de la restauration",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
              Restauration
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Gestion des points de restauration et récupération contrôlée du
              système.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchData}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <RefreshCcw className="h-4 w-4" />
            {loading ? "Actualisation..." : "Actualiser"}
          </button>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {restoreMessage && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {restoreMessage}
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl border p-6 shadow-sm ${
                statToneClasses[item.tone] ||
                "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              <p className="text-sm font-semibold">{item.title}</p>
              <h2 className="mt-3 text-3xl font-extrabold">{item.value}</h2>
              <p className="mt-2 text-xs opacity-90">{item.subtitle}</p>
            </div>
          ))}
        </section>

        {/* Le reste de ton JSX (consignes, niveau de prudence) reste identique, car statique */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-bold text-slate-800">
              Points de restauration
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Liste des sauvegardes disponibles pour restauration système.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-sm text-slate-600">
                  <th className="px-6 py-4 font-semibold">Nom</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Taille</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Source</th>
                  <th className="px-6 py-4 font-semibold">État</th>
                  <th className="px-6 py-4 font-semibold text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {points.map((point) => (
                  <tr
                    key={point.id}
                    className="border-t border-slate-100 text-sm"
                  >
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {point.name}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{point.type}</td>
                    <td className="px-6 py-4 text-slate-700">{point.size}</td>
                    <td className="px-6 py-4 text-slate-700">{point.date}</td>
                    <td className="px-6 py-4 text-slate-700">{point.source}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                          statusClasses[point.status] ||
                          "border-slate-200 bg-slate-50 text-slate-700"
                        }`}
                      >
                        {point.status === "stable" ? (
                          <ShieldCheck className="h-3.5 w-3.5" />
                        ) : (
                          <AlertTriangle className="h-3.5 w-3.5" />
                        )}
                        {point.status === "stable" ? "Stable" : "À vérifier"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleRestore(point.id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        disabled={loading}
                      >
                        <RotateCcw className="h-4 w-4" />
                        Restaurer
                      </button>
                    </td>
                  </tr>
                ))}

                {!loading && points.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-6 text-center text-sm text-slate-500"
                    >
                      Aucun point de restauration disponible.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* section conseil identique à la tienne */}
      </div>
    </AdminLayout>
  );
}
