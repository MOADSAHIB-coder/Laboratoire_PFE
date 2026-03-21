// src/pages/admin/settingsData.js
export const generalSettings = [
  {
    id: 1,
    label: "Nom de la plateforme",
    value: "ESTD-LabTechNet",
    type: "text",
  },
  {
    id: 2,
    label: "Email support",
    value: "estdlabtechnet@gmail.com",
    type: "email",
  },
  {
    id: 3,
    label: "Année universitaire active",
    value: "2025-2026",
    type: "text",
  },
  { id: 4, label: "Langue par défaut", value: "Français", type: "text" },
  { id: 5, label: "Fuseau horaire", value: "Africa/Casablanca", type: "text" },
];

export const securitySettings = [
  { id: 1, label: "Durée validité OTP (minutes)", value: "10", type: "number" },
  { id: 2, label: "Limite tentatives OTP", value: "5", type: "number" },
  { id: 3, label: "Limite tentatives connexion", value: "5", type: "number" },
  {
    id: 4,
    label: "Expiration access token (minutes)",
    value: "30",
    type: "number",
  },
  {
    id: 5,
    label: "Expiration refresh token (jours)",
    value: "7",
    type: "number",
  },
];

export const pedagogicSettings = [
  { id: 1, label: "Niveaux disponibles", value: "Bac+1, Bac+2", type: "text" },
  {
    id: 2,
    label: "Semestres disponibles",
    value: "S1, S2, S3, S4",
    type: "text",
  },
  {
    id: 3,
    label: "Types de cours",
    value: "Réseaux, Développement, Sécurité, Data, Infrastructure",
    type: "text",
  },
  { id: 4, label: "Génération TP par étudiant", value: true, type: "toggle" },
  { id: 5, label: "Génération TP par enseignant", value: true, type: "toggle" },
];

export const notificationSettings = [
  { id: 1, label: "Notifications email", value: true, type: "toggle" },
  { id: 2, label: "Alertes sécurité", value: true, type: "toggle" },
  { id: 3, label: "Alertes administrateur", value: true, type: "toggle" },
  { id: 4, label: "Notifications système", value: false, type: "toggle" },
];

export const appearanceSettings = [
  { id: 1, label: "Couleur principale", value: "Bleu", type: "text" },
  { id: 2, label: "Couleur secondaire", value: "Blanc", type: "text" },
  { id: 3, label: "Mode sombre", value: false, type: "toggle" },
  { id: 4, label: "Mode nuit automatique", value: false, type: "toggle" },
  { id: 5, label: "Nom affiché admin", value: "Admin Panel", type: "text" },
];
