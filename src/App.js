import { Routes, Route } from "react-router-dom";

import EtudiantRoute from "./app/routes/EtudiantRoutes";
import Testauth from "./app/auth/authRoute";
import EnseignantRoute from "./app/routes/EnseignantRoutes";
import SignUp from "./app/auth/Signup";
import Login from "./app/auth/login";
import ReinilialiserMotDePasse from "./app/auth/Forgot-password";
import NewPassword from "./app/auth/Newpass";

import FonctonnaliteSite from "./app/pages/homes/fonctionnalite/fonctionnalite";
import Terms from "./app/pages/homes/fonctionnalite/PageCondition";
import About from "./app/pages/homes/about/aboutPage";
import FoireQuestion from "./app/pages/homes/FAQ/faq";
import Contacts from "./app/pages/homes/Formulaire/FormContact";
import Home from "./app/pages/homes/Accueil/home";
//import EnseignantRoute from "./app/routes/EnseignantRoutes";
//import AdminRoute from "./app/routes/AdminRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Routes par rôle */}
      <Route path="/etudiant" element={<EtudiantRoute />} />
      <Route path="/enseignant" element={<EnseignantRoute />} />

      {/* Routes pour la page d'inscription*/}
      <Route path="/signup" element={<SignUp />} />

      {/*Routes login */}
      <Route path="/login" element={<Login />} />

      {/*ReinitialiserPassword*/}
      <Route path="/forgot-pass" element={<ReinilialiserMotDePasse />} />

      {/*Modifier mot de passe*/}
      <Route path="/modifier-pass" element={<NewPassword />} />
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
    </Routes>
  );
}

export default App;
