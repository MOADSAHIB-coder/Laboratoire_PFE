import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Search, ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/API_Djando";
import useWebSocket from "../../components/componentAdmin/useWebSocket";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut, Radar, Line } from "react-chartjs-2"; // Line ajouté

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
);

const severityClasses = {
  high: "border-rose-200 bg-rose-50 text-rose-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  low: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const severityLabels = {
  high: "Élevé",
  medium: "Moyen",
  low: "Faible",
};

export default function SecurityDashboardAdmin() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [loginStats, setLoginStats] = useState(null);
  const [otpStats, setOtpStats] = useState(null);
  const [tokenStats, setTokenStats] = useState(null);
  const [susStats, setSusStats] = useState(null);
  const [timeline, setTimeline] = useState([]); // activityChartData
  const [usersActivity, setUsersActivity] = useState([]);

  const [userSearch, setUserSearch] = useState("");

  // --------- Fetch initial ----------
  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [dashboardRes, loginRes, susRes, usersRes] = await Promise.all([
        api.get("admin/dashboard/"),
        api.get("admin/login-attempts/"),
        api.get("admin/suspicious-activity/"),
        api.get("admin/users-security/"),
      ]);

      const dash = dashboardRes.data;

      // Login stats
      setLoginStats(loginRes.data.stats || null);

      // OTP stats
      setOtpStats(dash.otpStats || null);

      // Tokens : pour l'instant tu n'as pas de stats côté backend,
      // tu peux laisser null ou ajouter plus tard dans AdminDashboardView
      setTokenStats(dash.tokenStats || null);

      // Suspicious stats
      const susStatsData = susRes.data.stats || {
        total_events: 0,
        high: 0,
        medium: 0,
        low: 0,
      };
      setSusStats(susStatsData);

      // Timeline (graph hebdo connexions / échecs)
      setTimeline(dash.activityChartData || []);

      // Tableau utilisateurs
      setUsersActivity(usersRes.data.users || []);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Erreur lors du chargement du tableau de bord de sécurité",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // --------- WebSocket temps réel ----------
  useWebSocket("ws://127.0.0.1:8000/ws/admin/dashboard/", (msg) => {
    if (msg.type === "security_dashboard_update" && msg.payload) {
      const p = msg.payload;
      if (p.login_stats) setLoginStats(p.login_stats);
      if (p.otp_stats) setOtpStats(p.otp_stats);
      if (p.token_stats) setTokenStats(p.token_stats);
      if (p.suspicious_stats) setSusStats(p.suspicious_stats);
      if (p.timeline) setTimeline(p.timeline);
      if (p.users_activity) setUsersActivity(p.users_activity);
    }

    if (msg.type === "user_activity_changed" && msg.user) {
      setUsersActivity((prev) => {
        const others = prev.filter((u) => u.id !== msg.user.id);
        return [msg.user, ...others];
      });
    }
  });

  const filteredUsers = useMemo(() => {
    const term = userSearch.trim().toLowerCase();
    if (!term) return usersActivity;
    return usersActivity.filter(
      (u) =>
        (u.email || "").toLowerCase().includes(term) ||
        (u.role || "").toLowerCase().includes(term),
    );
  }, [usersActivity, userSearch]);

  // Valeurs de base (sécurité si null)
  const loginTotal = loginStats?.total ?? 0;
  const loginSuccess = loginStats?.success ?? 0;
  const loginFailed = loginStats?.failed ?? 0;

  const otpTotal = otpStats?.total_generated ?? 0;
  const otpVerified = otpStats?.verified ?? 0;
  const otpExpired = otpStats?.expired ?? 0;

  const susTotal = susStats?.total_events ?? 0;
  const susHigh = susStats?.high ?? 0;
  const susMedium = susStats?.medium ?? 0;
  const susLow = susStats?.low ?? 0;

  // Graphique 1 : Bar – Tentatives de connexion
  const dataLoginsBar = {
    labels: ["Succès", "Échecs", "Total"],
    datasets: [
      {
        label: "Tentatives de connexion",
        data: [loginSuccess, loginFailed, loginTotal],
        backgroundColor: ["#22c55e", "#ef4444", "#3b82f6"],
        borderRadius: 8,
      },
    ],
  };

  // Graphique 2 : Bar – OTP
  const dataOtpBar = {
    labels: ["Générés", "Vérifiés", "Expirés"],
    datasets: [
      {
        label: "OTP",
        data: [otpTotal, otpVerified, otpExpired],
        backgroundColor: ["#3b82f6", "#22c55e", "#f97316"],
        borderRadius: 8,
      },
    ],
  };

  // Graphique 3 : Doughnut – Activités suspectes
  const dataSusDoughnut = {
    labels: ["Élevé", "Moyen", "Faible"],
    datasets: [
      {
        data: [susHigh, susMedium, susLow],
        backgroundColor: ["#ef4444", "#facc15", "#22c55e"],
      },
    ],
  };

  // Graphique 4 : Radar – Vue globale des risques
  const dataRadar = {
    labels: ["Logins", "OTP", "Activités suspectes"],
    datasets: [
      {
        label: "Succès / Vérifiés / Faible",
        data: [loginSuccess, otpVerified, susLow],
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "#22c55e",
        borderWidth: 2,
        pointBackgroundColor: "#22c55e",
      },
      {
        label: "Échecs / Expirés / Élevé+Moyen",
        data: [loginFailed, otpExpired, susHigh + susMedium],
        backgroundColor: "rgba(239, 68, 68, 0.15)",
        borderColor: "#ef4444",
        borderWidth: 2,
        pointBackgroundColor: "#ef4444",
      },
    ],
  };

  const optionsRadar = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          stepSize: Math.max(1, Math.round((susTotal || 4) / 4)),
        },
      },
    },
  };

  // Graphe hebdo : connexions (success / failed) sur 7 jours
  const dataWeeklyLine = useMemo(() => {
    const labels = timeline.map((p) => p.name); // "12/03", "13/03", ...
    const connexions = timeline.map((p) => p.connexions ?? 0);
    const failed = timeline.map((p) => p.tp ?? 0); // 'tp' = échecs dans ton service

    return {
      labels,
      datasets: [
        {
          label: "Connexions réussies",
          data: connexions,
          borderColor: "#22c55e",
          backgroundColor: "rgba(34,197,94,0.15)",
          tension: 0.3,
        },
        {
          label: "Connexions échouées",
          data: failed,
          borderColor: "#ef4444",
          backgroundColor: "rgba(239,68,68,0.15)",
          tension: 0.3,
        },
      ],
    };
  }, [timeline]);

  const optionsWeeklyLine = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 text-sm text-slate-500">Chargement...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* En-tête */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
            Supervision sécurité avancée
          </h1>
          {error && <p className="mt-2 text-xs text-rose-600">{error}</p>}
        </div>

        {/* --------- CARTES GLOBAL ---------- */}
        <section className="grid gap-4 xl:grid-cols-4 sm:grid-cols-2">
          {/* Login */}
          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
            <p className="text-sm font-semibold text-blue-700">
              Tentatives de connexion
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-blue-700">
              {loginStats?.total ?? 0}
            </h2>
            <p className="mt-2 text-xs text-blue-600">
              Réussies : {loginStats?.success ?? 0} • Échouées :{" "}
              {loginStats?.failed ?? 0}
            </p>
          </div>

          {/* OTP */}
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
            <p className="text-sm font-semibold text-emerald-700">OTP</p>
            <h2 className="mt-3 text-3xl font-extrabold text-emerald-700">
              {otpStats?.total_generated ?? 0}
            </h2>
            <p className="mt-2 text-xs text-emerald-600">
              Vérifiés : {otpStats?.verified ?? 0} • Expirés :{" "}
              {otpStats?.expired ?? 0}
            </p>
          </div>

          {/* Tokens */}
          <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm">
            <p className="text-sm font-semibold text-indigo-700">
              Tokens actifs
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-indigo-700">
              {tokenStats?.total_tokens ?? 0}
            </h2>
            <p className="mt-2 text-xs text-indigo-600">
              Access : {tokenStats?.access_tokens ?? 0} • Refresh :{" "}
              {tokenStats?.refresh_tokens ?? 0} • Révoqués :{" "}
              {tokenStats?.revoked ?? 0}
            </p>
          </div>

          {/* Activités suspectes */}
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <p className="text-sm font-semibold text-amber-700">
              Activités suspectes
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-amber-700">
              {susStats?.total_events ?? 0}
            </h2>
            <p className="mt-2 text-xs text-amber-600">
              Élevé : {susStats?.high ?? 0} • Moyen : {susStats?.medium ?? 0} •
              Faible : {susStats?.low ?? 0}
            </p>
          </div>
        </section>

        {/* --------- GRAPHIQUES (Bar + Doughnut + Radar) ---------- */}
        <section className="flex flex-col md:flex-row flex-wrap justify-center gap-6 w-full">
          {/* Colonne 1 : Bar logins + Bar OTP */}
          <div className="flex flex-col gap-10">
            <div className="bg-white p-5 rounded-2xl shadow-xl w-full sm:w-[45vw] sm:h-72 md:w-[45vw] md:h-96 lg:w-[50vw] h-64 lg:h-80 xl:w-[35vw] xl:h-[45vh]">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Tentatives de connexion
              </h3>
              <Bar
                data={dataLoginsBar}
                options={{ responsive: true, maintainAspectRatio: true }}
              />
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xl w-full sm:w-[45vw] sm:h-72 md:w-[45vw] md:h-96 lg:w-[50vw] h-64 lg:h-80 xl:w-[35vw] xl:h-[45vh]">
              <h2 className="text-xl font-semibold mb-4 text-center">
                OTP – Générés / Vérifiés / Expirés
              </h2>
              <Bar
                data={dataOtpBar}
                options={{ responsive: true, maintainAspectRatio: true }}
              />
            </div>
          </div>

          {/* Colonne 2 : Doughnut suspicious + Radar */}
          <div className="flex xl:flex-col lg:flex-row gap-10">
            <div className="bg-white p-5 rounded-2xl shadow-xl w-full sm:w-[45vw] md:w-[25vw] h-64 sm:h-72 md:h-75 lg:w-80 lg:h-[25rem] xl:w-96 xl:h-[27rem]">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Répartition des activités suspectes
              </h3>
              <Doughnut
                data={dataSusDoughnut}
                options={{ responsive: true, maintainAspectRatio: true }}
              />
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-xl w-full sm:w-[45vw] md:w-[25vw] h-64 sm:h-72 md:h-[51vh] lg:w-80 lg:h-[25rem] xl:w-96 xl:h-[26rem]">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Vue radar des risques
              </h2>
              <Radar
                data={dataRadar}
                options={{ ...optionsRadar, maintainAspectRatio: true }}
              />
            </div>
          </div>
        </section>

        {/* --------- GRAPHE HEBDO DES CONNEXIONS (PLEINE LARGEUR) ---------- */}
        <section className="space-y-4">
          <div className="bg-white p-5 rounded-2xl shadow-xl w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Connexions hebdomadaires (7 derniers jours)
            </h2>
            <Line data={dataWeeklyLine} options={optionsWeeklyLine} />
          </div>
        </section>

        {/* --------- TABLE UTILISATEURS & HISTORIQUE ---------- */}
        <section className="space-y-4">
          {/* Recherche utilisateurs */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Rechercher un email ou un rôle…"
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify_between">
              <h2 className="text-lg font-bold text-slate-800">
                Utilisateurs & activités
              </h2>
              <p className="text-xs text-slate-500">
                Dernières actions, OTP, tokens et niveau de risque.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px] text-left">
                <thead className="bg-slate-50">
                  <tr className="text-sm text-slate-600">
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Rôle</th>
                    <th className="px-6 py-4 font-semibold">
                      Dernière connexion
                    </th>
                    <th className="px-6 py-4 font-semibold">IP</th>
                    <th className="px-6 py-4 font-semibold">Connexions</th>
                    <th className="px-6 py-4 font-semibold">OTP</th>
                    <th className="px-6 py-4 font-semibold">Tokens</th>
                    <th className="px-6 py-4 font-semibold">Risque</th>
                    <th className="px-6 py-4 font-semibold">
                      Derniers événements
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="border-t border-slate-100 text-sm align-top"
                    >
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {u.email}
                      </td>
                      <td className="px-6 py-4 text-slate-700">{u.role}</td>
                      <td className="px-6 py-4 text-slate-700">
                        {u.last_login
                          ? new Date(u.last_login).toLocaleString()
                          : "—"}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {u.last_ip || "—"}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {u.failed_logins ?? 0}/{u.login_attempts ?? 0}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {u.otp_verified ?? 0}/{u.otp_generated ?? 0}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {u.tokens_active ?? 0}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                            severityClasses[u.risk_level || "low"]
                          }`}
                        >
                          {severityLabels[u.risk_level || "low"]}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {u.last_events && u.last_events.length > 0 ? (
                          <ul className="space-y-1 text-xs text-slate-600">
                            {u.last_events.slice(0, 3).map((ev, idx) => (
                              <li key={idx} className="flex gap-2">
                                {ev.severity === "high" ? (
                                  <ShieldAlert className="h-3 w-3 text-rose-500 mt-0.5" />
                                ) : ev.severity === "medium" ? (
                                  <AlertTriangle className="h-3 w-3 text-amber-500 mt-0.5" />
                                ) : (
                                  <ShieldCheck className="h-3 w-3 text-emerald-500 mt-0.5" />
                                )}
                                <span>
                                  <span className="font-semibold">
                                    {ev.type}
                                  </span>{" "}
                                  • {ev.ip} •{" "}
                                  {new Date(ev.time).toLocaleString()}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-xs text-slate-400">
                            Aucun événement récent
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-6 py-6 text-center text-sm text-slate-500"
                      >
                        Aucun utilisateur trouvé pour cette recherche.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
