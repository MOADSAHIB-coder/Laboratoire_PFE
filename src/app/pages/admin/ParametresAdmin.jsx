import React, { useEffect, useState } from "react";
import {
  Settings,
  ShieldCheck,
  Bell,
  Palette,
  GraduationCap,
  Save,
} from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import {
  generalSettings as generalDefaults,
  securitySettings as securityDefaults,
  pedagogicSettings as pedagogicDefaults,
  notificationSettings as notificationDefaults,
  appearanceSettings as appearanceDefaults,
} from "./settingsData";

// Carte de section
function SectionCard({ icon: Icon, title, subtitle, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-700">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
          <Icon className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}

// Ligne de paramètre (input ou toggle)
function SettingRow({ id, label, value, type, onChange }) {
  const [enabled, setEnabled] = useState(value);

  // Synchronise le toggle si la valeur change côté parent
  useEffect(() => {
    if (type === "toggle") {
      setEnabled(value);
    }
  }, [value, type]);

  const handleToggle = () => {
    const nextValue = !enabled;
    setEnabled(nextValue);
    onChange?.(id, nextValue);
  };

  const handleInputChange = (e) => {
    onChange?.(id, e.target.value);
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-sm font-semibold text-slate-700">{label}</p>

      {type === "toggle" ? (
        <button
          type="button"
          onClick={handleToggle}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
            enabled ? "bg-blue-600" : "bg-slate-300"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      ) : (
        <input
          value={value ?? ""}
          onChange={handleInputChange}
          type={
            type === "number" ? "number" : type === "email" ? "email" : "text"
          }
          className="rounded-xl border border-slate-300 px-3 py-2"
        />
      )}
    </div>
  );
}

export default function ParametresAdmin() {
  // États globaux par section
  const [general, setGeneral] = useState(generalDefaults);
  const [security, setSecurity] = useState(securityDefaults);
  const [pedagogic, setPedagogic] = useState(pedagogicDefaults);
  const [notifications, setNotifications] = useState(notificationDefaults);
  const [appearance, setAppearance] = useState(appearanceDefaults);

  // Mode sombre (lié à appearance.dark_mode)
  const [darkMode, setDarkMode] = useState(
    appearanceDefaults.find((s) => s.label === "Mode sombre")?.value || false,
  );

  // États de chargement / sauvegarde / erreur
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // 1) Chargement initial des paramètres depuis l'API Django
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://localhost:8000/api/admin/settings", {
          credentials: "include", // utile si tu utilises des sessions/cookies
        });

        if (!res.ok) {
          throw new Error("Erreur lors du chargement des paramètres");
        }

        const data = await res.json();

        // On utilise les données de l'API si dispo, sinon les defaults
        setGeneral(data.general ?? generalDefaults);
        setSecurity(data.security ?? securityDefaults);
        setPedagogic(data.pedagogic ?? pedagogicDefaults);
        setNotifications(data.notifications ?? notificationDefaults);
        setAppearance(data.appearance ?? appearanceDefaults);

        // darkMode : soit pris directement, soit reconstruit depuis appearance
        if (typeof data.darkMode === "boolean") {
          setDarkMode(data.darkMode);
        } else {
          const fromAppearance =
            (data.appearance ?? appearanceDefaults).find(
              (s) => s.label === "Mode sombre",
            )?.value || false;
          setDarkMode(fromAppearance);
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // 2) Appliquer le mode sombre à la balise html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // 3) Handler générique pour mettre à jour une section
  const makeSectionChangeHandler = (sectionSetter) => (id, newValue) => {
    sectionSetter((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, value: newValue } : item,
      ),
    );
  };

  // 4) Sauvegarde vers l'API Django
  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      const payload = {
        general,
        security,
        pedagogic,
        notifications,
        appearance: appearance.map((item) =>
          item.label === "Mode sombre" ? { ...item, value: darkMode } : item,
        ),
        darkMode,
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

      console.log("Paramètres sauvegardés !");
    } catch (err) {
      console.error(err);
      setError(err.message || "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-10 text-center text-slate-500">Chargement...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header + bouton Enregistrer */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
              Paramètres
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Configuration générale de la plateforme, sécurité, pédagogie,
              notifications et apparence.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-sm ${
              saving
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Save className="h-4 w-4" />
            {saving ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
        </div>

        {/* Message d'erreur éventuel */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Sections */}
        <div className="grid gap-6">
          {/* Paramètres généraux */}
          <SectionCard
            icon={Settings}
            title="Paramètres généraux"
            subtitle="Configuration principale de la plateforme."
          >
            <div className="space-y-4">
              {general.map((item) => (
                <SettingRow
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  value={item.value}
                  type={item.type}
                  onChange={makeSectionChangeHandler(setGeneral)}
                />
              ))}
            </div>
          </SectionCard>

          {/* Sécurité */}
          <SectionCard
            icon={ShieldCheck}
            title="Sécurité"
            subtitle="Règles liées aux OTP, aux connexions et aux tokens."
          >
            <div className="space-y-4">
              {security.map((item) => (
                <SettingRow
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  value={item.value}
                  type={item.type}
                  onChange={makeSectionChangeHandler(setSecurity)}
                />
              ))}
            </div>
          </SectionCard>

          {/* Pédagogie */}
          <SectionCard
            icon={GraduationCap}
            title="Pédagogie"
            subtitle="Réglages académiques et options de génération de TP."
          >
            <div className="space-y-4">
              {pedagogic.map((item) => (
                <SettingRow
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  value={item.value}
                  type={item.type}
                  onChange={makeSectionChangeHandler(setPedagogic)}
                />
              ))}
            </div>
          </SectionCard>

          {/* Notifications */}
          <SectionCard
            icon={Bell}
            title="Notifications"
            subtitle="Activation des alertes et notifications système."
          >
            <div className="space-y-4">
              {notifications.map((item) => (
                <SettingRow
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  value={item.value}
                  type={item.type}
                  onChange={makeSectionChangeHandler(setNotifications)}
                />
              ))}
            </div>
          </SectionCard>

          {/* Apparence */}
          <SectionCard
            icon={Palette}
            title="Apparence"
            subtitle="Personnalisation visuelle du panneau d’administration."
          >
            <div className="space-y-4">
              {appearance.map((item) => (
                <SettingRow
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  value={item.label === "Mode sombre" ? darkMode : item.value}
                  type={item.type}
                  onChange={(id, newValue) => {
                    if (item.label === "Mode sombre") {
                      setDarkMode(newValue);
                    } else {
                      makeSectionChangeHandler(setAppearance)(id, newValue);
                    }
                  }}
                />
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </AdminLayout>
  );
}
