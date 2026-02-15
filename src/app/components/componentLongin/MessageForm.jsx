import { PlayIcon } from "lucide-react";

export function FormMessage({ message, type }) {
  if (!message) return null;
  return (
    <p
      className={`text-sm mt-1 ${type === "error" ? "text-red-500" : "text-green-500"}`}
    >
      {message}
    </p>
  );
}

export function FormRulesBubble({ visible }) {
  if (!visible) return null;

  return (
    <div className="absolute left-[-300px] bottom-10">
      {/* Coin pointu */}
      <PlayIcon className="absolute -right-3 bottom-2 w-3 h-3 text-white " />

      {/* Boîte */}
      <div className="w-72 bg-white texte-white border border-gray-300 rounded-lg p-4 shadow-lg">
        <h4 className="font-semibold mb-2 text-gray-700">Conditions</h4>

        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Tous les champs sont obligatoires</li>
          <li>• Nom / Prénom : min 5 caractères</li>
          <li>• Email valide</li>
          <li>• Mot de passe avoir au moins :</li>
          <ul className="ml-4 list-disc text-gray-500">
            <li>8 caractères minimum</li>
            <li>Au moins majuscule</li>
            <li>1 minuscule</li>
            <li>1 chiffre</li>
            <li>1 caractère spécial</li>
          </ul>
        </ul>
      </div>
    </div>
  );
}
