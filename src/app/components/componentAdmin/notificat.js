// src/app/components/componentAdmin/notificat.js

import React, { useState, useCallback } from "react";

export function NotificationBar({ type = "info", message, onClose }) {
  if (!message) return null;

  const baseClasses =
    "mb-4 px-4 py-2 rounded-md text-sm border flex items-center justify-between";

  const typeClasses = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    error: "bg-red-50 border-red-200 text-red-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type] || typeClasses.info}`}>
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-3 text-xs font-semibold opacity-70 hover:opacity-100"
      >
        Fermer
      </button>
    </div>
  );
}

export function useNotification() {
  const [notificationState, setNotificationState] = useState({
    type: "info",
    message: "",
  });

  const notification = useCallback((type, message, duration = 4000) => {
    setNotificationState({ type, message });

    if (duration) {
      setTimeout(() => {
        setNotificationState((prev) =>
          prev.message === message ? { ...prev, message: "" } : prev,
        );
      }, duration);
    }
  }, []);

  const clearNotification = useCallback(() => {
    setNotificationState((prev) => ({ ...prev, message: "" }));
  }, []);

  return { notificationState, notification, clearNotification };
}

export function ConfirmDialog({
  open,
  title = "Confirmation",
  message = "Êtes-vous sûr ?",
  confirmLabel = "Oui",
  cancelLabel = "Non",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-4">
        {title && (
          <h3 className="text-sm font-semibold mb-2 text-slate-900">{title}</h3>
        )}
        <p className="text-sm text-slate-700 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 text-xs rounded border border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-3 py-1.5 text-xs rounded bg-red-600 text-white hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
