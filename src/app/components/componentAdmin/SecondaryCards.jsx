import React from "react";

export default function SecondaryCards({
  onlineUsersCount,
  notificationsCount,
  unreadNotificationsCount,
  messagesCount, // <- nouvelle prop
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Carte 1 : Utilisateurs en ligne */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <p className="text-blue-700 text-sm font-medium uppercase tracking-wide">
          Utilisateurs en ligne
        </p>
        <p className="text-3xl text-blue-700 font-bold mt-2">
          {onlineUsersCount}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Basé sur l’activité récente
        </p>
      </div>

      {/* Carte 2 : Notifications */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex items-center justify-between w-full">
          <p className="text-blue-700 text-sm font-medium uppercase tracking-wide">
            Notifications
          </p>
          {unreadNotificationsCount > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              {unreadNotificationsCount} non lues
            </span>
          )}
        </div>
        <p className="text-3xl text-blue-700 font-bold mt-2">
          {notificationsCount}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Alertes système et informations importantes
        </p>
      </div>

      {/* Carte 3 : Messages (nombre) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
        <p className="text-blue-700 text-sm font-medium uppercase tracking-wide">
          Messages
        </p>
        <p className="text-3xl text-blue-700 font-bold mt-2">
          {messagesCount ?? 0}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Nombre total de messages reçus
        </p>
      </div>
    </div>
  );
}
