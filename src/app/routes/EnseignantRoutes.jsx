import { Route, Routes } from "react-router-dom";
import Ajoutertp from "../pages/enseignant/ajouter_tp";
import AjouterCours from "../pages/enseignant/cours";
import DashboardEnseignant from "../pages/enseignant/Dashboard";
import DiscussionEnseignant from "../pages/enseignant/discussion";
import ParametresEnseignant from "../pages/enseignant/parametres";
import ProfilEnseignant from "../pages/enseignant/profil";
import StatistiqueEnseignant from "../pages/enseignant/stats";
import VoirTpEtudiants from "../pages/enseignant/tp_etudiant";


function EnseignantRoute() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardEnseignant />} />
      <Route path="/mes-cours" element={<AjouterCours />} />
      <Route path="/mes-travaux" element={<Ajoutertp />} />
      <Route path="/tps-etudiant" element={<VoirTpEtudiants />} />
      <Route path="/discussion" element={<DiscussionEnseignant />} />
      <Route path="/statistique" element={<StatistiqueEnseignant />} />
      <Route path="/parametres" element={<ParametresEnseignant />} />
      <Route path="/profil" element={<ProfilEnseignant />} />
    </Routes>
  );
}

export default EnseignantRoute;
