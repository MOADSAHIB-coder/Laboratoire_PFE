import React, { useEffect, useState, useCallback } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/API_Djando";
import useWebSocket from "../../components/componentAdmin/useWebSocket";
import HistoriqueTentativesAdmin from "../../components/componentAdmin/HistoTentative";

export default function SupervisionSecuriteAdmin() {
  // ------- état tentatives de connexion (pour les cartes uniquement) -------
  const [loginStats, setLoginStats] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // ------- état activité suspecte (seulement pour les cartes) -------
  const [susStats, setSusStats] = useState({
    total_events: 0,
    high: 0,
    medium: 0,
    low: 0,
  });

  // ------- fetch tentatives de connexion (seulement pour les stats) -------
  const fetchLoginAttempts = useCallback(async () => {
    try {
      setLoginLoading(true);
      setLoginError(null);

      const params = {};
      const res = await api.get("admin/login-attempts/", { params });

      setLoginStats(res.data.stats);
    } catch (err) {
      console.error(err);
      setLoginError(
        err?.response?.data?.detail ||
          err?.message ||
          "Erreur lors du chargement des stats de tentatives de connexion",
      );
    } finally {
      setLoginLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLoginAttempts();
  }, [fetchLoginAttempts]);

  // ------- WebSocket tentatives de connexion (mise à jour des stats) -------
  const handleWsMessage = useCallback(
    (data) => {
      if (data.type === "login_attempt_created") {
        if (data.stats) {
          setLoginStats(data.stats);
        } else {
          fetchLoginAttempts();
        }
      }
    },
    [fetchLoginAttempts],
  );

  useWebSocket("ws://127.0.0.1:8000/ws/admin/login-attempts/", handleWsMessage);

  // ------- fetch activité suspecte (pour mettre à jour susStats) -------
  useEffect(() => {
    const controller = new AbortController();
    const fetchSus = async () => {
      try {
        const res = await fetch(`/api/admin/suspicious-activity/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
          },
          signal: controller.signal,
        });
        if (!res.ok) {
          return;
        }
        const json = await res.json();
        setSusStats(
          json.stats || { total_events: 0, high: 0, medium: 0, low: 0 },
        );
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
      }
    };

    fetchSus();
    return () => controller.abort();
  }, []);

  const totalLogin = loginStats?.total ?? 0;
  const successLogin = loginStats?.success ?? 0;
  const failedLogin = loginStats?.failed ?? 0;

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* TITRE GLOBAL */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
            Supervision sécurité
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Vue d’ensemble des connexions et des activités suspectes.
          </p>
        </div>

        {/* --------------- CARTES ENSEMBLE --------------- */}
        <section className="grid gap-4 xl:grid-cols-4 sm:grid-cols-2">
          {/* Tentatives totales */}
          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
            <p className="text-sm font-semibold text-blue-700">
              Tentatives de connexion
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-blue-700">
              {loginLoading && !loginStats ? "…" : totalLogin}
            </h2>
            <p className="mt-2 text-xs text-blue-600">
              Volume d’authentification observé
            </p>
            {loginError && (
              <p className="mt-1 text-xs text-rose-600">{loginError}</p>
            )}
          </div>

          {/* Connexions réussies */}
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
            <p className="text-sm font-semibold text-emerald-700">
              Connexions réussies
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-emerald-700">
              {loginLoading && !loginStats ? "…" : successLogin}
            </h2>
            <p className="mt-2 text-xs text-emerald-600">Accès autorisés</p>
          </div>

          {/* Connexions échouées */}
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
            <p className="text-sm font-semibold text-rose-700">
              Connexions échouées
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-rose-700">
              {loginLoading && !loginStats ? "…" : failedLogin}
            </h2>
            <p className="mt-2 text-xs text-rose-600">
              Accès refusés ou invalides
            </p>
          </div>

          {/* Activités suspectes totales */}
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <p className="text-sm font-semibold text-amber-700">
              Activités suspectes
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-amber-700">
              {susStats.total_events}
            </h2>
            <p className="mt-2 text-xs text-amber-600">
              Événements signalés (élevé : {susStats.high}, moyen :{" "}
              {susStats.medium}, faible : {susStats.low})
            </p>
          </div>
        </section>

        {/* --------------- BLOC : HISTORIQUE DES TENTATIVES --------------- */}
        <section className="space-y-4">
          <HistoriqueTentativesAdmin />
        </section>
      </div>
    </AdminLayout>
  );
}
