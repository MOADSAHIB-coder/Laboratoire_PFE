import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../api/API_Djando";
import SignupPanel from "../components/component_Signup/SignupPanelGauche";
import SignupStep1 from "../components/component_Signup/SignupEtape1";
import SignupStep2 from "../components/component_Signup/SignupEtape2";
import FormAlert from "../components/component_Signup/FormAlert";
import { useNavigate } from "react-router-dom";

import {
  validateBaseStep1,
  validateFullStep1,
  validateStep2,
} from "./utils_Signup/validateSignup";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [errors, setErrors] = useState({});
  const [nonFieldErrors, setNonFieldErrors] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailTicket, setEmailTicket] = useState(null);
  const [emailOtpStatus, setEmailOtpStatus] = useState("idle");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [recaptchaValid, setRecaptchaValid] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  const [formStep1, setFormStep1] = useState({
    firstName: "",
    lastName: "",
    cin: "",
    email: "",
    filiere: "",
    niveau: "",
    password: "",
    confirmPassword: "",
  });

  const [formStep2, setFormStep2] = useState({
    localisation: "",
    date_naissance: "",
    genre: "",
    matricule: "",
    ville: "",
    universite: "",
    semestre: "",
    annee_universitaire: "",
    tuteur: "",
    telephone: "",
    certification: "",
    skills: "",
    linkedin: "",
    github: "",
  });

  const labelBase = "mb-2 block text-sm font-semibold text-slate-700";
  const errorBase = "mt-1 text-xs font-medium text-rose-600";

  const inputClass = (field) =>
    `w-full rounded-xl border px-11 py-3.5 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 ${
      errors[field]
        ? "border-rose-500 bg-rose-50 focus:ring-4 focus:ring-rose-100"
        : "border-slate-300 bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
    }`;

  const selectClass = (field) =>
    `w-full rounded-xl border px-4 py-3.5 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 ${
      errors[field]
        ? "border-rose-500 bg-rose-50 focus:ring-4 focus:ring-rose-100"
        : "border-slate-300 bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
    }`;

  const errorText = (name) => errors?.[name];

  const applyBackendErrors = (data) => {
    setErrors({});
    setNonFieldErrors([]);

    const payload =
      data?.errors && typeof data.errors === "object" ? data.errors : data;

    if (!payload || typeof payload !== "object") {
      setNonFieldErrors(["Une erreur inattendue est survenue."]);
      return;
    }

    const nextFieldErrors = {};
    const nextNonField = [];

    const extractMessage = (value) => {
      if (typeof value === "string") return value;

      if (Array.isArray(value)) {
        const firstString = value.find((item) => typeof item === "string");
        if (firstString) return firstString;

        const firstObject = value.find(
          (item) => item && typeof item === "object" && !Array.isArray(item),
        );
        if (firstObject) {
          const nestedValue = Object.values(firstObject)[0];
          return extractMessage(nestedValue);
        }
      }

      if (value && typeof value === "object") {
        const firstKey = Object.keys(value)[0];
        if (firstKey) return extractMessage(value[firstKey]);
      }

      return null;
    };

    if (typeof payload.error === "string") nextNonField.push(payload.error);
    if (typeof payload.detail === "string") nextNonField.push(payload.detail);
    if (typeof payload.message === "string" && !payload.errors) {
      nextNonField.push(payload.message);
    }

    for (const [key, val] of Object.entries(payload)) {
      if (["error", "detail", "message"].includes(key)) continue;

      const msg = extractMessage(val);
      if (!msg) continue;

      if (
        key === "non_field_errors" ||
        key === "__all__" ||
        key === "email_ticket"
      ) {
        nextNonField.push(msg);
      } else {
        nextFieldErrors[key] = msg;
      }
    }

    setErrors(nextFieldErrors);
    setNonFieldErrors(nextNonField);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setErrors({});
    setNonFieldErrors([]);

    const baseErrors = validateBaseStep1(formStep1);
    if (Object.keys(baseErrors).length > 0) {
      setErrors(baseErrors);
      return;
    }

    if (emailOtpStatus !== "verified") {
      setErrors((prev) => ({
        ...prev,
        email: "Veuillez valider votre email pour continuer.",
      }));
      setNonFieldErrors([
        "Veuillez vérifier votre email (OTP) avant de continuer.",
      ]);
      return;
    }

    const fullErrors = validateFullStep1(formStep1);
    if (Object.keys(fullErrors).length > 0) {
      setErrors(fullErrors);
      return;
    }

    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
    setNonFieldErrors([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRecaptchaSuccess = (isValid) => {
    setRecaptchaValid(!!isValid);
    if (!isValid) setAcceptTerms(false);
  };

  const handleTermsClick = () => {
    setShowRecaptcha(true);
  };

  const handleChangeStep1 = (e) => {
    const { name, value } = e.target;

    setFormStep1((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setNonFieldErrors([]);

    if (name === "email") {
      setEmailOtpStatus("idle");
      setEmailTicket(null);
    }
  };

  const handleChangeStep2 = (e) => {
    const { name, value } = e.target;

    setFormStep2((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setNonFieldErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setNonFieldErrors([]);

    const step2Errors = validateStep2(formStep2);

    if (!recaptchaValid) {
      setNonFieldErrors([
        "Veuillez ouvrir les conditions d’utilisation puis valider le captcha avant de finaliser.",
      ]);
    }

    if (!acceptTerms) {
      setNonFieldErrors((prev) => [
        ...prev,
        "Veuillez accepter les conditions d’utilisation pour continuer.",
      ]);
    }

    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors);
    }

    if (
      Object.keys(step2Errors).length > 0 ||
      !recaptchaValid ||
      !acceptTerms
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!emailTicket) {
      setNonFieldErrors([
        "Veuillez vérifier votre email (OTP) avant de finaliser.",
      ]);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formStep1,
        ...formStep2,
        email_ticket: emailTicket,
        date_naissance: formStep2.date_naissance || null,
      };

      await api.post("etudiants/register/", payload);

      setSubmitSuccess(true);

      setTimeout(() => {
        navigate("/etudiant/dashboard");
      }, 3000);
    } catch (error) {
      const data = error?.response?.data;

      if (!data) {
        setNonFieldErrors([
          "Impossible de contacter le serveur. Vérifiez que Django tourne et que CORS est configuré.",
        ]);
      } else {
        applyBackendErrors(data);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const step1Fields = [
    "firstName",
    "lastName",
    "cin",
    "email",
    "filiere",
    "niveau",
    "password",
    "confirmPassword",
  ];

  const step2Fields = [
    "localisation",
    "date_naissance",
    "genre",
    "matricule",
    "ville",
    "universite",
    "semestre",
    "annee_universitaire",
    "tuteur",
    "telephone",
    "certification",
    "skills",
    "linkedin",
    "github",
  ];

  const currentStepFields = currentStep === 1 ? step1Fields : step2Fields;

  const fieldErrorMessages = Object.entries(errors)
    .filter(
      ([key, value]) =>
        currentStepFields.includes(key) &&
        typeof value === "string" &&
        value.trim() !== "",
    )
    .map(([, value]) => value);

  const globalMessages = [...nonFieldErrors, ...fieldErrorMessages].filter(
    (msg, index, arr) => msg && arr.indexOf(msg) === index,
  );

  const hasGlobalErrors = globalMessages.length > 0;

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_transparent_35%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff_45%,_#f8fafc)] px-4 text-slate-900">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 text-5xl text-white">
            ✓
          </div>

          <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-slate-900">
            Inscription réussie !
          </h1>

          <p className="leading-relaxed text-slate-600">
            Votre profil a été créé avec succès. Un email de confirmation a été
            envoyé à{" "}
            <span className="font-semibold text-slate-900">
              {formStep1.email}
            </span>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="min-h-screen flex">
        <SignupPanel />

        <main className="flex w-full items-center justify-center px-4 py-10 lg:w-[920px]">
          <div className="w-full max-w-[880px]">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-[0_25px_80px_rgba(15,23,42,0.10)] backdrop-blur-sm">
              <div className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-5">
                <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 py-5">
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900">
                      Créer un compte
                    </h2>
                    <p className="mt-1 text-sm font-medium text-slate-600">
                      Étape {currentStep}/2 • Vérification email avant de
                      continuer
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${
                        currentStep === 1
                          ? "bg-blue-600 text-white shadow-md"
                          : "border border-slate-300 bg-white text-slate-500"
                      }`}
                    >
                      1
                    </div>

                    <div
                      className={`h-1 w-12 rounded-full ${
                        currentStep >= 2 ? "bg-blue-600" : "bg-slate-200"
                      }`}
                    />

                    <div
                      className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${
                        currentStep === 2
                          ? "bg-blue-600 text-white shadow-md"
                          : "border border-slate-300 bg-white text-slate-500"
                      }`}
                    >
                      2
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-h-[78vh] overflow-y-auto px-6 py-6">
                {currentStep === 1 ? (
                  <SignupStep1
                    formStep1={formStep1}
                    errors={errors}
                    nonFieldErrors={nonFieldErrors}
                    handleChangeStep1={handleChangeStep1}
                    handleNextStep={handleNextStep}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                    setEmailOtpStatus={setEmailOtpStatus}
                    setEmailTicket={setEmailTicket}
                    inputClass={inputClass}
                    selectClass={selectClass}
                    errorText={errorText}
                    errorBase={errorBase}
                    labelBase={labelBase}
                  />
                ) : (
                  <SignupStep2
                    formStep2={formStep2}
                    errors={errors}
                    nonFieldErrors={nonFieldErrors}
                    handleChangeStep2={handleChangeStep2}
                    handleSubmit={handleSubmit}
                    handlePreviousStep={handlePreviousStep}
                    inputClass={inputClass}
                    selectClass={selectClass}
                    errorText={errorText}
                    errorBase={errorBase}
                    labelBase={labelBase}
                    showRecaptcha={showRecaptcha}
                    recaptchaValid={recaptchaValid}
                    acceptTerms={acceptTerms}
                    setAcceptTerms={setAcceptTerms}
                    handleTermsClick={handleTermsClick}
                    handleRecaptchaSuccess={handleRecaptchaSuccess}
                    isSubmitting={isSubmitting}
                  />
                )}

                {hasGlobalErrors && (
                  <div className="mt-8 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    <FormAlert errors={globalMessages} />
                  </div>
                )}

                <style>{`
                  @keyframes fadeIn {
                    from {
                      opacity: 0;
                      transform: translateY(8px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
              </div>
            </div>

            {currentStep === 1 && (
              <p className="mt-5 text-center text-xs text-slate-500">
                En créant un compte, vous acceptez nos{" "}
                <Link
                  to="/politique"
                  className="font-medium text-blue-700 hover:underline"
                >
                  conditions
                </Link>
                .
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Signup;
