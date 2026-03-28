// src/App.js
import { Routes, Route } from "react-router-dom";
import EtudiantRoute from "./app/routes/EtudiantRoutes";
import EnseignantRoute from "./app/routes/EnseignantRoutes";
import PublicRoutes from "./app/routes/PubliqueRoutes";
import AdminRoute from "./app/routes/AdminRoutes";
import {
  SettingsProvider,
  useSettings,
} from "./app/components/componentAdmin/SettingsContext";

import { useEffect } from "react";

// Composant interne qui peut utiliser les settings
function AppInner() {
  const { getSetting } = useSettings();

  // titre du document basé sur "Nom de la plateforme"
  const platformName =
    getSetting("general", "Nom de la plateforme") || "ESTD-LabTechNet";

  useEffect(() => {
    document.title = platformName;
  }, [platformName]);

  return (
    <Routes>
      <Route path="/etudiant/*" element={<EtudiantRoute />} />
      <Route path="/enseignant/*" element={<EnseignantRoute />} />
      <Route path="/admin/*" element={<AdminRoute />} />
      <Route path="/*" element={<PublicRoutes />} />
    </Routes>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppInner />
    </SettingsProvider>
  );
}
