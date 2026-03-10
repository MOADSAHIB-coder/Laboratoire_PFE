import React, { useMemo, useState } from "react";
import api from "../api/API_Djando";
import { setTokens } from "../api/API_Djando";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiEye, FiEyeOff, FiLock, FiUser } from "react-icons/fi";

function Login() {
  const [step, setStep] = useState(1); // 1: username, 2: password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const navigate = useNavigate();

  const canGoNext = useMemo(() => username.trim().length > 0, [username]);

  const handleNext = () => {
    setError("");
    setSubmitMessage("");

    if (!username.trim()) {
      setSubmitMessage("Veuillez saisir votre nom d'utilisateur.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitMessage("");

    if (!password.trim()) {
      setSubmitMessage("Veuillez saisir votre mot de passe.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.post("etudiants/login/", { username, password });
      const { access, refresh } = res.data;
      setTokens(access, refresh);
      navigate("/etudiant/dashboard");
    } catch (err) {
      setError("Nom d'utilisateur ou mot de passe incorrect.");
    } finally {
      setIsSubmitting(false);
      setPassword("");
    }
  };

  const inputBase =
    "w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";
  const labelBase = "mb-2 block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-gray-900">
      <div className="min-h-screen flex">
        {/* LEFT - Modern Visual */}
        <aside className="hidden lg:flex flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-600 to-sky-500" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%)]" />

          <div className="relative z-10 flex h-full w-full items-center">
            <div className="max-w-xl px-14">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white/90 backdrop-blur">
                <span className="text-sm font-semibold">
                  Connexion sécurisée
                </span>
                <span className="text-sm text-white/80">•</span>
                <span className="text-sm text-white/80">Accès privé</span>
              </div>

              <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white">
                EST-D LabTechNet
              </h1>

              <p className="mt-4 text-lg leading-relaxed text-white/90">
                Connectez-vous pour accéder à votre tableau de bord, ressources,
                projets et activités.
              </p>

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

        {/* RIGHT - Form */}
        <main className="w-full lg:w-[900px] flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-[520px]">
            {/* Back */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              <IoArrowBack />
              Retour
            </button>

            {/* Card */}
            <div className="rounded-3xl border border-gray-200 bg-white/80 p-7 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Connexion
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Accédez à votre espace étudiant en 2 étapes.
                </p>
              </div>

              {/* Progress */}
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

              {/* Messages */}
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

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className={labelBase}>Nom d'utilisateur</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <FiUser />
                      </span>
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

              {/* Step 2 */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Compte</p>
                      <p className="font-semibold text-gray-900">{username}</p>
                    </div>

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
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <FiLock />
                      </span>

                      <input
                        type={showPwd ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${inputBase} pl-11 pr-12`}
                        placeholder="Votre mot de passe"
                        autoFocus
                      />

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

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={[
                      "w-full rounded-xl px-5 py-3 font-semibold text-white transition shadow-sm",
                      isSubmitting
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700",
                    ].join(" ")}
                  >
                    {isSubmitting ? "Connexion..." : "Se connecter"}
                  </button>

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

            {/* Footer small */}
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
