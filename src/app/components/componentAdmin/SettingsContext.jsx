import React, { createContext, useContext, useEffect, useState } from "react";

import {
  generalSettings as generalDefaults,
  securitySettings as securityDefaults,
  pedagogicSettings as pedagogicDefaults,
  notificationSettings as notificationDefaults,
  appearanceSettings as appearanceDefaults,
} from "../../pages/admin/settingsData";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [general, setGeneral] = useState(generalDefaults);
  const [security, setSecurity] = useState(securityDefaults);
  const [pedagogic, setPedagogic] = useState(pedagogicDefaults);
  const [notifications, setNotifications] = useState(notificationDefaults);
  const [appearance, setAppearance] = useState(appearanceDefaults);
  const [darkMode, setDarkMode] = useState(
    appearanceDefaults.find((s) => s.label === "Mode sombre")?.value || false,
  );

  const [loading, setLoading] = useState(true);

  // Chargement initial depuis Django
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/api/admin/settings", {
          credentials: "include",
        });

        if (!res.ok)
          throw new Error("Erreur lors du chargement des paramètres");

        const data = await res.json();

        setGeneral(data.general ?? generalDefaults);
        setSecurity(data.security ?? securityDefaults);
        setPedagogic(data.pedagogic ?? pedagogicDefaults);
        setNotifications(data.notifications ?? notificationDefaults);
        setAppearance(data.appearance ?? appearanceDefaults);

        if (typeof data.darkMode === "boolean") {
          setDarkMode(data.darkMode);
        } else {
          const fromAppearance =
            (data.appearance ?? appearanceDefaults).find(
              (s) => s.label === "Mode sombre",
            )?.value || false;
          setDarkMode(fromAppearance);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Appliquer le dark mode globalement
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // Fonction pour sauvegarder (réutilisable dans ton écran admin)
  const saveSettings = async (overrides = {}) => {
    const payload = {
      general,
      security,
      pedagogic,
      notifications,
      appearance: appearance.map((item) =>
        item.label === "Mode sombre" ? { ...item, value: darkMode } : item,
      ),
      darkMode,
      ...overrides, // permet de forcer des valeurs si besoin
    };

    const res = await fetch("http://localhost:8000/api/admin/settings/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Erreur lors de la sauvegarde des paramètres");
    }

    return payload;
  };

  // Helpers pour obtenir une valeur par "label" (plus simple à consommer)
  const getSetting = (section, label) => {
    const map = {
      general,
      security,
      pedagogic,
      notifications,
      appearance,
    };
    const arr = map[section];
    if (!arr) return undefined;
    return arr.find((s) => s.label === label)?.value;
  };

  const value = {
    loading,
    general,
    security,
    pedagogic,
    notifications,
    appearance,
    darkMode,
    setGeneral,
    setSecurity,
    setPedagogic,
    setNotifications,
    setAppearance,
    setDarkMode,
    saveSettings,
    getSetting,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings doit être utilisé dans un <SettingsProvider>");
  }
  return ctx;
}
