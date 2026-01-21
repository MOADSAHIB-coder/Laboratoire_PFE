import { Link } from "react-router-dom";

function SideBar({ val1, val2, val3, icon1, icon2, icon3, link1, link2, link3}) {

  return (
    <aside className="w-[20rem] h-[100vh] bg-white-50 text-black flex flex-col p-[1rem] fixed ">
      
      <div className="bg-white rounded-[8%] h-[35vh] p-3 mb-12">
        <a href="http://estd.uiz.ac.ma/" target="{_blank}"><img
          src={'/images/ESTD.png'}
          alt="Not found"
          className="w-[6.3rem] h-[6.3rem] rounded-full object-cover bg-[#E9F1F2] ml-[4.8rem]"
        /></a>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-2">
            <span className="font-semibold text-gray-900">École Supérieure de Technologie de Dakhla</span>{" "}
            <span className="text-gray-500">(ESTD)</span> — établissement d’enseignement supérieur offrant des formations technologiques et professionnelles, axé sur le développement des compétences pratiques en informatique, réseaux et nouvelles technologies.
        </p>

      </div>

      <ul className="flex-1 list-none mb-[5.2rem] p-0 m-0 bg-white rounded-3xl">
        <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src="/icons/accueil.png" alt="" className="w-6 h-6" />
            <Link to='/etudiant'><span className="font-medium text-base">Dashboard</span></Link>
        </li>

        <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src={icon1} alt="" className="w-6 h-6" />
            <Link to={link1}><span className="font-medium text-base">{val1}</span></Link>            
        </li>

        <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src={icon2} alt="" className="w-6 h-6" />
            <Link to={link2}><span className="font-medium text-base">{val2}</span></Link>
        </li>

        <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src={icon3} alt="" className="w-6 h-6" />
            <Link to={link3}><span className="font-medium text-base">{val3}</span></Link>
        </li>
        <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src="/icons/discussion.png" alt="" className="w-6 h-6" />
            <Link to='/etudiant/discussion'><span className="font-medium text-base">Discussion</span></Link>
        </li>
        <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src="/icons/statistique.png" alt="" className="w-6 h-6" />
            <Link to='/etudiant/statistique'><span className="font-medium text-base">Statistique</span></Link>
        </li>
        <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src="/icons/parametres.png" alt="" className="w-6 h-6" />
            <Link to='/etudiant/parametres'><span className="font-medium text-base">Parametres</span></Link>
        </li>
        <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src="/icons/profil.png" alt="" className="w-6 h-6" />
            <Link to='/etudiant/profil'><span className="font-medium text-base">Pofil</span></Link>
        </li>
      </ul>
    </aside>
  )
}

export default SideBar
