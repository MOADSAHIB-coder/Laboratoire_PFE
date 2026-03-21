import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiMail } from "react-icons/fi";
import api from "../api/API_Djando";

function ReinilialiserMotDePasse() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // success/info
  const [error, setError] = useState(""); // error
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => email.trim().length > 0, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setMessage("Veuillez saisir votre e-mail.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("etudiants/password-forgot/", { email });
      setMessage(
        "Si ce compte existe, un lien de réinitialisation a été envoyé à votre e-mail.",
      );
      setEmail("");
    } catch (err) {
      if (!err.response) {
        // vrai problème de connexion au serveur
        setError(
          "Impossible de contacter le serveur. Vérifiez votre connexion ou réessayez plus tard.",
        );
      } else {
        // pour sécurité, même message que si succès
        setMessage(
          "Si ce compte existe, un lien de réinitialisation a été envoyé à votre e-mail.",
        );
      }
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };
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
                <span className="text-sm font-semibold">Récupération</span>
                <span className="text-sm text-white/80">•</span>
                <span className="text-sm text-white/80">Lien sécurisé</span>
              </div>

              <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white">
                EST-D LabTechNet
              </h1>

              <p className="mt-4 text-lg leading-relaxed text-white/90">
                Saisissez votre e-mail pour recevoir un lien de réinitialisation
                et récupérer votre accès rapidement.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-4">
                <div className="rounded-2xl bg-white/10 p-5 text-white/90 backdrop-blur">
                  <p className="font-semibold">🔒 Sécurisé</p>
                  <p className="mt-1 text-sm text-white/80">
                    Nous ne révélons jamais si un compte existe ou non.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5 text-white/90 backdrop-blur">
                  <p className="font-semibold">⚡ Simple</p>
                  <p className="mt-1 text-sm text-white/80">
                    Un e-mail → un lien → nouveau mot de passe.
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
                  Mot de passe oublié
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Veuillez saisir votre e-mail.
                </p>
              </div>

              {/* Messages */}
              {(message || error) && (
                <div
                  className={[
                    "mb-5 rounded-xl border p-4 text-sm",
                    error
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-blue-200 bg-blue-50 text-blue-700",
                  ].join(" ")}
                >
                  {error || message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    E-mail
                  </label>

                  {/* Input natif + icône */}
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FiMail />
                    </span>

                    <input
                      type="email"
                      placeholder="etudiant@.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={[
                        "w-full rounded-xl border bg-white px-4 py-3 pl-11",
                        "text-sm md:text-base text-gray-900 shadow-sm transition",
                        "border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
                      ].join(" ")}
                    />
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    Un message contenant le lien de réinitialisation a été
                    envoyé a votre e-mail.
                  </p>
                </div>

                {/* Button natif */}
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className={[
                    "w-full rounded-xl px-5 py-3 font-semibold text-white transition shadow-sm",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    !canSubmit || isSubmitting
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99]",
                  ].join(" ")}
                >
                  {isSubmitting ? "Envoi..." : "Envoyer le lien →"}
                </button>

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

            {/* Footer small */}
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

export default ReinilialiserMotDePasse;
