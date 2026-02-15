import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/componentLongin/InputForm";
import { Button } from "../components/componentLongin/ButonForm";

function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error"); // "error" ou "success"
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    // Vérifier que le mot de passe n'est pas vide
    if (!password) {
      setMessage("Mot de passe obligatoire");
      setMessageType("error");
      return;
    }

    // Vérifier la correspondance des mots de passe
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      setMessageType("error");
      return;
    }

    // Vérifier la complexité du mot de passe
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      setMessage(
        "Le mot de passe doit comporter au minimum 8 caractères avec au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
      );
      setMessageType("error");
      return;
    }

    // Si tout est ok, on peut "réinitialiser" le mot de passe
    // Ici tu appellerais ton API : api.resetPassword(token, password)
    setMessage("Mot de passe réinitialisé avec succès !");
    setMessageType("success");

    // Vider les champs
    setPassword("");
    setConfirmPassword("");

    // Redirection vers login après 2 secondes
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Nouveau mot de passe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Mot de passe</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label>Confirmer le mot de passe</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Affichage du message */}
          {message && (
            <p
              className={
                messageType === "error" ? "text-red-500" : "text-green-600"
              }
            >
              {message}
            </p>
          )}

          <Button type="submit" className="w-full">
            Réinitialiser
          </Button>
        </form>
      </div>
    </div>
  );
}

export default NewPassword;
