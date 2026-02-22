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
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReinilialiserMotDePasse;
