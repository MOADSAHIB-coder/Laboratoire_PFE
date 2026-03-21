import { Route, Routes } from "react-router-dom";
import Testauth from "../auth/authRoute";
import Login from "../auth/login";
import NewPassword from "../auth/Newpass";
import FonctonnaliteSite from "../pages/homes/fonctionnalite/fonctionnalite";
import Terms from "../pages/homes/fonctionnalite/PageCondition";
import About from "../pages/homes/about/aboutPage";
import FoireQuestion from "../pages/homes/FAQ/faq";
import Contacts from "../pages/homes/Formulaire/FormContact";
import Home from "../pages/homes/Accueil/home";
import ReinilialiserMotDePasse from "../auth/Forgot-password";
import Signup from "../auth/Signup";
import InscriptionProfesseur from "../auth/SignupEnseignant";
import {
  PageEspaceAdmin,
  PageEspaceEtudiant,
  PageEspaceEnseignant,
} from "../pages/homes/fonctionnalite/rolesEspaces";
import LoginRedirect from "../components/component_Signup/LoginRedirect";

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Routes pour la page d'inscription*/}
      <Route path="/signup" element={<Signup />} />

      {/* Route "générique" de login */}
      <Route path="/login" element={<LoginRedirect />} />

      {/* Tes 3 écrans de connexion */}
      <Route path="/connexion/etudiant" element={<Login />} />
      <Route path="/connexion/enseignant" element={<Login />} />
      <Route path="/connexion/admin" element={<Login />} />

      {/*ReinitialiserPassword*/}
      <Route path="/forgot-pass" element={<ReinilialiserMotDePasse />} />

      {/*Modifier mot de passe*/}
      <Route
        path="/reset-password-confirm/:uidb64/:token/"
        element={<NewPassword />}
      />
      {/*contactez-nous*/}
      <Route path="/contactez-nous" element={<Contacts />} />

      {/* FAQ */}
      <Route path="/faq" element={<FoireQuestion />} />

      {/*fonctionnalites du site*/}

      <Route path="/fonctionnalite" element={<FonctonnaliteSite />} />

      {/*Politique d'utilisation*/}
      <Route path="/politique" element={<Terms />} />

      {/* Page par défaut */}
      <Route path="*" element={<Testauth />} />
      {/*A propos*/}
      <Route path="/apropos" element={<About />} />
      <Route path="/inscrit-prof" element={<InscriptionProfesseur />} />
      <Route path="/espace-etudiant" element={<PageEspaceEtudiant />} />
      <Route path="/espace-enseignant" element={<PageEspaceEnseignant />} />
      <Route path="/espace-admin" element={<PageEspaceAdmin />} />
    </Routes>
  );
}

export default PublicRoutes;
