import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import DropdownMenu from "./Dropdown";

function HeaderHome() {
  // état pour ouvrir/fermer le menu mobile
  const [isOpen, setIsOpen] = useState(false);

  // état pour ouvrir/fermer la fenêtre modal de connexion
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // liens du menu mobile
  const links = [
    { name: "Accueil", to: "/" },
    { name: "Formation", to: "/modifier-pass" },
    { name: "Services", to: "/services" },
    { name: "Contactez-nous", to: "/contactez-nous" },
    { name: "A propos", to: "/apropos" },
  ];

  // routes pour les rôles de connexion

  const loginRoutes = [
    { name: "Étudiant", to: "/connexion/etudiant" },
    { name: "Admin", to: "/connexion/admin" },
    { name: "Enseignant", to: "/connexion/enseignant" },
  ];

  return (
    <>
      {/* HEADER PRINCIPAL */}
      <header className="w-full flex items-center justify-between py-4 px-4 md:px-16 bg-white sticky top-0 z-50 shadow-md">
        {/* LOGO */}
        <div className="font-bold text-2xl whitespace-nowrap">
          ESTD-LabTechNet
        </div>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-6 font-bold">
          <Link className="px-3 py-1 hover:bg-gray-100 rounded" to="/">
            ACCUEIL
          </Link>

          <DropdownMenu title="SERVICES" />

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

        {/* BOUTONS DESKTOP */}
        <div className="hidden md:flex items-center gap-4">
          {/* BOUTON CONNEXION
             ouvre la fenêtre modal */}
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-3 py-1 rounded text-blue-500 hover:text-blue-700 transition"
          >
            Connexion
          </button>

          {/* bouton inscription */}
          <NavLink
            to="/signup"
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
          >
            S'inscrire
          </NavLink>
        </div>

        {/* MENU HAMBURGER MOBILE */}
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

        {/* MENU MOBILE */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-zinc-50 shadow-md md:hidden flex flex-col items-center gap-4 py-4">
            {/* génération automatique des liens */}
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className="hover:bg-gray-100 px-3 py-1 rounded"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            {/* bouton connexion mobile */}
            <button
              onClick={() => {
                setIsLoginModalOpen(true);
                setIsOpen(false);
              }}
              className="px-3 py-1 text-blue-500"
            >
              Connexion
            </button>
          </div>
        )}
      </header>

      {/* ========================= */}
      {/* MODAL CONNEXION */}
      {/* ========================= */}

      {isLoginModalOpen && (
        /* fond sombre derrière la fenêtre */
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          /* fermer la modal si on clique dehors */
          onClick={() => setIsLoginModalOpen(false)}
        >
          {/* fenêtre principale */}
          <div
            className="bg-white w-full max-w-sm rounded-xl p-6 shadow-xl relative"
            /* empêche la fermeture si on clique dans la fenêtre */
            onClick={(e) => e.stopPropagation()}
          >
            {/* bouton fermer */}
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* titre */}
            <h2 className="text-center text-lg font-bold mb-6">
              Se connecter en tant :
            </h2>

            {/* boutons des rôles */}
            <div className="flex flex-col gap-3">
              {/* création automatique des boutons */}
              {loginRoutes.map((role) => (
                <NavLink
                  key={role.name}
                  to={role.to}
                  /* fermer la modal après clic */
                  onClick={() => setIsLoginModalOpen(false)}
                  className="border border-gray-200 rounded-lg py-2 text-center hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  {role.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderHome;
