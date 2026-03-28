function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white flex flex-col md:flex-row md:items-center md:justify-between px-5 py-4">
      {" "}
      {/* <- laisse de la place pour la sidebar */}
      {/* Logo + titre */}
      <h1 className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-black uppercase tracking-wider mb-3 md:mb-0">
        <img
          src="/images/maroc.png"
          alt="Logo"
          className="w-8 sm:w-10 h-8 sm:h-10"
        />
        ESTD-LabTechNet
      </h1>
      {/* Formulaire de langue */}
      <div className="flex items-center justify-start md:justify-end w-full md:w-auto">
        <select className="border rounded px-3 py-2 bg-white cursor-pointer text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>Français</option>
          <option>Arabe</option>
          <option>Anglais</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
