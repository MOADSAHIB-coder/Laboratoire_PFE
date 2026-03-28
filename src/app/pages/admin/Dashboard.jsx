// src/pages/admin/DashboardAdmin.jsx
import React, { useEffect, useState, useCallback } from "react";
import api from "../../api/API_Djando";
import useWebSocket from "../../components/componentAdmin/useWebSocket";
import RecentActivityCard from "../../components/componentAdmin/RecentActivityCard";
import AdminLayout from "../../layouts/AdminLayout";

import StatCard from "../../components/componentAdmin/StatCard";
import SecondaryCards from "../../components/componentAdmin/SecondaryCards";
import LoginHistoryTable from "../../components/componentAdmin/LoginHistoryTable";
import NotificationsPanel from "../../components/componentAdmin/NotificationsPanel";

// <<< AJOUT : import de la barre de notification globale
import {
  NotificationBar,
  useNotification,
} from "../../components/componentAdmin/notificat";

const SOCKET_MESSAGE_TYPES = {
  NEW_ACTIVITY: "new_activity",
  STATS_UPDATED: "stats_updated",
  SUMMARY_UPDATED: "summary_updated",
  SUPERVISION_UPDATED: "supervision_updated",
  ACTIVITY_CHART_UPDATED: "activity_chart_updated",
  COURSES_TYPE_UPDATED: "courses_type_updated",
  TOP_TP_UPDATED: "top_tp_updated",
  STATUS_UPDATED: "status_updated",
  NEW_NOTIFICATION: "new_notification",
};

export default function DashboardAdmin() {
  const [stats, setStats] = useState([
    {
      id: "total_users",
      title: "Utilisateurs",
      value: 0,
      subtitle: "Total comptes",
    },
    { id: "connexions", title: "Connexions réussies", value: 0 },
    { id: "echouees", title: "Connexions échouées", value: 0 },
    { id: "nouveaux_inscrits", title: "Nouveaux inscrits", value: 0 },
  ]);

  const [dashboardData, setDashboardData] = useState({
    summary: {},
    recentActivities: [],
    activityChartData: [],
    loginHistory: [],
    onlineUsers: [],
    notifications: [],
    messagesCount: 0,
  });

  // <<< AJOUT : hook de notification globale
  const { notificationState, notification, clearNotification } =
    useNotification();

  const wsToken = localStorage.getItem("access_token");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await api.get("admin/dashboard/");
        const data = res.data;
        const statsFromApi = data.stats || {};

        setStats((prev) =>
          prev.map((stat) => ({
            ...stat,
            value: statsFromApi[stat.id] ?? data[stat.id] ?? stat.value,
          })),
        );

        setDashboardData((prev) => ({
          ...prev,
          summary: data.summary || prev.summary,
          recentActivities: data.recentActivities || prev.recentActivities,
          activityChartData: data.activityChartData || prev.activityChartData,
          onlineUsers: data.onlineUsers || prev.onlineUsers,
          loginHistory: data.loginHistory || prev.loginHistory,
          notifications: data.notifications || prev.notifications,
          messagesCount: data.messages_count ?? prev.messagesCount ?? 0,
        }));
      } catch (error) {
        console.error("Erreur chargement dashboard :", error);
      }
    };
    loadDashboard();
  }, []);

  const handleSocketMessage = useCallback(
    (message) => {
      setDashboardData((prev) => {
        switch (message.type) {
          case SOCKET_MESSAGE_TYPES.NEW_ACTIVITY:
            return {
              ...prev,
              recentActivities: [
                message.payload,
                ...(prev.recentActivities || []),
              ].slice(0, 10),
            };

          case SOCKET_MESSAGE_TYPES.STATS_UPDATED: {
            const payload = message.payload || {};
            setStats((prevStats) =>
              prevStats.map((stat) => ({
                ...stat,
                value: payload[stat.id] ?? stat.value,
              })),
            );
            return prev;
          }

          case SOCKET_MESSAGE_TYPES.SUMMARY_UPDATED:
            return { ...prev, summary: message.payload };

          case SOCKET_MESSAGE_TYPES.ACTIVITY_CHART_UPDATED:
            return { ...prev, activityChartData: message.payload };

          case SOCKET_MESSAGE_TYPES.STATUS_UPDATED:
            return { ...prev, status: message.payload };

          // <<< AJOUT : gestion des notifications temps réel
          case SOCKET_MESSAGE_TYPES.NEW_NOTIFICATION: {
            const notif = message.payload;
            const newNotifications = [notif, ...(prev.notifications || [])];

            // Choix du type de barre (couleur) selon la catégorie
            let barType = "info";
            if (notif.category === "security") {
              barType = "error";
            } else if (notif.category === "system") {
              barType = "error";
            } else if (notif.category === "user_activity") {
              barType = "success";
            }

            const barMessage =
              notif.title ||
              (notif.category === "security"
                ? "Nouvelle alerte de sécurité."
                : notif.category === "system"
                  ? "Nouvelle alerte système."
                  : "Nouvelle activité utilisateur.");

            // Affiche la barre en haut
            notification(barType, barMessage);

            return {
              ...prev,
              notifications: newNotifications,
            };
          }

          default:
            return prev;
        }
      });
    },
    [notification],
  );

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const host = window.location.host;
  const wsUrl = wsToken
    ? `${protocol}://${host}/ws/admin/dashboard/?token=${wsToken}`
    : null;

  useWebSocket(wsUrl, handleSocketMessage);

  const {
    summary,
    recentActivities,
    onlineUsers,
    loginHistory,
    notifications,
    messagesCount,
  } = dashboardData;

  const unreadNotificationsCount = (notifications || []).filter(
    (n) => !n.read,
  ).length;

  const handleNotificationRead = (id) => {
    setDashboardData((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
    }));
  };

  const handleNotificationDelete = (id) => {
    setDashboardData((prev) => ({
      ...prev,
      notifications: prev.notifications.filter((n) => n.id !== id),
    }));
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-5 flex flex-col gap-6 md:gap-8 bg-gray-50 min-h-screen">
        {/* Barre d’alerte globale */}
        <div className="max-w-6xl mx-auto w-full">
          <NotificationBar
            type={notificationState.type}
            message={notificationState.message}
            onClose={clearNotification}
          />
        </div>

        {/* Carte bienvenue */}
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between border border-slate-100">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Bienvenue, Administrateur !
            </h2>
            <p className="mt-2 text-sm md:text-base text-blue-600 font-semibold">
              {summary.otpVerified ?? 0} OTP vérifiés — Temps total estimé :{" "}
              {summary.tempsTotal}
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="flex flex-col text-right text-xs md:text-sm text-slate-500">
              <span>
                Surveillez les connexions et les activités en temps réel
              </span>
            </div>
            <img
              src="/icons/admin.png"
              alt="Admin"
              className="w-16 h-16 md:w-[6.3rem] md:h-[6.3rem] rounded-full object-cover bg-[#E9F1F2] shadow-sm"
            />
          </div>
        </div>

        {/* Cartes principales */}
        <StatCard stats={stats} />

        {/* Cartes secondaires */}
        <SecondaryCards
          onlineUsersCount={onlineUsers.length}
          notificationsCount={notifications.length}
          unreadNotificationsCount={unreadNotificationsCount}
          messagesCount={messagesCount}
        />

        {/* Notifications*/}
        <NotificationsPanel
          notifications={notifications}
          onNotificationRead={handleNotificationRead}
          onNotificationDelete={handleNotificationDelete}
        />

        {/* Présence en ligne + Activité récente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Présence en ligne */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-base md:text-lg font-semibold mb-2 text-slate-800">
              Présence en ligne
            </h3>
            <div className="mt-4 space-y-2 text-xs md:text-sm text-slate-700 max-h-72 overflow-auto">
              {onlineUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-3 md:px-4 py-2 bg-slate-50/60 hover:bg-white hover:border-blue-200 transition"
                >
                  <div>
                    <div className="font-medium text-slate-800">
                      {u.username}
                    </div>
                    <div className="text-[11px] text-slate-500">{u.email}</div>
                  </div>
                  <div className="text-[11px] md:text-xs text-slate-400 text-right">
                    Dernière activité :{" "}
                    {u.last_seen
                      ? new Date(u.last_seen).toLocaleString("fr-FR")
                      : "-"}
                  </div>
                </div>
              ))}
              {onlineUsers.length === 0 && (
                <div className="text-[11px] md:text-xs text-slate-400 text-center py-4">
                  Aucun utilisateur en ligne actuellement.
                </div>
              )}
            </div>
          </div>

          {/* Activité récente */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-base md:text-lg font-semibold mb-2 text-slate-800">
              Activité récente
            </h3>
            <div className="mt-4 space-y-2 max-h-72 overflow-auto">
              {recentActivities.map((a) => (
                <RecentActivityCard
                  key={a.id ?? `${a.time}-${a.message}`}
                  message={a.message}
                  time={a.time}
                />
              ))}
              {recentActivities.length === 0 && (
                <div className="text-[11px] md:text-xs text-slate-400 text-center py-4">
                  Aucune activité récente.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Historique de connexion */}
        <LoginHistoryTable loginHistory={loginHistory} />
      </div>
    </AdminLayout>
  );
}
