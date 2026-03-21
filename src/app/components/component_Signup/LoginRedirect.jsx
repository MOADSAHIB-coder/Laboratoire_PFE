// src/app/auth/LoginRedirect.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

function LoginRedirect() {
  const { user, accessToken } = useAuth();

  // Pas connecté: on envoie vers le login de base (étudiant )
  if (!accessToken || !user) {
    return <Navigate to="/connexion/etudiant" replace />;
  }

  // Connecté + rôle admin
  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // Connecté + rôle enseignant
  if (user.role === "enseignant") {
    return <Navigate to="/enseignant/dashboard" replace />;
  }

  // Connecté + rôle étudiant (ou autre) → espace étudiant
  return <Navigate to="/etudiant/dashboard" replace />;
}

export default LoginRedirect;
