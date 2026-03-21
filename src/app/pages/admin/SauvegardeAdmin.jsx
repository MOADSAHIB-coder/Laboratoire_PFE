import React, { useEffect, useState } from "react";
import {
  Database,
  Download,
  RefreshCcw,
  ShieldCheck,
  XCircle,
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
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  failed: "border-rose-200 bg-rose-50 text-rose-700",
};

export default function SauvegardeAdmin() {
  const [stats, setStats] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("admin/backup/");
      setStats(res.data.stats || []);
      setHistory(res.data.history || []);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Erreur lors du chargement des sauvegardes",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRunBackup = async () => {
    try {
      setLoading(true);
      setError(null);
      // Lancer une sauvegarde (type par défaut: full)
      await api.post("admin/backup/run/", { type: "full" });
      // Puis recharger la liste
      await fetchData();
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Erreur lors du lancement de la sauvegarde",
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
              Sauvegarde
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Gestion des sauvegardes système, base de données, médias et logs.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchData}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <RefreshCcw className="h-4 w-4" />
              {loading ? "Actualisation..." : "Actualiser"}
            </button>

            <button
              type="button"
              onClick={handleRunBackup}
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
              disabled={loading}
            >
              <Database className="h-4 w-4" />
              Lancer une sauvegarde
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
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

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          {/* Configuration rapide – pour l'instant statique */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">
              Configuration rapide
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Réglages principaux de la politique de sauvegarde.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-slate-200 px-4 py-4">
                <p className="text-sm font-semibold text-slate-700">
                  Fréquence automatique
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Quotidienne à 23:00
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 px-4 py-4">
                <p className="text-sm font-semibold text-slate-700">
                  Type par défaut
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Sauvegarde complète système + base
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 px-4 py-4">
                <p className="text-sm font-semibold text-slate-700">
                  Destination principale
                </p>
                <p className="mt-1 text-sm text-slate-500">Serveur principal</p>
              </div>
            </div>
          </div>

          {/* Priorités de contrôle – statique pour l'instant */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">
              Priorités de contrôle
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Points à vérifier régulièrement.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li className="rounded-2xl border border-slate-200 px-4 py-3">
                Vérifier les sauvegardes échouées ou incomplètes
              </li>
              <li className="rounded-2xl border border-slate-200 px-4 py-3">
                Contrôler la taille globale des archives
              </li>
              <li className="rounded-2xl border border-slate-200 px-4 py-3">
                Assurer la disponibilité des emplacements de stockage
              </li>
              <li className="rounded-2xl border border-slate-200 px-4 py-3">
                Maintenir un historique restaurable
              </li>
            </ul>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Historique des sauvegardes
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Liste des sauvegardes exécutées et de leur état.
              </p>
            </div>
            {loading && (
              <span className="text-xs text-slate-500">Chargement…</span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-sm text-slate-600">
                  <th className="px-6 py-4 font-semibold">Nom</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Taille</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Emplacement</th>
                  <th className="px-6 py-4 font-semibold">État</th>
                  <th className="px-6 py-4 font-semibold text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {history.map((backup) => (
                  <tr
                    key={backup.id}
                    className="border-t border-slate-100 text-sm"
                  >
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {backup.name}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{backup.type}</td>
                    <td className="px-6 py-4 text-slate-700">{backup.size}</td>
                    <td className="px-6 py-4 text-slate-700">{backup.date}</td>
                    <td className="px-6 py-4 text-slate-700">
                      {backup.location}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                          statusClasses[backup.status] ||
                          "border-slate-200 bg-slate-50 text-slate-700"
                        }`}
                      >
                        {backup.status === "success" ? (
                          <ShieldCheck className="h-3.5 w-3.5" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5" />
                        )}
                        {backup.status === "success" ? "Réussie" : "Échouée"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        <Download className="h-4 w-4" />
                        Télécharger
                      </button>
                    </td>
                  </tr>
                ))}

                {!loading && history.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-6 text-center text-sm text-slate-500"
                    >
                      Aucune sauvegarde enregistrée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
