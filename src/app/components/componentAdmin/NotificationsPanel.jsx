// src/components/componentAdmin/NotificationsPanel.jsx
import React, { useState } from "react";

export default function NotificationsPanel({
  notifications,
  onNotificationRead,
  onNotificationDelete,
}) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (notif) => {
    setSelected(notif);
    if (!notif.read && onNotificationRead) {
      onNotificationRead(notif.id);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row overflow-hidden h-auto md:h-[360px]">
      {/* Colonne gauche : liste */}
      <div className="w-full md:w-[40%] border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50 flex flex-col">
        <div className="px-4 py-3 bg-blue-600 text-white text-xs md:text-sm font-semibold">
          Notifications
        </div>
        <div className="flex-1 overflow-auto">
          {(notifications || []).length === 0 && (
            <div className="p-4 text-xs text-slate-400 text-center">
              Aucune notification pour le moment.
            </div>
          )}

          {(notifications || []).map((n) => {
            const isSelected = selected?.id === n.id;
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => handleSelect(n)}
                className={[
                  "w-full text-left px-4 py-3 border-b border-slate-200/60 transition",
                  isSelected ? "bg-blue-50" : "hover:bg-blue-50/40",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[12px] md:text-[13px] font-semibold text-slate-900 truncate">
                    {n.title || "Notification"}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {n.time
                      ? new Date(n.time).toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>
                <p className="text-[11px] md:text-[12px] text-slate-600 line-clamp-2">
                  {n.content || n.message}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Colonne droite : détail */}
      <div className="w-full md:flex-1 flex flex-col bg-slate-50">
        <div className="px-4 py-3 bg-white border-t md:border-t-0 md:border-b border-slate-200 flex items-center justify-between">
          {selected ? (
            <>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">
                  {selected.title || "Notification"}
                </span>
                <span className="text-[11px] text-slate-500">
                  {selected.time
                    ? new Date(selected.time).toLocaleString("fr-FR")
                    : ""}
                </span>
              </div>
              {onNotificationDelete && (
                <button
                  type="button"
                  onClick={() => onNotificationDelete(selected.id)}
                  className="text-[10px] md:text-[11px] px-3 py-1.5 rounded-full border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 hover:border-red-300 transition"
                >
                  Supprimer
                </button>
              )}
            </>
          ) : (
            <span className="text-xs md:text-sm text-slate-500">
              Sélectionnez une notification dans la liste
            </span>
          )}
        </div>

        <div className="flex-1 px-4 py-3 overflow-auto">
          {!selected && (
            <div className="h-full flex items-center justify-center">
              <div className="bg-white rounded-2xl px-5 py-4 text-center shadow-sm border border-slate-100">
                <p className="text-sm font-semibold text-slate-800">
                  Aucune notification sélectionnée
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Choisissez une notification à gauche pour voir le détail.
                </p>
              </div>
            </div>
          )}

          {selected && (
            <div className="max-w-xl">
              <p className="text-sm text-slate-800 whitespace-pre-line leading-relaxed bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-100">
                {selected.content || selected.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
