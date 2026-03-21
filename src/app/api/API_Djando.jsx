// Import de la bibliothèque Axios pour faire des requêtes HTTP
import axios from "axios";

// URL de base de ton API Django
const BASE_URL = "http://127.0.0.1:8000/api/";

// Création d'une instance Axios personnalisée
// Elle utilisera automatiquement cette URL de base
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }, // format JSON par défaut
});

// Fonction pour récupérer le access token stocké dans le navigateur
const getAccess = () => localStorage.getItem("access_token");

// Fonction pour récupérer le refresh token
const getRefresh = () => localStorage.getItem("refresh_token");

// Fonction pour sauvegarder les tokens dans le navigateur
export const setTokens = (access, refresh) => {
  if (access) localStorage.setItem("access_token", access); // stocke access token
  if (refresh) localStorage.setItem("refresh_token", refresh); // stocke refresh token
};

// Fonction qui supprime les tokens du navigateur
export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// Fonction de déconnexion forcée
// Supprime toutes les informations d'authentification et redirige vers login
export const forceLogout = () => {
  clearTokens(); // supprime les tokens
  localStorage.removeItem("user"); // supprime infos utilisateur éventuelles
  localStorage.removeItem("role"); // supprime rôle utilisateur
  window.location.href = "/login"; // redirection vers la page login
};

// Fonction de logout "propre" : prévient le backend + nettoie le front
export const logout = async () => {
  const refresh = getRefresh();

  try {
    if (refresh) {
      // BASE_URL = "http://127.0.0.1:8000/api/"
      // BackendLabo/urls.py -> path("api/enseignants/", include("enseignants.urls"))
      // donc l'URL complète est /api/enseignants/logout/
      await api.post("enseignants/logout/", { refresh });
    }
  } catch (e) {
    console.error("Erreur logout API", e);
  } finally {
    // Quoi qu'il arrive, on nettoie en local
    forceLogout();
  }
};

// Liste des routes publiques (pas besoin de token)
const publicRoutes = [
  "login/",
  "register/",
  "otp/send/",
  "otp/verify/",
  "password-forgot/",
  "password-reset-confirm/",
  "token/refresh/",
  "etudiants/register/",
  "enseignants/register/",
  "enseignants/login/",
];

// ===============================
// INTERCEPTOR DE REQUETE
// ===============================
// Ce code s'exécute AVANT chaque requête HTTP

api.interceptors.request.use((config) => {
  // récupération du access token
  const token = getAccess();

  // récupération de l'URL de la requête
  const url = config.url || "";

  // vérifie si l'URL correspond à une route publique
  const isPublicRoute = publicRoutes.some((route) => url.includes(route));

  // Si un token existe et que la route n'est pas publique
  if (token && !isPublicRoute) {
    // on ajoute automatiquement le header Authorization
    config.headers.Authorization = `Bearer ${token}`;
  }

  // on renvoie la configuration modifiée
  return config;
});

// ===============================
// INTERCEPTOR DE REPONSE
// ===============================
// Ce code s'exécute APRES chaque réponse serveur

api.interceptors.response.use(
  // Si la réponse est OK on la renvoie directement
  (res) => res,

  // Si une erreur arrive
  async (error) => {
    // requête originale qui a échoué
    const originalRequest = error.config;

    // URL de la requête
    const url = originalRequest?.url || "";

    // vérifie si la route est publique
    const isPublicRoute = publicRoutes.some((route) => url.includes(route));

    // code HTTP de la réponse
    const status = error.response?.status;

    // =====================================
    // CAS 1 : TOKEN EXPIRÉ (401)
    // =====================================
    // Si le serveur renvoie 401, on tente un refresh
    if (
      status === 401 && // erreur d'authentification
      !originalRequest?._retry && // éviter boucle infinie
      getRefresh() && // refresh token disponible
      !isPublicRoute // pas sur route publique
    ) {
      // on marque la requête comme déjà retentée
      originalRequest._retry = true;

      try {
        // appel de l'API de refresh token
        const refreshRes = await axios.post(`${BASE_URL}token/refresh/`, {
          refresh: getRefresh(),
        });

        // nouveau access token
        const newAccess = refreshRes.data.access;

        // mise à jour du access token dans le navigateur
        setTokens(newAccess, null);

        // mise à jour du header Authorization
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        // on relance la requête originale
        return api(originalRequest);
      } catch {
        // si le refresh échoue → déconnexion
        forceLogout();
        return Promise.reject(error);
      }
    }

    // =====================================
    // CAS 2 : ACCES REFUSÉ (401 ou 403)
    // =====================================
    // Si l'utilisateur n'est plus autorisé
    if ((status === 401 || status === 403) && !isPublicRoute) {
      // on déconnecte l'utilisateur
      forceLogout();
    }

    // on renvoie l'erreur au composant React
    return Promise.reject(error);
  },
);

// export de l'instance axios pour l'utiliser dans toute l'application
export default api;
