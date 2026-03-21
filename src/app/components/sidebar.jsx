import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

function SideBar({
  val1,
  val2,
  val3,
  icon1,
  icon2,
  icon3,
  link1,
  link2,
  link3,
  link4,
  link5,
  link6,
  link7,
  link8,
}) {
  return (
    <aside className="w-[20vw] h-screen bg-white lg:p-0 shadow-md text-black flex flex-col p-6 fixed top-0 left-0 overflow-auto ">
      <div className="bg-white rounded-lg p-3 mb-6 sm:mb-8 flex flex-col items-center">
        <a href="http://estd.uiz.ac.ma/" target="{_blank}">
          <img
            src="/images/ESTD.png"
            alt="Logo ESTD"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover bg-[#E9F1F2] mb-2"
          />
        </a>
      </div>

      <ul className="flex flex-col flex-1 list-none p-0 m-0 space-y-2 sm:space-y-3">
        <NavLink
          to={link1}
          className={({
            isActive,
          }) => `flex items-center py-2 sm:py-3 px-4 sm:px-6 rounded-lg cursor-pointer text-gray-700 transition-colors duration-200 gap-3 sm:gap-4 
            ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-blue-100 hover:text-blue-600 hover:font-bold"}`}
        >
          <MdDashboard className="text-2xl text-black w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Dashboard</span>
        </NavLink>

        <NavLink
          to={link2}
          className={({
            isActive,
          }) => `flex items-center py-2 sm:py-3 px-4 sm:px-6 rounded-lg cursor-pointer text-gray-700 transition-colors duration-200 gap-3 sm:gap-4 
            ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-blue-100 hover:text-blue-600 hover:font-bold"}`}
        >
          <img src={icon1} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">{val1}</span>
        </NavLink>

        <NavLink
          to={link3}
          className={({
            isActive,
          }) => `flex items-center py-2 sm:py-3 px-4 sm:px-6 rounded-lg cursor-pointer text-gray-700 transition-colors duration-200 gap-3 sm:gap-4 
            ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-blue-100 hover:text-blue-600 hover:font-bold"}`}
        >
          <img src={icon2} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">{val2}</span>
        </NavLink>

        <NavLink
          to={link4}
          className={({
            isActive,
          }) => `flex items-center py-2 sm:py-3 px-4 sm:px-6 rounded-lg cursor-pointer text-gray-700 transition-colors duration-200 gap-3 sm:gap-4 
            ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-blue-100 hover:text-blue-600 hover:font-bold"}`}
        >
          <img src={icon3} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">{val3}</span>
        </NavLink>

        <NavLink
          to={link5}
          className={({
            isActive,
          }) => `flex items-center py-2 sm:py-3 px-4 sm:px-6 rounded-lg cursor-pointer text-gray-700 transition-colors duration-200 gap-3 sm:gap-4 
            ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-blue-100 hover:text-blue-600 hover:font-bold"}`}
        >
          <img
            src="/icons/discussion.png"
            alt=""
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          <span className="text-sm sm:text-base">Discussion</span>
        </NavLink>

        <NavLink
          to={link6}
          className={({
            isActive,
          }) => `flex items-center py-2 sm:py-3 px-4 sm:px-6 rounded-lg cursor-pointer text-gray-700 transition-colors duration-200 gap-3 sm:gap-4 
            ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-blue-100 hover:text-blue-600 hover:font-bold"}`}
        >
          <img
            src="/icons/statistique.png"
            alt=""
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          <span className="text-sm sm:text-base">Statistique</span>
        </NavLink>

        <NavLink
          to={link7}
          className={({
            isActive,
          }) => `flex items-center py-2 sm:py-3 px-4 sm:px-6 rounded-lg cursor-pointer text-gray-700 transition-colors duration-200 gap-3 sm:gap-4 
            ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-blue-100 hover:text-blue-600 hover:font-bold"}`}
        >
          <img
            src="/icons/parametres.png"
            alt=""
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          <span className="text-sm sm:text-base">Parametres</span>
        </NavLink>

        <NavLink
          to={link8}
          className={({
            isActive,
          }) => `flex items-center py-2 sm:py-3 px-4 sm:px-6 rounded-lg cursor-pointer text-gray-700 transition-colors duration-200 gap-3 sm:gap-4 
            ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-blue-100 hover:text-blue-600 hover:font-bold"}`}
        >
          <img
            src="/icons/profil.png"
            alt=""
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          <span className="text-sm sm:text-base">Pofil</span>
        </NavLink>

        <NavLink
          to="/"
          className="flex items-center py-3 px-6 rounded-lg cursor-pointer text-red-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm mt-auto"
        >
          <span className="text-sm sm:text-base">Déconnexion</span>
        </NavLink>
      </ul>
    </aside>
  );
}

export default SideBar;
