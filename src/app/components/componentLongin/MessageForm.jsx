import { PlayIcon } from "lucide-react";

export function FormMessage({ message, type }) {
  if (!message) return null;
  return (
    <p
      className={`text-sm  ${type === "error" ? "text-red-500" : "text-green-500"}`}
    >
      {message}
    </p>
  );
}
export function FormRulesBubble({ visible, errors }) {
  if (!visible) return null;

  return (
    <div className="absolute left-[-320px] top-10 w-80">
      {/* Coin pointu */}
      <PlayIcon className="absolute -right-3 bottom-2 w-3 h-3 text-black " />

      {/* Boîte */}
      <div className="bg-black text-white border border-gray-300 rounded-lg p-4 shadow-lg">
        <h4 className="font-semibold mb-2 text-gray-200">Conditions</h4>

        <ul className="text-sm space-y-1">
          <li className={errors.nom ? "text-red-500" : "text-gray-300"}>
            • Nom / Prénom : min 5 caractères
          </li>
          <li className={errors.email ? "text-red-500" : "text-gray-300"}>
            • Adresse e-mail valide
          </li>
          <li className={errors.password ? "text-red-500" : "text-gray-300"}>
            • Mot de passe doit avoir au moins :
            <ul className="ml-4 list-disc">
              <li
                className={errors.password ? "text-red-500" : "text-gray-400"}
              >
                8 caractères minimum
              </li>
              <li
                className={errors.password ? "text-red-500" : "text-gray-400"}
              >
                Au moins une majuscule
              </li>
              <li
                className={errors.password ? "text-red-500" : "text-gray-400"}
              >
                1 minuscule
              </li>
              <li
                className={errors.password ? "text-red-500" : "text-gray-400"}
              >
                1 chiffre
              </li>
              <li
                className={errors.password ? "text-red-500" : "text-gray-400"}
              >
                1 caractère spécial
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
