import { useState } from "react";

import { Button } from "../components/componentLongin/ButonForm";
import Input from "../components/componentLongin/InputForm";
import { Link } from "react-router-dom";

function Login() {
  const [step, setStep] = useState(1); // étape 1 ou 2
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

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
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
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
            <Button type="submit">Se connecter</Button>
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
              <p
                onClick={() => setStep(1)}
                className="py-6  text-red-500  hover:text-gray-900 cursor-pointer select-none"
              >
                ← Retour
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
