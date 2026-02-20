import Input from "../../components/componentLongin/InputForm";
import { useState } from "react";
import { FormMessage } from "../../components/componentLongin/MessageForm";
import { Select } from "../../components/componentLongin/ButonForm";

import { filieres, niveaux } from "../../components/componentLongin/ButonForm";
import { BsExclamationCircleFill } from "react-icons/bs";

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
    ` focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-400 focus:ring-blue-500"
    }`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...form, [name]: value }));

    setErrors((prev) => {
      const newErrors = { ...prev };

      if (value.trim() !== "") {
        delete newErrors[name]; // enlève l'erreur quand corrigé
      }

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
      sujet: "",
      message: "",
      telephone: "",
    });

    setErrors({});
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex  justify-center items-center">
        <div className="max-w-4xl w-full p-6 bg-white my-10 rounded-lg ">
          <form onSubmit={handleSubmit}>
            <p>(*) Champs obligatoires</p>
            <div className="grid grid-cols-1 my-4 md:grid-cols-2 gap-6">
              <div>
                <label className="my-6">
                  Nom<span className="text-red-500">*</span> :
                </label>
                <Input
                  type="text"
                  name={"nom"}
                  value={form.nom}
                  required={true}
                  errors={errors.nom}
                  onChange={handleChange}
                  placeholder="votre nom"
                  className={`${inputClass("nom")} `}
                />
                {errors.nom && (
                  <div className="mt-1 flex gap-1 items-center">
                    <BsExclamationCircleFill className="inline text-red-500 mr-1" />

                    <FormMessage type={"error"} message={errors.nom} />
                  </div>
                )}
              </div>

              <div>
                <label className="my-6">
                  Prénom<span className="text-red-500">*</span> :
                </label>
                <Input
                  type="text"
                  name={"prenom"}
                  value={form.prenom}
                  errors={errors.prenom}
                  required={true}
                  onChange={handleChange}
                  placeholder={"Votre prenom"}
                  className={`${inputClass("prenom")} `}
                />

                {errors.prenom && (
                  <div className="mt-1 flex gap-1 items-center">
                    <BsExclamationCircleFill className="inline text-red-500 mr-1" />
                    <FormMessage type={"error"} message={errors.prenom} />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 my-6 md:grid-cols-2 gap-4">
              {" "}
              <div>
                <label className="my-6">
                  E-mail<span className="text-red-500">*</span> :
                </label>
                <Input
                  type="email"
                  name={"email"}
                  errors={errors.email}
                  value={form.email}
                  required={true}
                  onChange={handleChange}
                  placeholder={"Votre adresse e-mail"}
                  className={`${inputClass("email")} `}
                />
                {errors.email && (
                  <div className="mt-1 flex gap-1 items-center">
                    <BsExclamationCircleFill className="inline text-red-500 mr-1" />

                    <FormMessage type={"error"} message={errors.email} />
                  </div>
                )}
              </div>
              <div>
                <label className="my-6">
                  CIN<span className="text-red-500">*</span> :
                </label>
                <Input
                  type="text"
                  name={"cin"}
                  value={form.cin}
                  errors={errors.cin}
                  required={true}
                  onChange={handleChange}
                  placeholder={"Votre CIN"}
                  className={`${inputClass("cin")} `}
                />
                {errors.cin && (
                  <div className="mt-1 flex gap-1 items-center">
                    <BsExclamationCircleFill className="inline text-red-500 mr-1" />

                    <FormMessage type={"error"} message={errors.cin} />
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div>
                <label className="my-6">
                  Filière<span className="text-red-500">*</span> :
                </label>
                <Select
                  type="text"
                  name={"filiere"}
                  value={form.filiere}
                  errors={errors.filiere}
                  required={true}
                  options={filieres}
                  onChange={handleChange}
                  placeholder={"Votre filiere"}
                  className={`${inputClass("filiere")} `}
                />
                {errors.filiere && (
                  <div className="mt-1 flex gap-1 items-center">
                    <BsExclamationCircleFill className="inline text-red-500 mr-1" />

                    <FormMessage type={"error"} message={errors.filiere} />
                  </div>
                )}
              </div>
              <div>
                <label className="my-6">
                  Niveau<span className="text-red-500">*</span> :
                </label>
                <Select
                  type="text"
                  name={"niveau"}
                  value={form.niveau}
                  errors={errors.niveau}
                  options={niveaux}
                  required={true}
                  onChange={handleChange}
                  placeholder={"Votre niveau d'étude"}
                  className={`${inputClass("niveau")} `}
                />
                {errors.niveau && (
                  <div className="mt-1 flex gap-1 items-center">
                    <BsExclamationCircleFill className="inline text-red-500 mr-1" />

                    <FormMessage type={"error"} message={errors.niveau} />
                  </div>
                )}
              </div>
            </div>

            <div className="my-6">
              <label className="my-6">Téléphone</label>
              <Input
                type="text"
                name={"telephone"}
                value={form.telephone}
                onChange={handleChange}
                placeholder={"Votre numéro de téléphone"}
              />
            </div>

            <div className="my-6">
              <label>
                Objet<span className="text-red-500">*</span> :
              </label>
              <Input
                type="text"
                name={"sujet"}
                value={form.sujet}
                required={true}
                errors={errors.sujet}
                onChange={handleChange}
                placeholder={"Oject de votre message"}
              />
              {errors.sujet && (
                <div className="mt-1 flex gap-2 items-center">
                  <BsExclamationCircleFill className="inline text-red-500 mr-1" />

                  <FormMessage type={"error"} message={errors.sujet} />
                </div>
              )}
            </div>
            <div className="my-6">
              <label className="my-6">
                Message<span className="text-red-500">*</span> :
              </label>
              <textarea
                name="message"
                value={form.message}
                errors={errors.message}
                onChange={handleChange}
                placeholder="Votre message"
                className={`  ${inputClass("message")} w-full  px-3 py-3 h-40  border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.message && (
                <div className="mt-1 flex gap-1 items-center">
                  <BsExclamationCircleFill className="inline text-red-500 mr-1" />

                  <FormMessage type={"error"} message={errors.message} />
                </div>
              )}
            </div>
            <div className="text-center">
              {" "}
              {submitMessage && (
                <p
                  className={`mt-4 ${submitType === "error" ? "text-red-500" : "text-green-500"}`}
                >
                  {submitMessage}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactezNous;
