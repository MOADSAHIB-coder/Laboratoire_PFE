import { FaCheckCircle } from "react-icons/fa";

function SuccessModal({ onClose, type = "cours" }) {

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 flex flex-col items-center text-center space-y-4">
        
        <FaCheckCircle className="text-green-500 text-6xl" />
        
        <h2 className="text-2xl font-bold text-gray-800">
          {type.charAt(0).toUpperCase() + type.slice(1)} envoyé avec succès !
        </h2>
        
        <p className="text-gray-600">
          Votre {type} a été envoyé aux étudiants et est maintenant disponible.
        </p>
        
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
