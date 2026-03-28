import { Link } from "react-router-dom";
import { useState } from "react";

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const etudiantLinks = [
    { name: "Dashboard", to: "/etudiant/dashboard" },
    { name: "Mes cours", to: "/etudiant/mes-cours" },
    { name: "Projets et devoirs", to: "/etudiant/projets-devoirs" },
    { name: "TPs", to: "/etudiant/tps" },
    { name: "Discussion", to: "/etudiant/discussion" },
    { name: "Statistique", to: "/etudiant/statistique" },
    { name: "Paramètres", to: "/etudiant/parametres" },
    { name: "Profil", to: "/etudiant/profil" },
  ];

  const enseignantLinks = [
    { name: "Dashboard", to: "/enseignant/dashboard" },
    { name: "Mes cours", to: "/enseignant/mes-cours" },
    { name: "Mes travaux", to: "/enseignant/mes-travaux" },
    { name: "TPs étudiant", to: "/enseignant/tps-etudiant" },
    { name: "Discussion", to: "/enseignant/discussion" },
    { name: "Statistique", to: "/enseignant/statistique" },
    { name: "Paramètres", to: "/enseignant/parametres" },
    { name: "Profil", to: "/enseignant/profil" },
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="px-3 py-1 hover:bg-gray-100 rounded font-bold">
        SERVICES
      </button>

      {isOpen && (
        <div
          className="
            absolute top-full left-1/2 -translate-x-1/2 
            w-screen bg-white/95 backdrop-blur-md shadow-2xl 
            border-t border-gray-200 z-50
          "
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* sur mobile: 1 colonne, à partir de md: 2 colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 place-items-center">
              {/* Étudiant */}
              <div className="w-full max-w-sm text-center">
                <Link
                  to="/etudiant/dashboard"
                  className="inline-block text-xl sm:text-2xl font-semibold tracking-wide text-gray-900 hover:text-blue-600 transition"
                >
                  Étudiant
                </Link>
                <div className="mt-3 mb-6 h-[2px] w-16 sm:w-24 bg-blue-500 mx-auto rounded-full" />

                <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                  {etudiantLinks.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.to}
                        className="text-gray-600 hover:text-blue-600 hover:underline underline-offset-4 decoration-blue-500 transition"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enseignant */}
              <div className="w-full max-w-sm text-center mt-8 md:mt-0">
                <Link
                  to="/enseignant/dashboard"
                  className="inline-block text-xl sm:text-2xl font-semibold tracking-wide text-gray-900 hover:text-blue-600 transition"
                >
                  Enseignant
                </Link>
                <div className="mt-3 mb-6 h-[2px] w-16 sm:w-24 bg-blue-500 mx-auto rounded-full" />

                <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                  {enseignantLinks.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.to}
                        className="text-gray-600 hover:text-blue-600 hover:underline underline-offset-4 decoration-blue-500 transition"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
