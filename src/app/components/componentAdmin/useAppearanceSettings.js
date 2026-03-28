// src/app/hooks/useAppearanceSettings.js

// On importe le contexte global des paramètres
import { useSettings } from "./SettingsContext";

// Hook personnalisé pour centraliser tous les réglages d'apparence
export function useAppearanceSettings() {
  // On récupère depuis le contexte :
  // - getSetting : fonction utilitaire pour lire un paramètre par section + label
  // - darkMode / setDarkMode : état global du mode sombre
  const { getSetting, darkMode, setDarkMode } = useSettings();

  // Couleur principale de l'interface admin
  // On lit la valeur dans la section "appearance", label "Couleur principale"
  // Si rien en BDD, on met "Bleu" par défaut
  const primaryColor = getSetting("appearance", "Couleur principale") || "Bleu";

  // Couleur secondaire de l'interface admin
  const secondaryColor =
    getSetting("appearance", "Couleur secondaire") || "Blanc";

  // Mode nuit automatique (on le convertit en booléen avec Boolean(...))
  const autoNightMode = Boolean(
    getSetting("appearance", "Mode nuit automatique"),
  );

  // Nom affiché dans l'interface admin (header, etc.)
  const adminDisplayName =
    getSetting("appearance", "Nom affiché admin") || "Admin Panel";

  // On retourne un objet avec toutes les infos utiles pour l'apparence
  // Les composants (Header, Sidebar, Layout...) peuvent simplement
  // appeler ce hook pour récupérer ces valeurs.
  return {
    primaryColor,
    secondaryColor,
    autoNightMode,
    adminDisplayName,
    darkMode,
    setDarkMode,
  };
}
