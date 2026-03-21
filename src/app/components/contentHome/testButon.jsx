import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import DropdownMenu from "./Dropdown";

function HeaderHome() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Accueil", to: "/" },
    { name: "Formation", to: "/modifier-pass" },
    { name: "Services", to: "/services" },
    { name: "Contactez-nous", to: "/contactez-nous" },
    { name: "A propos", to: "/apropos" },
  ];

  const services = [
    { name: "Travaux pratiques", to: "/complete-profil" },
    { name: "Création de topologie", to: "/enseignant" },
    { name: "Configuration réseau", to: "/etudiant" },
    { name: "Création de TPs", to: "/about" },
  ];

  return (
    <header className="w-full flex items-center justify-between py-4 px-4 md:px-16 bg-white sticky top-0 z-50 shadow-md">
      <div className="font-bold text-2xl whitespace-nowrap">
        ESTD-LabTechNet
      </div>

      {/* Menu desktop */}
      <nav className="hidden md:flex items-center gap-6 font-bold">
        <Link className="px-3 py-1 hover:bg-gray-100 rounded" to="/">
          ACCUEIL
        </Link>

        <DropdownMenu title="SERVICES" items={services} />

        <Link
          className="px-3 py-1 hover:bg-gray-100 rounded"
          to="/contactez-nous"
        >
          CONTACTEZ-NOUS
        </Link>

        <Link className="px-3 py-1 hover:bg-gray-100 rounded" to="/apropos">
          A PROPOS
        </Link>
      </nav>

      {/* Boutons desktop */}
      <div className="hidden md:flex items-center gap-4">
        <NavLink
          to="/login"
          className="px-3 py-1 rounded text-blue-500 hover:text-blue-700 transition"
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

      {/* Hamburger mobile */}
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
        <div className="absolute top-full left-0 w-full bg-zinc-50 shadow-md md:hidden flex flex-col items-center gap-4 py-4">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 px-3 py-1 rounded"
                  : "hover:bg-gray-100 px-3 py-1 rounded"
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

export default HeaderHome;
