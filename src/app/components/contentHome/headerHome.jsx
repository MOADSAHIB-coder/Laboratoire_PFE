import { Link } from "react-router-dom";

function HeaderHome() {
  return (
    <header className="flex justify-between items-center py-6 px-4 md:px-16 bg-zinc-50 top-0 z-50 text-black shadow-md sticky">
      <div className="font-bold text-3xl">LabTeCH</div>
      <nav className="hidden md:flex gap-6 font-bold">
        <Link to="/" className="hover:bg-blue-500 px-3 py-1 rounded transition">
          Home
        </Link>
        <Link to="/" className="hover:bg-blue-500 px-3 py-1 rounded transition">
          Accueil
        </Link>
        <Link to="/" className="hover:bg-blue-500 px-3 py-1 rounded transition">
          A propos
        </Link>
        <Link to="/" className="hover:bg-blue-500 px-3 py-1 rounded transition">
          Services
        </Link>
        <Link to="/" className="hover:bg-blue-500 px-3 py-1 rounded transition">
          Contact
        </Link>
      </nav>
      <div className="flex gap-4">
        <Link to="/">
          <button className="border border-white px-4 py-1 rounded hover:bg-white hover:text-blue-600 transition">
            Connexion
          </button>
        </Link>
        <Link to="/">
          <button className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition">
            S'inscrire
          </button>
        </Link>
      </div>
    </header>
  );
}

export default HeaderHome;
