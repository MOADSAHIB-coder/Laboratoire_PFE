import { useState } from "react";
import { Link } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.startsWith(" ")) return;
    setForm({ ...form, [name]: value });
  };

  // Marquer champ touché
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!form.nom.trim()) newErrors.nom = "Veuillez saisir le nom";
    else if (form.nom.trim().length < 5) newErrors.nom = "Nom invalide";

    if (!form.prenom.trim()) newErrors.prenom = "Veuillez saisir le prenom";
    else if (form.prenom.trim().length < 5)
      newErrors.prenom = "Prénom invalide";

    if (!form.email.trim())
      newErrors.email = "Veuillez saisir l'adresse e-mail";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Email invalide";

    if (!form.password.trim()) newErrors.password = "Mot de passe obligatoire";
    else if (
      form.password.length < 8 ||
      !/[A-Z]/.test(form.password) ||
      !/[a-z]/.test(form.password) ||
      !/[0-9]/.test(form.password) ||
      !/[^A-Za-z0-9]/.test(form.password)
    ) {
      newErrors.password = "Le mot de passe invalide";
    }

    if (!form.confirmation.trim())
      newErrors.confirmation = "Veuillez saisir la confirmation";
    else if (form.confirmation !== form.password)
      newErrors.confirmation = "Le mots de passe ne correspond pas";

    if (!form.filiere) newErrors.filiere = "Veuillez saisir la filière";
    if (!form.niveau) newErrors.niveau = "Veuillez saisir le niveau";
    if (!form.cin.trim()) newErrors.cin = "Veuillez saisir le CIN";

    return newErrors;
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
    <div className="flex justify-end items-center min-h-screen bg-gray-50">
      <div className="md:flex ">
        <div className="md:mx-10 md:my-16 w-full max-7xl text-center ">
          <h1 className="text-blue-600 md:text-2xl mt-10 font-medium">
            Bienvenu dans votre espace privé{" "}
          </h1>
          <p className="font-bold text-blue-600 text-3xl">ESTD-LabTechNet</p>
          <p className="md:text-xl sm:text-lg p-8 font-medium">
            Créer votre compte et bénéficiez des services offerts par
            ESTD-LabTectNet
          </p>
        </div>

        <div className="relative w-full max-w-xl bg-white p-6 my-10 md:mx-10 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-8">
            Créer votre compte
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 my-8">
            <div className="md:flex md:gap-14">
              {/* Nom */}
              <div>
                <label className="block mb-1 text-gray-400">Nom</label>
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
                  <FormMessage message={errors.nom} type="error" />
                )}
              </div>
              {/* Prénom */}
              <div>
                <label className="block mb-1 text-gray-400">Prénom</label>
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
                  <FormMessage message={errors.prenom} type="error" />
                )}
              </div>
            </div>

            {/* CIN */}
            <div>
              <label className="block mb-1 text-gray-400">CIN</label>
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
                <FormMessage message={errors.cin} type="error" />
              )}
            </div>

            {/* Filière et Niveau */}
            <div className="md:flex md:gap-16">
              <div>
                <label className="block mb-1 text-gray-400">Filère</label>
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
                  <FormMessage message={errors.filiere} type="error" />
                )}
              </div>

              {/*niveau d'etude*/}
              <div>
                <label className="block mb-1 text-gray-400">Niveau</label>
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
                  <FormMessage message={errors.niveau} type="error" />
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-400">E-mail</label>
              <Input
                type="email"
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
                <FormMessage message={errors.email} type="error" />
              )}
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block mb-1 text-gray-400">Mot de passe</label>
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
                <FormMessage message={errors.password} type="error" />
              )}
            </div>

            {/* Confirmation */}
            <div>
              <label className="block mb-1 text-gray-400">Confirmation</label>
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
                <FormMessage message={errors.confirmation} type="error" />
              )}
            </div>

            {/*Bouton pour accepter la validation de formulaire */}
            <div className="flex md:my-5 ">
              <div className="my-5">
                <Input
                  type="checkbox"
                  name="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  onBlur={() => setTouchedTerms(true)}
                  isTouched={touchedTerms}
                />
              </div>
              <label className="block m-1 md:my-5 text-gray-600">
                Confirmez votre comptre{" "}
              </label>
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
          <FormRulesBubble visible={showRules} />
          <p className="m-6">
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
  );
}

export default Signup;
