import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/etudiant/Dashboard";
import MesCours from "../pages/etudiant/cours";
import Projets from "../pages/etudiant/projets";
import TP from "../pages/etudiant/tp";
import Discussion from "../pages/etudiant/discussion";
import Statistique from "../pages/etudiant/ressources";
import Parametres from "../pages/etudiant/parametres";
import Profil from "../pages/etudiant/profil";
import ProtectedRoute from "../auth/RouteProtect"; //Protection des routes

function EtudiantRoute() {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["etudiant"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mes-cours" element={<MesCours />} />
        <Route path="/projets-devoirs" element={<Projets />} />
        <Route path="/tps" element={<TP />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/statistique" element={<Statistique />} />
        <Route path="/parametres" element={<Parametres />} />
        <Route path="/profil" element={<Profil />} />
      </Route>
    </Routes>
  );
}

export default EtudiantRoute;
