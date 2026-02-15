import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/componentLongin/InputForm";
import { Button } from "../components/componentLongin/ButonForm";

function ReinilialiserMotDePasse() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage("Veuillez saisir votre e-mail");
      return;
    }

    // Ici  appel ton API pour envoyer le lien
    setMessage("Un lien de réinitialisation a été envoyé à votre e-mail !");
    setEmail("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md relative">
        <h2 className="text-2xl font-bold text-center mb-6">
          Réinitialiser votre mot de passe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">E-mail</label>
            <Input
              type="email"
              placeholder="Entrez votre adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {message && (
            <p
              className={`${
                message.includes("envoyé") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <Button type="submit" className="w-full">
            Envoyer le lien
          </Button>

          {/* Bouton Retour en haut à gauche */}
          <p
            onClick={() => navigate("/login")}
            title="Page connexion"
            className="left-3 py-6  text-red-500 hover:text-gray-900 cursor-pointer select-none"
          >
            ← Retour
          </p>
        </form>
      </div>
    </div>
  );
}

export default ReinilialiserMotDePasse;
