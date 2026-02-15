import { Routes, Route } from "react-router-dom";

import Home from "./app/pages/homes/home";

import EtudiantRoute from "./app/routes/EtudiantRoutes";
import Testauth from "./app/auth/authRoute";
import EnseignantRoute from "./app/routes/EnseignantRoutes";
import AboutPage from "./app/pages/homes/aboutPage";
import SignUp from "./app/auth/Signup";
import Login from "./app/auth/login";
import ReinilialiserMotDePasse from "./app/auth/Forgot-password";
import NewPassword from "./app/auth/Newpass";
import Contacts from "./app/pages/homes/FormContact";
import FoireQuestion from "./app/pages/homes/FAQ";

//import EnseignantRoute from "./app/routes/EnseignantRoutes";
//import AdminRoute from "./app/routes/AdminRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apropos" element={<AboutPage />} />

      {/* Routes par rôle */}
      <Route path="/etudiant/*" element={<EtudiantRoute />} />
      <Route path="/enseignant/*" element={<EnseignantRoute />} />

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

      {/* Page par défaut */}
      <Route path="*" element={<Testauth />} />
    </Routes>
  );
}

export default App;
