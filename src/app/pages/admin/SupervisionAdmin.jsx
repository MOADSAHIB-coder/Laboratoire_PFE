import React, { useEffect, useState, useCallback } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/API_Djando";
import useWebSocket from "../../components/componentAdmin/useWebSocket";

export default function SupervisionAdmin() {
  // Tuiles globales (supervisionStats)
  const [globalStats, setGlobalStats] = useState([]);
  const [globalLoading, setGlobalLoading] = useState(false);

  // Activité + auth globales (remplies par l’API / WS)
  const [globalActivity, setGlobalActivity] = useState(null);
  const [globalAuth, setGlobalAuth] = useState(null);

  // Stats d’un utilisateur ciblé
  const [userQuery, setUserQuery] = useState("");
  const [userStats, setUserStats] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);

  // ================================
  // 1. Chargement initial global (REST)
  // ================================
  useEffect(() => {
    const fetchGlobal = async () => {
      try {
        setGlobalLoading(true);
        const res = await api.get("admin/dashboard/");

        setGlobalStats(res.data.supervisionStats || []);
        setGlobalActivity(res.data.activityGlobal || null);
        setGlobalAuth(res.data.authGlobal || null);
      } catch (e) {
        console.error("Erreur chargement supervision globale:", e);
      } finally {
        setGlobalLoading(false);
      }
    };

    fetchGlobal();
  }, []);

  const getGlobalValue = (label, def = "-") => {
    const item = globalStats.find((s) => s.label === label);
    return item ? item.value : def;
  };

  // ================================
  // 2. Récupération stats par utilisateur (REST)
  // ================================
  const handleUserStatsFetch = async (e) => {
    e.preventDefault();
    if (!userQuery.trim()) {
      setUserStats(null);
      setUserError(null);
      return;
    }

    try {
      setUserLoading(true);
      setUserError(null);

      const res = await api.get("admin/supervision/user-stats/", {
        params: { username: userQuery.trim() },
      });

      setUserStats(res.data);
    } catch (err) {
      console.error(err);
      setUserStats(null);
      setUserError(
        err.response?.data?.detail ||
          "Impossible de charger les données pour cet utilisateur.",
      );
    } finally {
      setUserLoading(false);
    }
  };

  const resetUserFilter = () => {
    setUserQuery("");
    setUserStats(null);
    setUserError(null);
  };

  // ================================
  // 3. WebSocket : mise à jour temps réel
  // ================================
  const handleWsMessage = useCallback((msg) => {
    // attendu : { type: "dashboard_update", payload: { activityGlobal, authGlobal, supervisionStats, ... } }
    if (!msg || msg.type !== "dashboard_update" || !msg.payload) return;
    const payload = msg.payload;

    if (payload.activityGlobal) {
      setGlobalActivity(payload.activityGlobal);
    }
    if (payload.authGlobal) {
      setGlobalAuth(payload.authGlobal);
    }
    if (Array.isArray(payload.supervisionStats)) {
      setGlobalStats(payload.supervisionStats);
    }
  }, []);

  // adapte l’URL WS à ton routing Channels
  useWebSocket("ws://127.0.0.1:8000/ws/admin/dashboard/", handleWsMessage);

  // ================================
  // 4. Helpers d’affichage
  // ================================
  const presenceText = userStats
    ? userStats.activity.presence_label
    : globalActivity?.presenceText ||
      "Aucune donnée de présence pour le moment";

  const connectionRateText = userStats
    ? userStats.activity.connection_rate_label
    : globalActivity?.connectionRateLabel ||
      "Aucune donnée de connexion pour le moment";

  const lastActivityText = userStats
    ? userStats.activity.last_activity_label
    : globalActivity?.lastActivityLabel || "Aucune activité enregistrée";

  const refreshTokensText = userStats
    ? userStats.auth.refresh_tokens_label
    : globalAuth?.refreshTokensLabel ||
      "Aucun refresh token sur la période observée";

  const failedAttemptsText = userStats
    ? userStats.auth.failed_attempts_label
    : globalAuth?.failedAttemptsLabel ||
      "Aucune tentative échouée sur la période observée";

  const suspiciousText = userStats
    ? userStats.auth.suspicious_events_label
    : globalAuth?.suspiciousEventsLabel || "Aucun événement suspect détecté";

  // ================================
  // 5. Rendu
  // ================================
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Titre + filtrage utilisateur */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
            Supervision
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Surveillance de l’activité des utilisateurs, de l’authentification,
            des événements de sécurité et du suivi pédagogique.
          </p>

          <form
            onSubmit={handleUserStatsFetch}
            className="mt-4 flex flex-wrap items-center gap-3"
          >
            <label className="text-xs font-medium text-slate-600">
              Filtrer par utilisateur:
            </label>
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="username"
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700"
            >
              Appliquer
            </button>
            <button
              type="button"
              onClick={resetUserFilter}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Vue globale
            </button>

            {userLoading && (
              <span className="text-xs text-slate-400">
                Chargement des stats utilisateur…
              </span>
            )}
            {userError && (
              <span className="text-xs text-rose-500">{userError}</span>
            )}
          </form>
        </div>

        {/* SECTION 1 : tuiles globales */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
            <p className="text-sm font-semibold text-emerald-700">
              Utilisateurs en ligne
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-emerald-700">
              {getGlobalValue("Utilisateurs en ligne", globalLoading ? "…" : 0)}
            </h2>
            <p className="mt-2 text-xs text-emerald-600">
              Utilisateurs actuellement actifs
            </p>
          </div>

          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <p className="text-sm font-semibold text-amber-700">
              Connexions échouées
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-amber-700">
              {getGlobalValue("Connexions échouées", globalLoading ? "…" : 0)}
            </h2>
            <p className="mt-2 text-xs text-amber-600">
              Échecs récents détectés
            </p>
          </div>

          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
            <p className="text-sm font-semibold text-rose-700">
              Tokens expirés
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-rose-700">
              {getGlobalValue("Tokens expirés", globalLoading ? "…" : 0)}
            </h2>
            <p className="mt-2 text-xs text-rose-600">Expiration détectée</p>
          </div>

          <div className="rounded-3xl border border-violet-200 bg-violet-50 p-6 shadow-sm">
            <p className="text-sm font-semibold text-violet-700">
              OTP à risque
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-violet-700">
              {getGlobalValue("OTP à risque", globalLoading ? "…" : 0)}
            </h2>
            <p className="mt-2 text-xs text-violet-600">
              Vérification recommandée
            </p>
          </div>
        </section>

        {/* SECTION 2 : Activité utilisateurs + Sécurité & authentification */}
        <section className="grid gap-6 xl:grid-cols-2">
          {/* Activité utilisateurs */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">
              Activité utilisateurs
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Résumé des comportements observés sur la plateforme.
              {userStats && (
                <span className="ml-1 font-semibold text-slate-700">
                  (Vue : {userStats.user.username})
                </span>
              )}
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-slate-200 px-4 py-4">
                <p className="text-sm font-semibold text-slate-700">
                  Présence en ligne
                </p>
                <p className="mt-1 text-sm text-slate-500">{presenceText}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 px-4 py-4">
                <p className="text-sm font-semibold text-slate-700">
                  Taux de connexion
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {connectionRateText}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 px-4 py-4">
                <p className="text-sm font-semibold text-slate-700">
                  Dernière activité
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {lastActivityText}
                </p>
              </div>
            </div>
          </div>

          {/* Sécurité & authentification */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800">
              Sécurité &amp; authentification
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Suivi des signaux critiques liés à l’accès et aux tokens.
              {userStats && (
                <span className="ml-1 font-semibold text-slate-700">
                  (Vue : {userStats.user.username})
                </span>
              )}
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-slate-200 px-4 py-4">
                <p className="text-sm font-semibold text-slate-700">
                  Refresh tokens
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {refreshTokensText}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 px-4 py-4">
                <p className="text-sm font-semibold text-slate-700">
                  Tentatives échouées
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {failedAttemptsText}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 px-4 py-4">
                <p className="text-sm font-semibold text-slate-700">
                  Activité suspecte
                </p>
                <p className="mt-1 text-sm text-slate-500">{suspiciousText}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
