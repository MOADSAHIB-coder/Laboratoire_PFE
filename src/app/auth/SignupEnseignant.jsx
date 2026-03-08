import { useState } from "react";
import {
  User,
  Mail,
  CreditCard,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Lock,
} from "lucide-react";
import EmailOTP from "./email_opt";
import { validateProfesseurForm } from "../components/component_Signup/validateProfesseur";

function InscriptionProfesseur() {
  const [formData, setFormData] = useState({
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
  });

  const [errors, setErrors] = useState({});
  const [emailStatus, setEmailStatus] = useState("idle");
  const [emailTicket, setEmailTicket] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleReset = () => {
    setFormData({
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
    });
    setErrors({});
    setEmailStatus("idle");
    setEmailTicket(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateProfesseurForm(formData);

    if (emailStatus !== "verified") {
      validationErrors.email = "Veuillez vérifier l'adresse email";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      ...formData,
      email_ticket: emailTicket,
    };

    console.log("Données prêtes à envoyer :", payload);

    // Exemple :
    // await api.post("professeurs/register/", payload);
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-10 md:px-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 px-8 py-10 text-white md:px-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium tracking-wide text-blue-100">
                Formulaire d’inscription académique
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Inscription d’un enseignant
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 md:text-base">
                Veuillez renseigner les informations personnelles,
                professionnelles et de sécurité de l'enseignant.
              </p>
            </div>

            <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <ShieldCheck className="h-8 w-8 text-blue-200" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-10 md:px-12 md:py-12">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-800">
              Informations de l'enseignant
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Tous les champs doivent être complétés avec des informations
              officielles et vérifiables.
            </p>
          </div>

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

              <EmailOTP
                email={formData.email}
                onStatusChange={setEmailStatus}
                onTicket={setEmailTicket}
              />
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
                  placeholder="EX: Réseaux et Télécommunications"
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
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Créez un mot de passe"
                  className={inputClass("password")}
                />
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
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmez le mot de passe"
                  className={inputClass("confirmPassword")}
                />
              </div>
              {errorText("confirmPassword")}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
            <p className="text-sm leading-6 text-slate-600">
              Le mot de passe doit respecter les règles de sécurité définies.
              L’adresse e-mail doit être validée par code OTP avant
              l’enregistrement final.
            </p>
          </div>

          <div className="mt-10 flex flex-col-reverse gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Réinitialiser
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              Enregistrer l'enseignant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InscriptionProfesseur;
