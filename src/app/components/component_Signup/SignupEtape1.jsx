import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  User,
  Mail,
  CreditCard,
  GraduationCap,
  ShieldCheck,
  Lock,
} from "lucide-react";

import EmailOTP from "../../auth/email_opt";

const SignupStep1 = ({
  formStep1,
  errors,
  handleChangeStep1,
  handleNextStep,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  setEmailOtpStatus,
  setEmailTicket,
  inputClass,
  selectClass,
  errorText,
  errorBase,
  labelBase,
}) => {
  return (
    <div className="animate-[fadeIn_.25s_ease]">
      <form id="signup-step1" onSubmit={handleNextStep} className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800">
            Informations de base
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Renseignez vos informations personnelles et académiques. La
            vérification de l’adresse email est obligatoire avant de continuer.
          </p>
        </div>

        <section className="rounded-2xl border bg-slate-50 p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Identité</h4>
              <p className="text-xs text-slate-500">
                Informations personnelles de l’étudiant
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelBase}>Nom</label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  name="lastName"
                  type="text"
                  className={inputClass("lastName")}
                  value={formStep1.lastName}
                  onChange={handleChangeStep1}
                  placeholder="Votre nom"
                />
              </div>
              {errorText("lastName") && (
                <p className={errorBase}>{errorText("lastName")}</p>
              )}
            </div>

            <div>
              <label className={labelBase}>Prénom</label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  name="firstName"
                  type="text"
                  className={inputClass("firstName")}
                  value={formStep1.firstName}
                  onChange={handleChangeStep1}
                  placeholder="Votre prénom"
                />
              </div>
              {errorText("firstName") && (
                <p className={errorBase}>{errorText("firstName")}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className={labelBase}>CIN</label>
              <div className="relative">
                <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  name="cin"
                  type="text"
                  className={inputClass("cin")}
                  value={formStep1.cin}
                  onChange={handleChangeStep1}
                  placeholder="Votre CIN"
                />
              </div>
              {errorText("cin") && (
                <p className={errorBase}>{errorText("cin")}</p>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border  bg-slate-50 p-6 ">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Contact</h4>
              <p className="text-xs text-slate-500">
                Vérification email obligatoire par code OTP
              </p>
            </div>
          </div>

          <div>
            <label className={labelBase}>Adresse email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                name="email"
                type="email"
                className={inputClass("email")}
                value={formStep1.email}
                onChange={handleChangeStep1}
                placeholder="adresse-email@email.com"
              />
            </div>
            {errorText("email") && (
              <p className={errorBase}>{errorText("email")}</p>
            )}
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <EmailOTP
              email={formStep1.email}
              onStatusChange={setEmailOtpStatus}
              onTicket={setEmailTicket}
            />
          </div>
        </section>

        <section className="rounded-2xl border  bg-slate-50 p-6 ">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Parcours</h4>
              <p className="text-xs text-slate-500">
                Filière et niveau d’étude
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelBase}>Filière</label>
              <select
                name="filiere"
                className={selectClass("filiere")}
                value={formStep1.filiere}
                onChange={handleChangeStep1}
              >
                <option value="">Sélectionnez une filière</option>
                <option value="IG">Informatique de Gestion</option>
                <option value="GE">Génie électrique</option>
                <option value="CDL">
                  Conception et Développement logiciel
                </option>
                <option value="GRS">Gestion des Réseaux et Sécurité</option>
                <option value="commerce">Marketing Digital</option>
                <option value="ID">Ingénierie des Données</option>
                <option value="LCI">
                  Licence en Cybersécurité et Intelligence Artificielle
                </option>
              </select>
              {errorText("filiere") && (
                <p className={errorBase}>{errorText("filiere")}</p>
              )}
            </div>

            <div>
              <label className={labelBase}>Niveau</label>
              <select
                name="niveau"
                className={selectClass("niveau")}
                value={formStep1.niveau}
                onChange={handleChangeStep1}
              >
                <option value="">Sélectionnez un niveau</option>
                <option value="bac+1">Bac+1</option>
                <option value="bac+2">Bac+2</option>
              </select>
              {errorText("niveau") && (
                <p className={errorBase}>{errorText("niveau")}</p>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border bg-slate-50 p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Sécurité</h4>
              <p className="text-xs text-slate-500">
                Définissez un mot de passe sécurisé
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelBase}>Mot de passe</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={inputClass("password")}
                  value={formStep1.password}
                  onChange={handleChangeStep1}
                  placeholder="Créez un mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errorText("password") && (
                <p className={errorBase}>{errorText("password")}</p>
              )}
            </div>

            <div>
              <label className={labelBase}>Confirmer le mot de passe</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className={inputClass("confirmPassword")}
                  value={formStep1.confirmPassword}
                  onChange={handleChangeStep1}
                  placeholder="Confirmez le mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errorText("confirmPassword") && (
                <p className={errorBase}>{errorText("confirmPassword")}</p>
              )}
            </div>
          </div>
        </section>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
          <p className="text-sm leading-6 text-slate-600">
            Votre adresse email doit être vérifiée avant de passer à l’étape
            suivante. Toutes les informations doivent être exactes et
            cohérentes.
          </p>
        </div>

        <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Déjà un compte ?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-700 hover:underline"
            >
              Se connecter
            </Link>
          </p>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
          >
            Continuer
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupStep1;
