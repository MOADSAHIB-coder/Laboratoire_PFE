import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import api from "../api/API_Djando";
import { Button } from "../components/componentLongin/ButonForm";

function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // erreurs UI par champ (comme Signup)
  const [fieldErrors, setFieldErrors] = useState({ password: "", confirm: "" });

  // message backend global
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error"); // error | success
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { uidb64, token } = useParams(); // uid = uidb64

  const inputBase =
    "w-full rounded-xl border bg-white py-3 pl-11 pr-12 text-gray-900 placeholder-gray-400 shadow-sm transition focus:outline-none focus:ring-2";
  const inputOk = "border-gray-200 focus:ring-blue-600 focus:border-blue-600";
  const inputErr = "border-red-500 focus:ring-red-500 focus:border-red-500";
  const errorText = "mt-1 text-xs font-medium text-red-600";

  // stable (pas de warning exhaustive-deps)
  const validatePassword = useCallback((pwd) => {
    if (!pwd) return "Mot de passe obligatoire";
    if (pwd.length < 8) return "Minimum 8 caractères.";
    if (!/[A-Z]/.test(pwd)) return "Ajoutez au moins 1 majuscule.";
    if (!/[a-z]/.test(pwd)) return "Ajoutez au moins 1 minuscule.";
    if (!/[0-9]/.test(pwd)) return "Ajoutez au moins 1 chiffre.";
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(pwd))
      return "Ajoutez au moins 1 caractère spécial.";
    if (/(.)\1\1/.test(pwd)) return "Pas 3 mêmes caractères consécutifs.";
    return "";
  }, []);

  // erreurs live
  const pwdError = useMemo(
    () => validatePassword(password),
    [password, validatePassword],
  );

  const confirmError = useMemo(() => {
    if (!confirmPassword) return "";
    if (password !== confirmPassword)
      return "Les mots de passe ne correspondent pas";
    return "";
  }, [password, confirmPassword]);

  const canSubmit = useMemo(() => {
    const hasValues =
      password.trim().length > 0 && confirmPassword.trim().length > 0;
    return hasValues && !pwdError && !confirmError && !isSubmitting;
  }, [password, confirmPassword, pwdError, confirmError, isSubmitting]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setFieldErrors({ password: "", confirm: "" });

    // validation UI submit (prioritaire)
    const pErr = validatePassword(password);
    const cErr = !confirmPassword
      ? "Veuillez confirmer le mot de passe."
      : password !== confirmPassword
        ? "Les mots de passe ne correspondent pas"
        : "";

    if (pErr || cErr) {
      setFieldErrors({ password: pErr || "", confirm: cErr || "" });
      return;
    }

    setIsSubmitting(true);
    try {
      // URL Django: reset-password-confirm/<uidb64>/<token>/
      const res = await api.post(
        `/etudiants/reset-password-confirm/${uidb64}/${token}/`,
        {
          password,
          confirmPassword,
        },
      );
      setMessageType("success");
      setMessage(res?.data?.message || "Mot de passe mis à jour avec succès.");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setMessageType("error");
      setMessage(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.response?.data?.detail ||
          "Erreur lors de la réinitialisation du mot de passe.",
      );
    } finally {
      setIsSubmitting(false);
      // (on garde les valeurs en cas d'erreur backend)
    }
  };

  const passwordHasUiError = Boolean(
    fieldErrors.password || (password && pwdError),
  );
  const confirmHasUiError = Boolean(
    fieldErrors.confirm || (confirmPassword && confirmError),
  );

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-gray-900">
      <div className="min-h-screen flex">
        {/* LEFT */}
        <aside className="hidden lg:flex flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-600 to-sky-500" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%)]" />

          <div className="relative z-10 flex h-full w-full items-center">
            <div className="max-w-xl px-14">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white/90 backdrop-blur">
                <span className="text-sm font-semibold">Réinitialisation</span>
                <span className="text-sm text-white/80">•</span>
                <span className="text-sm text-white/80">
                  Nouveau mot de passe
                </span>
              </div>

              <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white">
                EST-D LabTechNet
              </h1>

              <p className="mt-4 text-lg leading-relaxed text-white/90">
                Choisissez un mot de passe solide pour sécuriser votre compte.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-4">
                <div className="rounded-2xl bg-white/10 p-5 text-white/90 backdrop-blur">
                  <p className="font-semibold">✓ Bonnes pratiques</p>
                  <p className="mt-1 text-sm text-white/80">
                    8+ caractères, majuscule, minuscule, chiffre, spécial.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5 text-white/90 backdrop-blur">
                  <p className="font-semibold">🔐 Conseil</p>
                  <p className="mt-1 text-sm text-white/80">
                    Évitez un mot de passe déjà utilisé ailleurs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT */}
        <main className="w-full lg:w-[900px] flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-[520px]">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              <IoArrowBack />
              Retour
            </button>

            <div className="rounded-3xl border border-gray-200 bg-white/80 p-7 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur">
              <div className="mb-6">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Nouveau mot de passe
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Entrez et confirmez votre nouveau mot de passe.
                </p>
              </div>

              {message && (
                <div
                  className={[
                    "mb-5 rounded-xl border p-4 text-sm",
                    messageType === "error"
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-emerald-200 bg-emerald-50 text-emerald-700",
                  ].join(" ")}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Mot de passe <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FiLock />
                    </span>

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Votre nouveau mot de passe"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors.password)
                          setFieldErrors((p) => ({ ...p, password: "" }));
                      }}
                      className={[
                        inputBase,
                        passwordHasUiError ? inputErr : inputOk,
                      ].join(" ")}
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:text-gray-700"
                      aria-label="Afficher/masquer le mot de passe"
                    >
                      {showPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>

                  {passwordHasUiError && (
                    <p className={errorText}>
                      {fieldErrors.password || pwdError}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-gray-500">
                    8+ caractères, majuscule, minuscule, chiffre, spécial. Pas 3
                    mêmes caractères consécutifs.
                  </p>
                </div>

                {/* Confirm */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Confirmer le mot de passe{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FiLock />
                    </span>

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmez le mot de passe"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (fieldErrors.confirm)
                          setFieldErrors((p) => ({ ...p, confirm: "" }));
                      }}
                      className={[
                        inputBase,
                        confirmHasUiError ? inputErr : inputOk,
                      ].join(" ")}
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:text-gray-700"
                      aria-label="Afficher/masquer la confirmation"
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>

                  {confirmHasUiError && (
                    <p className={errorText}>
                      {fieldErrors.confirm || confirmError}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className={[
                    "w-full rounded-xl px-5 py-3 font-semibold text-white transition shadow-sm",
                    !canSubmit
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700",
                  ].join(" ")}
                >
                  {isSubmitting ? "Mise à jour..." : "Réinitialiser"}
                </Button>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Vous avez déjà un compte ?</span>
                  <Link
                    to="/login"
                    className="font-semibold text-blue-700 hover:underline"
                  >
                    Se connecter
                  </Link>
                </div>
              </form>
            </div>

            <p className="mt-6 text-center text-xs text-gray-500">
              En continuant, vous acceptez nos{" "}
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

export default NewPassword;
