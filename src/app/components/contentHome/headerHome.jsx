import { useState } from "react";
import { NavLink } from "react-router-dom";
import DropdownMenu from "./Dropdown";

function HeaderHome() {
  const [isOpen, setIsOpen] = useState(false);

  //liste des liens de la barre de navigation

  const links = [
    { name: "Accueil", to: "/" },
    { name: "Formation", to: "/modifier-pass" },
    { name: "Services", to: "/services" },
    { name: "Contactez-nous", to: "/contactez-nous" },
    { name: "A propos", to: "/apropos" },
  ];

  const services = [
    { name: "Travaux pratiques", to: "/apropos" },
    { name: "Création de topologie", to: "/services/maintenance" },
    { name: "Configuration réseau", to: "/services/formation" },
    { name: "Création de TPs", to: "/services/support" },
  ];
  const apropos = [
    { name: "Présentation générale", to: "/services/web" },
    { name: "Contexte et motivation", to: "/services/maintenance" },
    { name: "Les objectifs du projet", to: "/services/formation" },
    { name: "Nos visions et nos valeurs ", to: "/services/support" },
    { name: "Pubic concerné", to: "/services/formation" },
    { name: "Le cadre du projet", to: "/services/support" },
    { name: "L'équipe du projet", to: "/services/formation" },
  ];

  return (
    <header className="w-full mx-auto flex justify-between items-center py-6 px-4 md:px-16 bg-white sticky top-0 z-50 shadow-md">
      {/* Logo */}
      <div className="font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl">
        ESTD-LabTechNet
      </div>

      {/* Menu desktop */}
      <nav className="hidden md:flex gap-4 lg:gap-10 font-bold">
        <DropdownMenu title="ACCUIEL" items={services} />
        <DropdownMenu title="SERVICES" items={services} />
        <DropdownMenu title="CONTACTEZ-NOUS" items={services} />
        <DropdownMenu title="A PROPOS" items={apropos} />
      </nav>

      {/* Boutons desktop */}
      <div className="hidden md:flex gap-2 lg:gap-4">
        <NavLink
          to="/login"
          className="px-2 py-1 rounded text-blue-500 hover:text-blue-700 hover:border-gray-300 transition"
        >
          Connexion
        </NavLink>
        <NavLink
          to="/signup"
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
        >
          S'inscrire
        </NavLink>
      </div>

      {/* Hamburger menu mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </div>
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-full bg-zinc-50 shadow-md md:hidden flex flex-col items-center gap-4 py-4">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                isActive //Detecte le lien active
                  ? "text-blue-500 px-3 py-1 rounded transition"
                  : "hover:bg-gray-100 px-3 py-1 rounded transition"
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          <div className="flex gap-4 mt-2">
            <NavLink
              to="/login"
              className="px-2 py-1 rounded text-blue-500 hover:text-blue-700 hover:border-gray-300 transition"
              onClick={() => setIsOpen(false)}
            >
              Connexion
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              S'inscrire
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

export default HeaderHome;
