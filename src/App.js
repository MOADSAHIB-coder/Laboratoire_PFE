import {Routes, Route } from "react-router-dom";

import EtudiantRoute from "./app/routes/EtudiantRoutes";
//import EnseignantRoute from "./app/routes/EnseignantRoutes";
//import AdminRoute from "./app/routes/AdminRoutes";

function App() {
  return (
      <Routes>
        {/* Routes par rôle */}
        <Route path="/etudiant/*" element={<EtudiantRoute />} />

        {/* Page par défaut */}
        <Route path="/" element={<EtudiantRoute />} />
      </Routes>
  );
}

export default App;
