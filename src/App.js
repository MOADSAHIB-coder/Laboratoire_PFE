import { Routes, Route } from "react-router-dom";

import Home from "./app/pages/homes/home";
import EtudiantRoute from "./app/routes/EtudiantRoutes";
import Testauth from "./app/auth/authRoute";
import EnseignantRoute from "./app/routes/EnseignantRoutes";
//import EnseignantRoute from "./app/routes/EnseignantRoutes";
//import AdminRoute from "./app/routes/AdminRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Routes par rôle */}
      <Route path="/etudiant/*" element={<EtudiantRoute />} />
      <Route path="/enseignant/*" element={<EnseignantRoute />} />

      {/* Page par défaut */}
      <Route path="*" element={<Testauth />} />
    </Routes>
  );
}

export default App;
