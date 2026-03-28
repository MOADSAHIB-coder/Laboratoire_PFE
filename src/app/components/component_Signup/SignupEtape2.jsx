import { Link } from "react-router-dom";
import { MapPin, GraduationCap, ShieldCheck, BadgeCheck } from "lucide-react";
import CaptchaField from "../componentLongin/Captcha";

const SignupStep2 = ({
  formStep2,
  errors,
  handleChangeStep2,
  handleSubmit,
  handlePreviousStep,
  inputClass,
  selectClass,
  errorText,
  errorBase,
  labelBase,
  showRecaptcha,
  recaptchaValid,
  acceptTerms,
  setAcceptTerms,
  handleTermsClick,
  handleRecaptchaSuccess,
  isSubmitting,
}) => {
  const finalDisabled = isSubmitting || !recaptchaValid || !acceptTerms;

  return (
    <div className="animate-[fadeIn_.25s_ease]">
      <form id="signup-step2" onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800">
            Informations complémentaires
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Complétez votre profil avant de finaliser l’inscription. Les champs
            marqués <span className="font-semibold text-rose-600">*</span> sont
            obligatoires.
          </p>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/80 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Coordonnées</h4>
              <p className="text-xs text-slate-500">
                Informations de contact et de localisation
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelBase} htmlFor="localisation">
                Adresse <span className="text-rose-600">*</span>
              </label>
              <input
                id="localisation"
                name="localisation"
                type="text"
                className={inputClass("localisation")}
                value={formStep2.localisation}
                onChange={handleChangeStep2}
                placeholder="Dakhla - 73000"
              />
              {errorText("localisation") && (
                <span className={errorBase}>{errorText("localisation")}</span>
              )}
            </div>

            <div>
              <label className={labelBase} htmlFor="telephone">
                Téléphone <span className="text-rose-600">*</span>
              </label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                className={inputClass("telephone")}
                value={formStep2.telephone}
                onChange={handleChangeStep2}
                placeholder="+212..."
              />
              {errorText("telephone") && (
                <span className={errorBase}>{errorText("telephone")}</span>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/80 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Identité & scolarité
              </h4>
              <p className="text-xs text-slate-500">
                Informations académiques et administratives
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelBase} htmlFor="date_naissance">
                Date de naissance <span className="text-rose-600">*</span>
              </label>
              <input
                id="date_naissance"
                name="date_naissance"
                type="date"
                className={inputClass("date_naissance")}
                value={formStep2.date_naissance}
                onChange={handleChangeStep2}
              />
              {errorText("date_naissance") && (
                <span className={errorBase}>{errorText("date_naissance")}</span>
              )}
            </div>

            <div>
              <label className={labelBase} htmlFor="genre">
                Sexe <span className="text-rose-600">*</span>
              </label>
              <select
                id="genre"
                name="genre"
                className={selectClass("genre")}
                value={formStep2.genre}
                onChange={handleChangeStep2}
              >
                <option value="">Sélectionnez</option>
                <option value="masculin">Masculin</option>
                <option value="feminin">Féminin</option>
                <option value="autre">Non défini</option>
              </select>
              {errorText("genre") && (
                <span className={errorBase}>{errorText("genre")}</span>
              )}
            </div>

            <div>
              <label className={labelBase} htmlFor="matricule">
                Numéro de matricule <span className="text-rose-600">*</span>
              </label>
              <input
                id="matricule"
                name="matricule"
                type="text"
                className={inputClass("matricule")}
                value={formStep2.matricule}
                onChange={handleChangeStep2}
                placeholder="Votre matricule"
              />
              {errorText("matricule") && (
                <span className={errorBase}>{errorText("matricule")}</span>
              )}
            </div>

            <div>
              <label className={labelBase} htmlFor="ville">
                Ville <span className="text-rose-600">*</span>
              </label>
              <input
                id="ville"
                name="ville"
                type="text"
                className={inputClass("ville")}
                value={formStep2.ville}
                onChange={handleChangeStep2}
                placeholder="Dakhla"
              />
              {errorText("ville") && (
                <span className={errorBase}>{errorText("ville")}</span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className={labelBase} htmlFor="universite">
              Université <span className="text-rose-600">*</span>
            </label>
            <input
              id="universite"
              name="universite"
              type="text"
              className={inputClass("universite")}
              value={formStep2.universite}
              onChange={handleChangeStep2}
              placeholder="École Supérieure de Technologie - Dakhla"
            />
            {errorText("universite") && (
              <span className={errorBase}>{errorText("universite")}</span>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelBase}>
                Année universitaire <span className="text-rose-600">*</span>
              </label>
              <select
                name="annee_universitaire"
                className={selectClass("annee_universitaire")}
                value={formStep2.annee_universitaire}
                onChange={handleChangeStep2}
              >
                <option value="">Sélectionner</option>
                <option value="2026-2027">2026-2027</option>
                <option value="2027-2028">2027-2028</option>
                <option value="2028-2029">2028-2029</option>
              </select>
              {errorText("annee_universitaire") && (
                <span className={errorBase}>
                  {errorText("annee_universitaire")}
                </span>
              )}
            </div>

            <div>
              <label className={labelBase} htmlFor="semestre">
                Semestre <span className="text-rose-600">*</span>
              </label>
              <select
                id="semestre"
                name="semestre"
                className={selectClass("semestre")}
                value={formStep2.semestre}
                onChange={handleChangeStep2}
              >
                <option value="">Sélectionnez un semestre</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
                <option value="S4">S4</option>
              </select>
              {errorText("semestre") && (
                <span className={errorBase}>{errorText("semestre")}</span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className={labelBase} htmlFor="tuteur">
              Tuteur <span className="text-slate-400">(optionnel)</span>
            </label>
            <input
              id="tuteur"
              name="tuteur"
              type="text"
              className={inputClass("tuteur")}
              value={formStep2.tuteur}
              onChange={handleChangeStep2}
              placeholder="Nom du tuteur"
            />
            {errorText("tuteur") && (
              <span className={errorBase}>{errorText("tuteur")}</span>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Informations supplémentaires
              </h4>
              <p className="text-xs text-slate-500">
                Optionnel, mais recommandé pour enrichir le profil
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={labelBase} htmlFor="certification">
                Certification
              </label>
              <input
                id="certification"
                name="certification"
                type="text"
                className={inputClass("certification")}
                value={formStep2.certification}
                onChange={handleChangeStep2}
                placeholder="AWS, CCNA..."
              />
              {errorText("certification") && (
                <span className={errorBase}>{errorText("certification")}</span>
              )}
            </div>

            <div>
              <label className={labelBase} htmlFor="skills">
                Compétences
              </label>
              <input
                id="skills"
                name="skills"
                type="text"
                className={inputClass("skills")}
                value={formStep2.skills}
                onChange={handleChangeStep2}
                placeholder="React, Python..."
              />
              {errorText("skills") && (
                <span className={errorBase}>{errorText("skills")}</span>
              )}
            </div>

            <div>
              <label className={labelBase} htmlFor="linkedin">
                LinkedIn
              </label>
              <input
                id="linkedin"
                name="linkedin"
                type="url"
                className={inputClass("linkedin")}
                value={formStep2.linkedin}
                onChange={handleChangeStep2}
                placeholder="https://linkedin.com/in/..."
              />
              {errorText("linkedin") && (
                <span className={errorBase}>{errorText("linkedin")}</span>
              )}
            </div>

            <div>
              <label className={labelBase} htmlFor="github">
                GitHub
              </label>
              <input
                id="github"
                name="github"
                type="url"
                className={inputClass("github")}
                value={formStep2.github}
                onChange={handleChangeStep2}
                placeholder="https://github.com/..."
              />
              {errorText("github") && (
                <span className={errorBase}>{errorText("github")}</span>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/80 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Validation finale
              </h4>
              <p className="text-xs text-slate-500">
                Conditions d’utilisation et vérification captcha
              </p>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                disabled={!recaptchaValid}
                className="mt-1 h-4 w-4 accent-blue-600 disabled:cursor-not-allowed"
              />

              <p className="text-sm leading-6 text-slate-700">
                J’accepte les{" "}
                <Link
                  to="/politique"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleTermsClick}
                  className="font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                >
                  conditions d’utilisation
                </Link>
                .
              </p>
            </div>

            {!showRecaptcha ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Veuillez ouvrir les conditions d’utilisation pour afficher le
                captcha.
              </div>
            ) : (
              <div className="space-y-3">
                <CaptchaField onValidate={handleRecaptchaSuccess} />

                {!recaptchaValid && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    Veuillez valider le captcha pour activer la case
                    d’acceptation.
                  </div>
                )}

                {recaptchaValid && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    Captcha validé. Vous pouvez maintenant cocher l’acceptation
                    des conditions.
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
          <p className="text-sm leading-6 text-slate-700">
            Le formulaire ne pourra être finalisé qu’après remplissage correct
            des champs obligatoires, validation du captcha et acceptation des
            conditions d’utilisation.
          </p>
        </div>

        <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handlePreviousStep}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Retour
          </button>

          <button
            type="submit"
            disabled={finalDisabled}
            className={[
              "inline-flex items-center justify-center rounded-xl px-7 py-3 text-sm font-semibold text-white transition",
              finalDisabled
                ? "cursor-not-allowed bg-slate-300 shadow-none"
                : "bg-blue-600 shadow-lg shadow-blue-200 hover:bg-blue-700",
            ].join(" ")}
          >
            {isSubmitting ? "Inscription..." : "Finaliser"}
          </button>
        </div>

        {finalDisabled && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Le bouton <span className="font-semibold">Finaliser</span> reste
            désactivé tant que le captcha n’est pas validé et que les conditions
            ne sont pas acceptées.
          </div>
        )}
      </form>
    </div>
  );
};

export default SignupStep2;
