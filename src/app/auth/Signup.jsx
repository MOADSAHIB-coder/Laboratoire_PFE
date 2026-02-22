import { useState } from "react";
import { Link } from "react-router-dom";
import { BsExclamationCircleFill } from "react-icons/bs";

import Input from "../components/componentLongin/InputForm";
import {
  FormMessage,
  FormRulesBubble,
} from "../components/componentLongin/MessageForm";
import {
  Button,
  Select,
  filieres,
  niveaux,
} from "../components/componentLongin/ButonForm";

function Signup() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmation: "",
    filiere: "",
    niveau: "",
    cin: "",
  });

  //Marque comme non touché au début
  const [touched, setTouched] = useState({
    nom: false,
    prenom: false,
    email: false,
    password: false,
    confirmation: false,
    filiere: false,
    niveau: false,
    cin: false,
  });

  const [submitMessage, setSubmitMessage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [touchedTerms, setTouchedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [showRules, setShowRules] = useState(false);
  const [termsOpened, setTermsOpened] = useState(false);

  // Marquer champ touché
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  // Validation
  const validate = (Values) => {
    const newErrors = {};

    if (!Values.nom.trim()) newErrors.nom = "Veuillez saisir le nom";
    else if (form.nom.trim().length < 5) newErrors.nom = "Nom invalide";

    if (!Values.prenom.trim()) newErrors.prenom = "Veuillez saisir le prenom";
    else if (form.prenom.trim().length < 5)
      newErrors.prenom = "Prénom invalide";

    if (!Values.email.trim()) {
      newErrors.email = "Veuillez saisir l'adresse e-mail";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(Values.email.trim())) {
      newErrors.email = "Adresse E-mail invalide";
    }

    if (!Values.password.trim())
      newErrors.password = "Mot de passe obligatoire";
    else if (
      Values.password.length < 8 ||
      !/[A-Z]/.test(form.password) ||
      !/[a-z]/.test(form.password) ||
      !/[0-9]/.test(form.password) ||
      !/[^A-Za-z0-9]/.test(Values.password)
    ) {
      newErrors.password = "Le mot de passe invalide";
    }

    if (!Values.confirmation.trim())
      newErrors.confirmation = "Veuillez saisir la confirmation";
    else if (Values.confirmation !== Values.password)
      newErrors.confirmation = "Le mots de passe ne correspond pas";

    if (!Values.filiere) newErrors.filiere = "Filière vide";
    if (!Values.niveau) newErrors.niveau = "Niveau vide";
    if (!Values.cin.trim()) newErrors.cin = "Veuillez saisir le CIN";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.startsWith(" ")) return;
    setForm({ ...form, [name]: value });

    const newForm = { ...form, [name]: value };
    setForm(newForm);

    setTouched({ ...touched, [name]: true });

    const validationErrors = validate(newForm); //  validation live
    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    //Forcer les champ être comme touché pour afficher les erreurs
    setTouched({
      nom: true,
      prenom: true,
      email: true,
      password: true,
      confirmation: true,
      filiere: true,
      niveau: true,
      cin: true,
    });

    if (Object.keys(validationErrors).length === 0) {
      //Si les champs sont valides execute d'abord une action et nettoie le formulaire
      setForm({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        confirmation: "",
        filiere: "",
        niveau: "",
        cin: "",
      });
      setAcceptTerms(false);
      setTouchedTerms(false);

      setSubmitMessage("Inscription réussie !");
      console.log("Formulaire valide :", form);

      //si les champ sont valides champs devient a l'etat initiale non touche
      setTouched({
        nom: false,
        prenom: false,
        email: false,
        password: false,
        confirmation: false,
        filiere: false,
        niveau: false,
        cin: false,
      });
    } else {
      setSubmitMessage("Formulaire invalide");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="bg-blue-800 p-8 md:p-12 w-full md:w-1/2">
        <div className="md:mx-10 md:my-16 w-full max-w-1/2  text-center mx-4 my-8">
          <h1 className="text-white  md:text-3xl mt-10 font-medium">
            Bienvenu dans votre espace privé{" "}
          </h1>
          <p className="font-bold text-white text-3xl">ESTD-LabTechNet</p>
          <p className="md:text-xl text-white sm:text-lg p-8 font-medium">
            Créer votre compte et bénéficiez des services offerts par
            ESTD-LabTectNet
          </p>
        </div>

        <div className="flex justify-center items-center">
          <img
            src="/images/imgLogin.png"
            alt="Lab"
            className="w-full max-w-lg mx-auto h-auto object-cover"
          />
        </div>
      </div>

      <div className="relative  bg-white my-10  h-full">
        <div className="flex justify-center">
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">
              Créer votre compte
            </h2>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4 md:p-12 max-w-xl md:ml-20"
            >
              <div className="flex flex-col md:flex-row md:gap-8">
                {/* Nom */}
                <div className="relativeS">
                  <label className="block mb-1 text-gray-400">
                    Nom<span className="text-red-500">*</span>{" "}
                  </label>
                  <Input
                    type="text"
                    value={form.nom}
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      setShowRules(false);
                    }}
                    placeholder="Votre Nom"
                    minLength={5}
                    onFocus={() => setShowRules(true)}
                    errors={errors.nom}
                    isTouched={touched.nom}
                    name="nom"
                  />
                  {errors.nom && touched.nom && (
                    <div className="flex gap-1 items-center text-red-500 text-sm absolute">
                      <BsExclamationCircleFill className="inline text-red-500 mr-1" />
                      <FormMessage message={errors.nom} type="error" />
                    </div>
                  )}
                </div>
                <FormRulesBubble visible={showRules} errors={errors} />

                {/* Prénom */}
                <div className="relative">
                  <label className="block mb-1 text-gray-400">
                    Prénom<span className="text-red-500">*</span>{" "}
                  </label>
                  <Input
                    type="text"
                    value={form.prenom}
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      setShowRules(false);
                    }}
                    placeholder="Votre Prénom"
                    minLength={5}
                    onFocus={() => setShowRules(true)}
                    errors={errors.prenom}
                    isTouched={touched.prenom}
                    name="prenom"
                  />
                  {errors.prenom && touched.prenom && (
                    <div className="flex gap-1 items-center text-red-500 text-sm absolute">
                      <BsExclamationCircleFill className="inline text-red-500 mr-1" />
                      <FormMessage message={errors.prenom} type="error" />
                    </div>
                  )}
                </div>
              </div>

              {/* CIN */}
              <div className="relative">
                <label className="block mb-1 text-gray-400">
                  CIN<span className="text-red-500">*</span>{" "}
                </label>
                <Input
                  type="text"
                  value={form.cin}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    setShowRules(false);
                  }}
                  placeholder="Votre CIN"
                  errors={errors.cin}
                  minLength={4}
                  onFocus={() => setShowRules(true)}
                  isTouched={touched.cin}
                  name="cin"
                />
                {errors.cin && touched.cin && (
                  <div className="flex gap-1 items-center text-red-500 text-sm absolute">
                    <BsExclamationCircleFill className="inline text-red-500 mr-1" />
                    <FormMessage message={errors.cin} type="error" />
                  </div>
                )}
              </div>

              {/* Filière et Niveau */}
              <div className="flex flex-col md:flex-row md:gap-8">
                <div className="relative">
                  <label className="block mb-1 text-gray-400">
                    Filère<span className="text-red-500">*</span>{" "}
                  </label>
                  <Select
                    type="text"
                    value={form.filiere}
                    options={filieres}
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      setShowRules(false);
                    }}
                    onFocus={() => setShowRules(true)}
                    placeholder="Votre filière"
                    isTouched={touched.filiere}
                    name="filiere"
                  />
                  {errors.filiere && touched.filiere && (
                    <div className="flex gap-1 items-center text-red-500 text-sm absolute">
                      <BsExclamationCircleFill className="inline text-red-500 mr-1" />
                      <FormMessage message={errors.filiere} type="error" />
                    </div>
                  )}
                </div>

                {/*niveau d'etude*/}
                <div className="relative">
                  <label className="block mb-1 text-gray-400">
                    Niveau<span className="text-red-500">*</span>{" "}
                  </label>
                  <Select
                    type="text"
                    value={form.niveau}
                    onChange={handleChange}
                    options={niveaux}
                    onBlur={(e) => {
                      handleBlur(e);
                      setShowRules(false);
                    }}
                    placeholder="Votre niveau d'étude"
                    onFocus={() => setShowRules(true)}
                    isTouched={touched.niveau}
                    name="niveau"
                  />
                  {errors.niveau && touched.niveau && (
                    <div className="flex gap-1 items-center text-red-500 text-sm absolute">
                      <BsExclamationCircleFill className="inline text-red-500 mr-1" />
                      <FormMessage message={errors.niveau} type="error" />
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block mb-1 text-gray-400">
                  E-mail<span className="text-red-500">*</span>{" "}
                </label>
                <Input
                  type="e-mail"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    setShowRules(false);
                  }}
                  placeholder="Votre adresse e-mail"
                  minLength={5}
                  onFocus={() => setShowRules(true)}
                  errors={errors.email}
                  isTouched={touched.email}
                  name="email"
                />
                {errors.email && touched.email && (
                  <div className="flex gap-1 items-center text-red-500 text-sm absolute">
                    <BsExclamationCircleFill className="inline text-red-500 mr-1" />
                    <FormMessage message={errors.email} type="error" />
                  </div>
                )}
              </div>

              {/* Mot de passe */}
              <div className="relative">
                <label className="block mb-1 text-gray-400">
                  Mot de passe<span className="text-red-500">*</span>{" "}
                </label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    setShowRules(false);
                  }}
                  errors={errors.password}
                  placeholder="Mot de passe"
                  minLength={8}
                  onFocus={() => setShowRules(true)}
                  isTouched={touched.password}
                  name="password"
                />
                {errors.password && touched.password && (
                  <div className="flex gap-1 items-center text-red-500 text-sm absolute">
                    <BsExclamationCircleFill className="inline text-red-500 mr-1" />

                    <FormMessage message={errors.password} type="error" />
                  </div>
                )}
              </div>

              {/* Confirmation */}
              <div className="relative">
                <label className="block mb-1 text-gray-400">
                  Confirmation<span className="text-red-500">*</span>{" "}
                </label>
                <Input
                  type="password"
                  value={form.confirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirmez le mot de passe"
                  minLength={8}
                  isTouched={touched.confirmation}
                  name="confirmation"
                />
                {errors.confirmation && touched.confirmation && (
                  <div className="flex gap-1 items-center text-red-500 text-sm absolute">
                    <BsExclamationCircleFill className="inline text-red-500 mr-1" />
                    <FormMessage message={errors.confirmation} type="error" />
                  </div>
                )}
              </div>

              {/*Bouton pour accepter la validation de formulaire */}

              <div className="flex items-center pt-4 gap-2">
                <Input
                  type="checkbox"
                  name="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  onBlur={() => {
                    setTouchedTerms(true);
                    setTermsOpened(true);
                  }}
                  isTouched={touchedTerms}
                  disabled={!termsOpened}
                />

                <div className="flex gap-1">
                  <p flex>J'accepte les</p>
                  <span>
                    <Link
                      to="/politique"
                      className="text-blue-600 hover:underline cursor-pointer"
                      onClick={() => {
                        setTermsOpened(true);
                        setTouchedTerms(true);
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      conditions d'utilisation
                    </Link>
                  </span>
                </div>
              </div>

              {/* Bouton */}
              <Button type="submit" disabled={!acceptTerms}>
                S'inscrire
              </Button>
              {/* Message de soumission */}
              {submitMessage && (
                <FormMessage
                  message={submitMessage}
                  type={Object.keys(errors).length === 0 ? "success" : "error"}
                />
              )}
            </form>

            <p className=" text-center">
              Vous avez déjà un compte ?{" "}
              <Link
                className="text-blue-600 font-medium ml-1 hover:underline"
                to="/login"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
