import { useState } from "react";

import { Button } from "../components/componentLongin/ButonForm";
import Input from "../components/componentLongin/InputForm";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [step, setStep] = useState(1); // étape 1 ou 2
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const navigate = useNavigate();

  // Étape 1  bouton Suivant
  const handleNext = () => {
    setSubmitMessage("");
    if (!username.trim()) {
      setSubmitMessage("Veuillez saisir votre nom d'utilisateur");
      return;
    }
    setStep(2); // passe à l'étape 2
  };

  // Étape 2 bouton Se connecter
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitMessage("");

    if (!password.trim()) {
      setSubmitMessage("Veuillez saisir votre mot de passe");
      return;
    }

    //Appel backend puis on vide le champ
    setPassword(""); // On vide le champ mot de passe
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
            Authentifiez-vous et profitez des services de ESTD-LabTectNet
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
      <div className="flex justify-center w-full items-center min-h-screen md:w-1/2 bg-gray-50">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1">
                  Nom d'utilisateur
                </label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {submitMessage && (
                <p
                  className={`mb-4 ${
                    submitMessage.includes("prêt")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {submitMessage}
                </p>
              )}

              <Button onClick={handleNext}>Suivant</Button>
              <div className="md:py-4 py-2">
                <button
                  className={
                    " px-4 py-4 text-lg w-full rounded-lg bg-white  hover:bg-blue-600 hover:text-white  border-2 border-blue-500  text-blue-500 font-medium"
                  }
                  onClick={() => navigate(-1)}
                >
                  Retour
                </button>
              </div>
              <div>
                <p>
                  Déjà un compte?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {" "}
                    S'inscrire
                  </Link>
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1">Mot de passe</label>
                <Input
                  type="password"
                  name={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button classname={"rounded-lg"} type="submit">
                Se connecter
              </Button>

              {submitMessage && (
                <p
                  className={`mb-4 ${
                    submitMessage.includes("réussie")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {submitMessage}
                </p>
              )}
              <div className="md:py-4 py-2">
                <button
                  className={
                    " px-4 py-4 text-lg w-full rounded-lg bg-white  hover:bg-blue-600 hover:text-white  border-2 border-blue-500  text-blue-500 font-medium"
                  }
                  onClick={() => navigate(-1)}
                >
                  Retour
                </button>
              </div>
              <div>
                <p>
                  Mot de passe oublié?{" "}
                  <Link
                    to="/forgot-pass"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {" "}
                    Réinitialiser votre compte
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
