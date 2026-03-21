import React, { useMemo, useState } from "react";
import api from "../api/API_Djando";
import { setTokens } from "../api/API_Djando";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiEye, FiEyeOff, FiLock, FiUser } from "react-icons/fi";
import { useSecuritySettings } from "../components/componentAdmin/useSecuritySettings";

function Login() {
  /*
  =====================================================
  STATES
  =====================================================
  */

  // étape actuelle du formulaire
  // 1 = saisie du nom d'utilisateur
  // 2 = saisie du mot de passe
  const [step, setStep] = useState(1);

  // champ username
  const [username, setUsername] = useState("");

  // champ password
  const [password, setPassword] = useState("");

  // message informatif (ex: champ vide)
  const [submitMessage, setSubmitMessage] = useState("");

  // message d'erreur (ex: mauvais identifiants)
  const [error, setError] = useState("");

  // état de chargement pendant la connexion
  const [isSubmitting, setIsSubmitting] = useState(false);

  // afficher / masquer le mot de passe
  const [showPwd, setShowPwd] = useState(false);

  // NOUVEAU : nombre de tentatives de connexion sur cette session de page
  const [loginAttempts, setLoginAttempts] = useState(0);

  /*
  =====================================================
  HOOKS DE NAVIGATION
  =====================================================
  */

  // permet de rediriger l'utilisateur après connexion
  const navigate = useNavigate();

  // permet de lire l'URL actuelle
  const location = useLocation();

  /*
  =====================================================
  VALIDATION ÉTAPE 1
  =====================================================
  */

  // active le bouton "Continuer" seulement si username est rempli
  const canGoNext = useMemo(() => username.trim().length > 0, [username]);

  /*
  =====================================================
  DÉTECTION DU TYPE DE CONNEXION SELON L'URL
  =====================================================

  /login              => étudiant
  /admin/login        => admin
  /enseignant/login   => enseignant
  */

  const isAdminLogin = location.pathname === "/connexion/admin";
  const isEnseignantLogin = location.pathname === "/connexion/enseignant";

  /*
  =====================================================
  CONFIGURATION DE LA CONNEXION SELON LE RÔLE
  =====================================================

  endpoint  = route API à appeler
  dashboard = page vers laquelle rediriger après login
  label     = texte affiché dans l'interface
  */

  const loginConfig = useMemo(() => {
    // cas admin
    if (isAdminLogin) {
      return {
        endpoint: "admin/login/",
        dashboard: "/admin",
        label: "administrateur",
      };
    }

    // cas enseignant
    if (isEnseignantLogin) {
      return {
        endpoint: "enseignants/login/",
        dashboard: "/enseignant/dashboard",
        label: "enseignant",
      };
    }

    // cas étudiant par défaut
    return {
      endpoint: "etudiants/login/",
      dashboard: "/etudiant/dashboard",
      label: "étudiant",
    };
  }, [isAdminLogin, isEnseignantLogin]);

  /*
  =====================================================
  PARAMÈTRES DE SÉCURITÉ (SettingsContext)
  =====================================================
  */

  const {
    loginMaxAttempts,
    accessTokenExpirationMinutes,
    refreshTokenExpirationDays,
  } = useSecuritySettings();

  // booléen : l'utilisateur a-t-il dépassé la limite de tentatives ?
  const isLoginBlocked = loginAttempts >= loginMaxAttempts;

  /*
  =====================================================
  ÉTAPE 1 : PASSER À L'ÉTAPE 2
  =====================================================
  */

  const handleNext = () => {
    // on réinitialise les messages
    setError("");
    setSubmitMessage("");

    // si username vide, on affiche un message
    if (!username.trim()) {
      setSubmitMessage("Veuillez saisir votre nom d'utilisateur.");
      return;
    }

    // sinon on passe à l'étape 2
    setStep(2);
  };

  /*
  =====================================================
  SOUMISSION DU FORMULAIRE
  =====================================================
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSubmitMessage("");

    if (!password.trim()) {
      setSubmitMessage("Veuillez saisir votre mot de passe.");
      return;
    }

    // NOUVEAU : si la limite de tentatives est atteinte, on bloque côté front
    if (isLoginBlocked) {
      setError(
        `Trop de tentatives de connexion. Vous avez dépassé la limite de ${loginMaxAttempts} essais. Veuillez réessayer plus tard.`,
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.post(loginConfig.endpoint, {
        username,
        password,
      });

      const { access, refresh, user } = res.data;

      // stocker les tokens (ta fonction setTokens s'en occupe)
      setTokens(access, refresh);

      // (Optionnel) On pourrait aussi stocker les durées d'expiration pour info
      localStorage.setItem(
        "access_token_expires_in_minutes",
        accessTokenExpirationMinutes,
      );
      localStorage.setItem(
        "refresh_token_expires_in_days",
        refreshTokenExpirationDays,
      );

      // stocker l'utilisateur et son rôle
      if (user) {
        console.log("ROLE:", user.role, "STATUT:", user.statut);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role);
      }

      //succès : on réinitialise le compteur de tentatives
      setLoginAttempts(0);

      // redirection
      navigate(loginConfig.dashboard);
    } catch (err) {
      const status = err.response?.status;

      //En cas d'échec, on incrémente le compteur de tentatives
      setLoginAttempts((prev) => prev + 1);

      if (!err.response) {
        setError(
          "Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.",
        );
      } else if (status === 400 || status === 401 || status === 403) {
        setError("Nom d'utilisateur ou mot de passe incorrect.");
      } else if (status === 429) {
        // Si le backend renvoie 429 quand il bloque un compte
        setError("Trop de tentatives. Votre compte est temporairement bloqué.");
      } else if (status >= 500) {
        setError(
          "Le serveur rencontre un problème. Veuillez réessayer plus tard.",
        );
      } else {
        setError("Votre requête n'a pas pu être envoyée. Veuillez réessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  /*
  =====================================================
  CLASSES TAILWIND RÉUTILISABLES
  =====================================================
  */

  // style commun pour les champs input
  const inputBase =
    "w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  // style commun pour les labels
  const labelBase = "mb-2 block text-sm font-medium text-gray-700";

  /*
  =====================================================
  RENDER
  =====================================================
  */

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-gray-900">
      <div className="min-h-screen flex">
        {/* =====================================================
            PARTIE GAUCHE : VISUEL / DESIGN
        ===================================================== */}
        <aside className="hidden lg:flex flex-1 relative overflow-hidden">
          {/* fond dégradé */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-600 to-sky-500" />

          {/* halo lumineux */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%)]" />

          {/* contenu visible au-dessus du fond */}
          <div className="relative z-10 flex h-full w-full items-center">
            <div className="max-w-xl px-14">
              {/* badge haut */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white/90 backdrop-blur">
                <span className="text-sm font-semibold">
                  Connexion sécurisée
                </span>
                <span className="text-sm text-white/80">•</span>
                <span className="text-sm text-white/80">Accès privé</span>
              </div>

              {/* titre */}
              <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white">
                EST-D LabTechNet
              </h1>

              {/* description */}
              <p className="mt-4 text-lg leading-relaxed text-white/90">
                Connectez-vous pour accéder à votre tableau de bord, ressources,
                projets et activités.
              </p>

              {/* petites cartes d'information */}
              <div className="mt-10 grid grid-cols-1 gap-4">
                <div className="rounded-2xl bg-white/10 p-5 text-white/90 backdrop-blur">
                  <p className="font-semibold">Votre espace privé</p>
                  <p className="mt-1 text-sm text-white/80">
                    Une expérience plus fluide, claire et sécurisée.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5 text-white/90 backdrop-blur">
                  <p className="font-semibold">🔒 Sécurité</p>
                  <p className="mt-1 text-sm text-white/80">
                    Authentification + accès protégé.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* =====================================================
            PARTIE DROITE : FORMULAIRE
        ===================================================== */}
        <main className="w-full lg:w-[900px] flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-[520px]">
            {/* bouton retour */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              <IoArrowBack />
              Retour
            </button>

            {/* =====================================================
                CARTE PRINCIPALE DU FORMULAIRE
            ===================================================== */}
            <div className="rounded-3xl border border-gray-200 bg-white/80 p-7 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur">
              {/* entête */}
              <div className="mb-6">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Connexion
                </h2>

                {/* texte qui change selon le rôle */}
                <p className="mt-2 text-sm text-gray-600">
                  Accédez à votre espace {loginConfig.label} en 2 étapes.
                </p>
              </div>

              {/* =====================================================
                  BARRE DE PROGRESSION
              ===================================================== */}
              <div className="mb-7">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span
                    className={step === 1 ? "font-semibold text-blue-700" : ""}
                  >
                    Étape 1
                  </span>

                  <span
                    className={step === 2 ? "font-semibold text-blue-700" : ""}
                  >
                    Étape 2
                  </span>
                </div>

                <div className="mt-2 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={[
                      "h-full rounded-full transition-all duration-300",
                      step === 1 ? "w-1/2 bg-blue-600" : "w-full bg-blue-600",
                    ].join(" ")}
                  />
                </div>
              </div>

              {/* =====================================================
                  MESSAGES D'ERREUR / INFO
              ===================================================== */}
              {(submitMessage || error) && (
                <div
                  className={[
                    "mb-5 rounded-xl border p-4 text-sm",
                    error
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-blue-200 bg-blue-50 text-blue-700",
                  ].join(" ")}
                >
                  {error || submitMessage}
                </div>
              )}

              {/* =====================================================
                  ÉTAPE 1 : USERNAME
              ===================================================== */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className={labelBase}>Nom d'utilisateur</label>

                    <div className="relative">
                      {/* icône utilisateur */}
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <FiUser />
                      </span>

                      {/* champ username */}
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`${inputBase} pl-11`}
                        placeholder="Votre nom d'utilisateur"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* bouton pour passer à l'étape suivante */}
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canGoNext}
                    className={[
                      "w-full rounded-xl px-5 py-3 font-semibold text-white transition shadow-sm",
                      canGoNext
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-300 cursor-not-allowed",
                    ].join(" ")}
                  >
                    Continuer →
                  </button>

                  {/* lien inscription */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Pas encore de compte ?</span>
                    <Link
                      to="/signup"
                      className="font-semibold text-blue-700 hover:underline"
                    >
                      S'inscrire
                    </Link>
                  </div>
                </div>
              )}

              {/* =====================================================
                  ÉTAPE 2 : PASSWORD
              ===================================================== */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* affichage du compte saisi */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Compte</p>
                      <p className="font-semibold text-gray-900">{username}</p>
                    </div>

                    {/* bouton pour revenir à l'étape 1 */}
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setPassword("");
                        setError("");
                        setSubmitMessage("");
                      }}
                      className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      Modifier
                    </button>
                  </div>

                  <div>
                    <label className={labelBase}>Mot de passe</label>

                    <div className="relative">
                      {/* icône cadenas */}
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <FiLock />
                      </span>

                      {/* champ mot de passe */}
                      <input
                        type={showPwd ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${inputBase} pl-11 pr-12`}
                        placeholder="Votre mot de passe"
                        autoFocus
                      />

                      {/* bouton afficher / masquer le mot de passe */}
                      <button
                        type="button"
                        onClick={() => setShowPwd((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                        aria-label="Afficher/masquer le mot de passe"
                      >
                        {showPwd ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  {/* bouton de connexion */}
                  <button
                    type="submit"
                    // on désactive aussi si l'utilisateur est bloqué
                    disabled={isSubmitting || isLoginBlocked}
                    className={[
                      "w-full rounded-xl px-5 py-3 font-semibold text-white transition shadow-sm",
                      isSubmitting || isLoginBlocked
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700",
                    ].join(" ")}
                  >
                    {isSubmitting
                      ? "Connexion..."
                      : isLoginBlocked
                        ? "Bloqué"
                        : "Se connecter"}
                  </button>

                  {/* liens bas du formulaire */}
                  <div className="flex items-center justify-between text-sm">
                    <Link
                      to="/forgot-pass"
                      className="font-semibold text-blue-700 hover:underline"
                    >
                      Mot de passe oublié ?
                    </Link>

                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* petit footer */}
            <p className="mt-6 text-center text-xs text-gray-500">
              En vous connectant, vous acceptez nos{" "}
              <Link to="/politique" className="text-blue-700 hover:underline">
                conditions
              </Link>
              .
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Login;
