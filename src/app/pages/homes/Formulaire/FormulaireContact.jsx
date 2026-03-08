// ContactezNous.jsx
import Input from "../../../components/componentLongin/InputForm";
import { useState } from "react";
import {
  filieres,
  niveaux,
  Select,
} from "../../../components/componentLongin/ButonForm";
import { BsExclamationCircleFill } from "react-icons/bs";
import { FormMessage } from "../../../components/componentLongin/MessageForm";

function ContactezNous() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    filiere: "",
    niveau: "",
    cin: "",
    telephone: "",
    sujet: "",
    message: "",
  });

  const [submitMessage, setSubmitMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [submitType, setSubmitType] = useState("");

  const inputClass = (field) =>
    `focus:outline-none focus:ring-0 border-b-2 ${
      errors[field] ? "border-red-500" : "border-gray-400 focus:border-blue-700"
    }`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Supprimer l'erreur si champ corrigé
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (value.trim() !== "") delete newErrors[name];
      return newErrors;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.nom) newErrors.nom = "Votre nom est obligatoire";
    if (!form.prenom) newErrors.prenom = "Votre prénom est obligatoire";
    if (!form.email) newErrors.email = "Veuillez saisir votre adresse e-mail";
    if (!form.filiere) newErrors.filiere = "Votre filière est obligatoire";
    if (!form.niveau)
      newErrors.niveau = "Veuillez préciser votre niveau d'étude";
    if (!form.cin) newErrors.cin = "CIN obligatoire";
    if (!form.sujet)
      newErrors.sujet = "Veuillez préciser l'objet de votre message";
    if (!form.message) newErrors.message = "Message obligatoire";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSubmitMessage(
        "Veuillez corriger le formulaire avant de le soumettre.",
      );
      setSubmitType("error");
      return;
    }

    console.log("Formulaire soumis:", form);
    setSubmitMessage("Votre message a été envoyé avec succès !");
    setSubmitType("success");

    setTimeout(() => {
      setSubmitMessage("");
      setSubmitType("");
    }, 5000);

    setForm({
      nom: "",
      prenom: "",
      email: "",
      filiere: "",
      niveau: "",
      cin: "",
      telephone: "",
      sujet: "",
      message: "",
    });

    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <p className="text-gray-600 mb-4">(*) Champs obligatoires</p>

          {/* Nom et Prénom */}
          <div className="grid md:grid-cols-2 md:gap-16 mb-6">
            <div>
              <label className="block mb-1 font-medium">
                Nom <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                errors={errors.nom}
                className={inputClass("nom")}
              />
              {errors.nom && (
                <div className="flex items-center mt-1 text-red-500 gap-1">
                  <BsExclamationCircleFill />
                  <FormMessage type="error" message={errors.nom} />
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Prénom <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                errors={errors.prenom}
                className={inputClass("prenom")}
              />
              {errors.prenom && (
                <div className="flex items-center mt-1 text-red-500 gap-1">
                  <BsExclamationCircleFill />
                  <FormMessage type="error" message={errors.prenom} />
                </div>
              )}
            </div>
          </div>

          {/* Email et CIN */}
          <div className="grid md:grid-cols-2 md:gap-16  mb-6">
            <div>
              <label className="block mb-1 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                errors={errors.email}
                className={inputClass("email")}
              />
              {errors.email && (
                <div className="flex items-center mt-1 text-red-500 gap-1">
                  <BsExclamationCircleFill />
                  <FormMessage type="error" message={errors.email} />
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">
                CIN <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="cin"
                value={form.cin}
                onChange={handleChange}
                errors={errors.cin}
                className={inputClass("cin")}
              />
              {errors.cin && (
                <div className="flex items-center mt-1 text-red-500 gap-1">
                  <BsExclamationCircleFill />
                  <FormMessage type="error" message={errors.cin} />
                </div>
              )}
            </div>
          </div>

          {/* Filière et Niveau */}
          <div className="grid md:grid-cols-2 md:gap-16  mb-6">
            <div>
              <label className="block mb-1 font-medium">
                Filière <span className="text-red-500">*</span>
              </label>
              <Select
                name="filiere"
                value={form.filiere}
                onChange={handleChange}
                errors={errors.filiere}
                options={filieres}
                
              ></Select>
              {errors.filiere && (
                <div className="flex items-center mt-1 text-red-500 gap-1">
                  <BsExclamationCircleFill />
                  <FormMessage type="error" message={errors.filiere} />
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Niveau <span className="text-red-500">*</span>
              </label>
              <Select
                name="niveau"
                value={form.niveau}
                onChange={handleChange}
                errors={errors.niveau}
                options={niveaux}
                
              />
              {errors.niveau && (
                <div className="flex items-center mt-1 text-red-500 gap-1">
                  <BsExclamationCircleFill />
                  <FormMessage type="error" message={errors.niveau} />
                </div>
              )}
            </div>
          </div>

          {/* Téléphone */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">Téléphone</label>
            <Input
              type="text"
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              className={inputClass("telephone")}
            />
          </div>

          {/* Sujet */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">
              Objet <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="sujet"
              value={form.sujet}
              onChange={handleChange}
              errors={errors.sujet}
              className={inputClass("sujet")}
            />
            {errors.sujet && (
              <div className="flex items-center mt-1 text-red-500 gap-1">
                <BsExclamationCircleFill />
                <FormMessage type="error" message={errors.sujet} />
              </div>
            )}
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className={`${inputClass("message")} w-full px-3 py-2 border-b-2 focus:border-blue-700 focus:ring-0 rounded-none h-40`}
            />
            {errors.message && (
              <div className="flex items-center mt-1 text-red-500 gap-1">
                <BsExclamationCircleFill />
                <FormMessage type="error" message={errors.message} />
              </div>
            )}
          </div>

          {/* Message de soumission */}
          {submitMessage && (
            <p
              className={`mb-4 text-center font-medium ${
                submitType === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {submitMessage}
            </p>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="px-6 md:px-10 md:4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactezNous;
