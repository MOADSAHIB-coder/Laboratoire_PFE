import { Routes, Route } from "react-router-dom";
import EtudiantRoute from "./app/routes/EtudiantRoutes";
import EnseignantRoute from "./app/routes/EnseignantRoutes";
import PublicRoutes from "./app/routes/PubliqueRoutes";

function App() {
  return (
    <Routes>
      {/* Routes par rôle */}
      <Route path="/etudiant/*" element={<EtudiantRoute />} />
      <Route path="/enseignant/*" element={<EnseignantRoute />} />
      {/*Routes publiques*/}
      <Route path="/*" element={<PublicRoutes />} />
    </Routes>
  );
}

export default App;
