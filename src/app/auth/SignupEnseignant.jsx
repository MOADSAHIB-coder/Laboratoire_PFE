import { useState } from "react";
import {
  User,
  Mail,
  CreditCard,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Lock,
  CheckCircle2,
} from "lucide-react";

import api from "../api/API_Djando";
import { validateProfesseurForm } from "../components/component_Signup/validateProfesseur";
import { FiEye, FiEyeOff } from "react-icons/fi";

const GLOBAL_ERROR_KEYS = ["general", "non_field_errors", "detail"];

function InscriptionProfesseur() {
  const initialFormData = {
    nom: "",
    prenom: "",
    cin: "",
    email: "",
    specialite: "",
    titre: "",
    grade: "",
    profession: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const globalErrors = Object.entries(errors)
    .filter(([key, value]) => {
      if (!value) return false;
      return GLOBAL_ERROR_KEYS.includes(key);
    })
    .map(([_, value]) => value);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // on efface seulement l'erreur liée à ce champ
    setErrors((prev) => {
      const next = { ...prev, [name]: "" };
      return next;
    });

    setSuccessMessage("");
  };

  const resetFormOnly = () => {
    setFormData(initialFormData);
    setErrors({});
    setLoading(false);
  };

  const handleReset = () => {
    resetFormOnly();
    setSuccessMessage("");
  };

  const mapBackendErrors = (backendErrors) => {
    const formattedErrors = {};

    Object.keys(backendErrors).forEach((key) => {
      const value = backendErrors[key];

      if (Array.isArray(value)) {
        formattedErrors[key] = value[0];
      } else if (typeof value === "object" && value !== null) {
        const nestedKey = Object.keys(value)[0];
        formattedErrors[key] = Array.isArray(value[nestedKey])
          ? value[nestedKey][0]
          : "Une erreur est survenue lors de l'inscription";
      } else {
        formattedErrors[key] = value;
      }
    });

    return formattedErrors;
  };

  const normalizeBackendResponseErrors = (backendData) => {
    if (!backendData) {
      return {
        general: "Une erreur est survenue lors de l'inscription.",
      };
    }

    if (backendData.errors && typeof backendData.errors === "object") {
      return mapBackendErrors(backendData.errors);
    }

    if (backendData.error) {
      return { general: backendData.error };
    }

    if (backendData.detail) {
      return { detail: backendData.detail };
    }

    if (typeof backendData === "object" && !Array.isArray(backendData)) {
      return mapBackendErrors(backendData);
    }

    return {
      general: "Une erreur est survenue lors de l'inscription.",
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrors({});

    const validationErrors = validateProfesseurForm(formData);

    if (!formData.email?.trim()) {
      validationErrors.email = "Veuillez saisir une adresse email.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      ...formData,
    };

    try {
      setLoading(true);

      const response = await api.post("enseignants/register/", payload);

      setSuccessMessage(
        response?.data?.message || "Enseignant enregistré avec succès.",
      );

      resetFormOnly();
    } catch (error) {
      const backendData = error?.response?.data;
      const normalizedErrors = normalizeBackendResponseErrors(backendData);
      setErrors(normalizedErrors);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border px-11 py-3.5 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 ${
      errors[field]
        ? "border-rose-500 bg-rose-50 focus:ring-4 focus:ring-rose-100"
        : "border-slate-200 bg-slate-50/70 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
    }`;

  const selectClass = (field) =>
    `w-full rounded-xl border px-4 py-3.5 text-sm text-slate-700 shadow-sm outline-none transition ${
      errors[field]
        ? "border-rose-500 bg-rose-50 focus:ring-4 focus:ring-rose-100"
        : "border-slate-200 bg-slate-50/70 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
    }`;

  const errorText = (field) =>
    errors[field] ? (
      <p className="mt-1 text-xs font-medium text-rose-600">{errors[field]}</p>
    ) : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <section className="w-full  max-h-screen overflow-y-auto">
        <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 p-8 text-white md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-50">
                Inscription académique
              </p>

              <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Inscription d’un enseignant
              </h1>

              <p className="mt-4 text-sm leading-7 text-blue-50 md:text-base">
                Ce formulaire permet d’enregistrer un enseignant dans la
                plateforme ESTD-LabTechNet. Veuillez renseigner les informations
                personnelles, professionnelles et de sécurité avec précision
                afin de garantir un accès fiable, sécurisé et conforme aux
                exigences académiques.
              </p>

              <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-50">
                  Ce formulaire permet de :
                </h2>

                <ul className="mt-4 space-y-3 text-sm leading-6 text-blue-50">
                  <li>• enregistrer un enseignant</li>
                  <li>• renseigner les informations professionnelles</li>
                  <li>• créer un compte enseignant sécurisé</li>
                </ul>
              </div>

              <div className="mt-8 hidden h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 md:flex">
                <ShieldCheck className="h-8 w-8 text-blue-100" />
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-800">
                  Informations de l'enseignant
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Tous les champs doivent être complétés avec des informations
                  officielles, cohérentes et vérifiables.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {successMessage && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{successMessage}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Nom
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Entrez le nom"
                        className={inputClass("nom")}
                      />
                    </div>
                    {errorText("nom")}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Prénom
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        placeholder="Entrez le prénom"
                        className={inputClass("prenom")}
                      />
                    </div>
                    {errorText("prenom")}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      CIN
                    </label>
                    <div className="relative">
                      <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="cin"
                        value={formData.cin}
                        onChange={handleChange}
                        placeholder="Entrez le CIN"
                        className={inputClass("cin")}
                      />
                    </div>
                    {errorText("cin")}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Adresse e-mail
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="enseignant@universite.ma"
                        className={inputClass("email")}
                      />
                    </div>
                    {errorText("email")}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Spécialité
                    </label>
                    <div className="relative">
                      <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="specialite"
                        value={formData.specialite}
                        onChange={handleChange}
                        placeholder="Ex : Réseaux et Télécommunications"
                        className={inputClass("specialite")}
                      />
                    </div>
                    {errorText("specialite")}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Profession
                    </label>
                    <div className="relative">
                      <Briefcase className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        placeholder="Ex : Enseignant chercheur"
                        className={inputClass("profession")}
                      />
                    </div>
                    {errorText("profession")}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Titre
                    </label>
                    <select
                      name="titre"
                      value={formData.titre}
                      onChange={handleChange}
                      className={selectClass("titre")}
                    >
                      <option value="">Sélectionnez un titre</option>
                      <option value="M.">M.</option>
                      <option value="Mme">Mme</option>
                      <option value="Dr">Dr</option>
                      <option value="Pr">Pr</option>
                    </select>
                    {errorText("titre")}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Grade
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className={selectClass("grade")}
                    >
                      <option value="">Sélectionnez un grade</option>
                      <option value="PES">PES</option>
                      <option value="PH">PH</option>
                      <option value="PA">PA</option>
                      <option value="Doctorant">Doctorant</option>
                      <option value="Vacataire">Vacataire</option>
                      <option value="autre">Autres</option>
                    </select>
                    {errorText("grade")}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Créez un mot de passe"
                        className={inputClass("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    {errorText("password")}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Confirmer le mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirmez le mot de passe"
                        className={inputClass("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      >
                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    {errorText("confirmPassword")}
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
                  <p className="text-sm leading-6 text-slate-600">
                    Le mot de passe doit respecter les règles de sécurité
                    définies. Utilisez une adresse e-mail institutionnelle
                    valide.
                  </p>
                </div>

                {globalErrors.length > 0 && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {globalErrors.map((err, idx) => (
                      <p key={idx}>{err}</p>
                    ))}
                  </div>
                )}

                <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Réinitialiser
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "Enregistrement..." : "Enregistrer l'enseignant"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InscriptionProfesseur;
