import React, { useEffect, useState, useCallback } from "react";
import {
  Search,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import api from "../../api/API_Djando";
import useWebSocket from "./useWebSocket";

const statusClasses = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  failed: "border-rose-200 bg-rose-50 text-rose-700",
};

const methodLabels = {
  login: "Login",
  access_token: "Access token",
  refresh_token: "Refresh token",
};

export default function HistoriqueTentativesAdmin() {
  const [loginItems, setLoginItems] = useState([]);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loginSearch, setLoginSearch] = useState("");

  // Export CSV
  const handleExportLoginAttempts = () => {
    const params = new URLSearchParams();
    if (loginSearch.trim()) {
      params.append("search", loginSearch.trim());
    }

    const baseURL = api.defaults.baseURL || "http://127.0.0.1:8000/api/";
    const url = `${baseURL}admin/login-attempts/export/${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    window.open(url, "_blank");
  };

  // Fetch tentatives
  const fetchLoginAttempts = useCallback(async () => {
    try {
      setLoginLoading(true);
      setLoginError(null);

      const params = {};
      if (loginSearch.trim()) {
        params.search = loginSearch.trim();
      }

      const res = await api.get("admin/login-attempts/", { params });

      setLoginItems(res.data.items);
    } catch (err) {
      console.error(err);
      setLoginError(
        err?.response?.data?.detail ||
          err?.message ||
          "Erreur lors du chargement des tentatives de connexion",
      );
    } finally {
      setLoginLoading(false);
    }
  }, [loginSearch]);

  useEffect(() => {
    fetchLoginAttempts();
  }, [fetchLoginAttempts]);

  const handleLoginSearchSubmit = (e) => {
    e.preventDefault();
    fetchLoginAttempts();
  };

  // WebSocket temps réel
  const handleWsMessage = useCallback(
    (data) => {
      if (data.type === "login_attempt_created") {
        const newItem = data.item;
        const s = loginSearch.trim().toLowerCase();
        const matchesSearch =
          !s ||
          (newItem.email && newItem.email.toLowerCase().includes(s)) ||
          (newItem.ip && newItem.ip.toLowerCase().includes(s));

        if (matchesSearch) {
          setLoginItems((prev) => [newItem, ...prev]);
        }
      }
    },
    [loginSearch],
  );

  useWebSocket("ws://127.0.0.1:8000/ws/admin/login-attempts/", handleWsMessage);

  return (
    <div className="space-y-8">
      {/* Barre de recherche + export */}
      <section className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <form
            className="flex items-center gap-3 border border-slate-200 bg-white px-4 py-3 shadow-sm"
            onSubmit={handleLoginSearchSubmit}
          >
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un email ou une IP…"
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              value={loginSearch}
              onChange={(e) => setLoginSearch(e.target.value)}
            />
          </form>

          <button
            type="button"
            className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
            onClick={handleExportLoginAttempts}
          >
            Exporter les tentatives
          </button>
        </div>

        {/* Tableau uniquement */}
        <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">
              Historique des tentatives
            </h2>
            {loginLoading && (
              <span className="text-xs text-slate-500">Chargement…</span>
            )}
          </div>

          {loginError && (
            <div className="px-6 py-3 text-sm text-rose-700 bg-rose-50 border-b border-rose-200">
              {loginError}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-sm text-slate-600">
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">IP</th>
                  <th className="px-6 py-4 font-semibold">Date / heure</th>
                  <th className="px-6 py-4 font-semibold">Méthode</th>
                  <th className="px-6 py-4 font-semibold">Résultat</th>
                  <th className="px-6 py-4 font-semibold">Nombre d’essais</th>
                  <th className="px-6 py-4 font-semibold">Surveillance</th>
                </tr>
              </thead>
              <tbody>
                {loginItems.map((attempt) => {
                  const risky =
                    attempt.attempts >= 3 || attempt.status === "failed";

                  return (
                    <tr
                      key={attempt.id}
                      className="border-t border-slate-100 text-sm"
                    >
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {attempt.email}
                      </td>

                      <td className="px-6 py-4 text-slate-700">{attempt.ip}</td>

                      <td className="px-6 py-4 text-slate-700">
                        {attempt.time}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {methodLabels[attempt.method] ?? attempt.method}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                            statusClasses[attempt.status]
                          }`}
                        >
                          {attempt.status === "success" ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5" />
                          )}
                          {attempt.status === "success" ? "Réussie" : "Échouée"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {attempt.attempts}
                      </td>

                      <td className="px-6 py-4">
                        {risky ? (
                          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                            <AlertTriangle className="h-3.5 w-3.5" />À
                            surveiller
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Normal
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {!loginLoading && loginItems.length === 0 && !loginError && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-6 text-center text-sm text-slate-500"
                    >
                      Aucune tentative trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
