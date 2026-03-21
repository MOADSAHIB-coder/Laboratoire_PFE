import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function SideBarAdmin({ menu }) {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  // Ouvrir automatiquement la section qui contient l’URL active
  useEffect(() => {
    const parentIndex = menu.findIndex(
      (item) =>
        Array.isArray(item.children) &&
        item.children.some((child) => location.pathname.startsWith(child.link)),
    );
    if (parentIndex !== -1) {
      setOpenMenu(parentIndex);
    }
  }, [location.pathname, menu]);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-[260px] bg-slate-50/80 backdrop-blur border-r border-slate-200 px-4 py-6 flex flex-col z-20">
      {/* Carte principale */}
      <div className="rounded-3xl border border-slate-200 bg-white/95 shadow-sm flex flex-col h-full">
        {/* Header / logo */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center gap-3">
          <a
            href="http://estd.uiz.ac.ma/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-12 w-12 rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden"
          >
            <img
              src="/images/ESTD.png"
              alt="Logo ESTD"
              className="h-10 w-10 object-contain"
            />
          </a>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-600">
              Espace admin
            </p>
            <p className="text-sm font-semibold text-slate-800">
              Supervision & gestion
            </p>
          </div>
        </div>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1.5">
            {menu.map((item, index) => {
              const Icon = item.icon;
              const hasChildren =
                Array.isArray(item.children) && item.children.length > 0;
              const isOpen = openMenu === index;

              // Bouton “section” pour les items avec sous‑menus
              const SectionButton = (
                <button
                  type="button"
                  onClick={() => hasChildren && toggleMenu(index)}
                  className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition
                    ${
                      hasChildren
                        ? isOpen
                          ? "bg-blue-50/80 text-blue-700"
                          : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                    }`}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm transition
                      ${
                        isOpen
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                      }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );

              // Lien direct (sans sous-menu)
              const DirectLink = (
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition
                    ${
                      isActive
                        ? "bg-blue-50/80 text-blue-700"
                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm transition
                          ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                          }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </>
                  )}
                </NavLink>
              );

              return (
                <li key={index}>
                  {hasChildren ? SectionButton : DirectLink}

                  {/* Sous-menu */}
                  {hasChildren && (
                    <div
                      className={`overflow-hidden transition-[max-height,opacity] duration-200 ${
                        isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="mt-1.5 space-y-0.5 pl-3 border-l border-slate-100">
                        {item.children.map((child, i) => {
                          const ChildIcon = child.icon;
                          return (
                            <li key={i}>
                              <NavLink
                                to={child.link}
                                className={({ isActive }) =>
                                  `flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition
                                  ${
                                    isActive
                                      ? "bg-blue-50 text-blue-700"
                                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                                  }`
                                }
                              >
                                {({ isActive }) => (
                                  <>
                                    {/* Barre indicatrice à gauche */}
                                    <span
                                      className={`h-7 w-0.5 rounded-full bg-blue-500 mr-1 transition-opacity ${
                                        isActive ? "opacity-100" : "opacity-0"
                                      }`}
                                    />
                                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-blue-500">
                                      <ChildIcon size={14} />
                                    </span>
                                    <span>{child.label}</span>
                                  </>
                                )}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Déconnexion */}
        <div className="px-4 pb-4 pt-3 border-t border-slate-100">
          <NavLink
            to="/"
            className="flex items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50/80 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100 hover:border-red-200 transition"
          >
            Déconnexion
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

export default SideBarAdmin;
