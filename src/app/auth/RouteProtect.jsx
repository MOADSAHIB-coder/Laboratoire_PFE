import { useAuth } from "./useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ allowedRoles }) {
  const { user, accessToken, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Chargement...</div>;
  }

  // 1) Pas de token → pas connecté
  if (!accessToken) {
    // on renvoie vers la route /login qui elle-même décidera vers quel login envoyer
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 2) Connecté mais rôle non autorisé
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md bg-white p-6 rounded-xl shadow">
          <h1 className="text-xl font-bold mb-3 text-red-600">Accès refusé</h1>
          <p className="mb-2">
            Vous êtes connecté en tant que <strong>{user?.role}</strong>, mais
            vous n’avez pas le droit d’accéder à cette page.
          </p>
          <p className="text-sm text-gray-600">
            Si vous pensez que c’est une erreur, contactez un administrateur.
          </p>
        </div>
      </div>
    );
  }

  // 3) Connecté + bon rôle
  return <Outlet />;
}

export default ProtectedRoute;
