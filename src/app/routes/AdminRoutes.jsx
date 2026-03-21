import { Route, Routes } from "react-router-dom";
import DashboardAdmin from "../pages/admin/Dashboard";
import EtudiantsAdmin from "../pages/admin/EtudiantsAdmin";
import EnseignantsAdmin from "../pages/admin/EnseignantsAdmin";
import RolesAdmin from "../pages/admin/RolesAdmin";
import OtpAdmin from "../pages/admin/OtpAdmin";
import SauvegardeAdmin from "../pages/admin/SauvegardeAdmin";
import RestaurationAdmin from "../pages/admin/RestaurationAdmin";
import ParametresAdmin from "../pages/admin/ParametresAdmin";
import TentativesConnexionAdmin from "../pages/admin/TentativesConnexionAdmin";
import SupervisionAdmin from "../pages/admin/SupervisionAdmin";
import ProtectedRoute from "../auth/RouteProtect";
import MessagesAdmin from "../pages/admin/boiteMessage";

function AdminRoute() {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        {/* Dashboard admin sur /admin (après le /admin/* déjà défini dans App.jsx) */}
        <Route index element={<DashboardAdmin />} />
        {/* OU: <Route path="" element={<DashboardAdmin />} /> */}

        {/* autres routes : chemins relatifs */}
        <Route path="supervision-admin" element={<SupervisionAdmin />} />
        <Route path="gestion-etudiant" element={<EtudiantsAdmin />} />
        <Route path="gestion-enseignant" element={<EnseignantsAdmin />} />
        <Route path="gestion-role" element={<RolesAdmin />} />
        <Route path="supervision-opt" element={<OtpAdmin />} />
        <Route path="message" element={<MessagesAdmin />} />
        <Route path="maintenance-sauvegarde" element={<SauvegardeAdmin />} />
        <Route
          path="maintenance-restauration"
          element={<RestaurationAdmin />}
        />
        <Route path="parametre" element={<ParametresAdmin />} />
        <Route
          path="tentative-connexion"
          element={<TentativesConnexionAdmin />}
        />
      </Route>
    </Routes>
  );
}
export default AdminRoute;
