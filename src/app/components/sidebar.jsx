import { Link } from "react-router-dom";

function SideBar({ val1, val2, val3, icon1, icon2, icon3, link1, link2, link3}) {

  return (
    <aside className="w-[20rem] h-[100vh]  bg-white shadow-md text-black flex flex-col p-[1rem] fixed ">
      
      <div className="bg-white rounded-[8%] h-[35vh] p-3 mb-12">
        <a href="http://estd.uiz.ac.ma/" target="{_blank}"><img
          src={'/images/ESTD.png'}
          alt="Not found"
          className="w-[6.3rem] h-[6.3rem] rounded-full object-cover bg-[#E9F1F2] ml-[4.8rem]"
        /></a>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-2 text-justify">
            <span className="font-semibold text-gray-900">École Supérieure de Technologie de Dakhla</span>{" "}
            <span className="text-gray-500">(ESTD)</span> — <i>ESTD-LABTECHNET</i> est une plateforme de laboratoire virtuel sécurisé dédiée à l’apprentissage des réseaux informatiques et à la supervision des activités pédagogiques, conçue pour évoluer vers d’autres domaines de l’informatique.
        </p>

      </div>

      <ul className="flex-1 list-none mb-[5.2rem] p-0 m-0 bg-white rounded-3xl">
        <Link to='/etudiant'>
          <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src="/icons/accueil.png" alt="" className="w-4 h-4" />
            <span className="font-medium text-base">Dashboard</span>
          </li>
        </Link>

        <Link to={link1}>
          <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src={icon1} alt="" className="w-4 h-4" />
            <span className="font-medium text-base">{val1}</span>           
          </li>
        </Link> 

        <Link to={link2}>
          <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src={icon2} alt="" className="w-4 h-4" />
            <span className="font-medium text-base">{val2}</span>
          </li>
        </Link>

        <Link to={link3}>
          <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src={icon3} alt="" className="w-4 h-4" />
            <span className="font-medium text-base">{val3}</span>
          </li>
        </Link>

        <Link to='/etudiant/discussion'>
          <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src="/icons/discussion.png" alt="" className="w-4 h-4" />
            <span className="font-medium text-base">Discussion</span>
          </li>
        </Link>

        <Link to='/etudiant/statistique'>
          <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src="/icons/statistique.png" alt="" className="w-4 h-4" />
            <span className="font-medium text-base">Statistique</span>
          </li>
        </Link>

        <Link to='/etudiant/parametres'>
          <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src="/icons/parametres.png" alt="" className="w-4 h-4" />
            <span className="font-medium text-base">Parametres</span>
          </li>
        </Link>

        <Link to='/etudiant/profil'>
          <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <img src="/icons/profil.png" alt="" className="w-4 h-4" />
            <span className="font-medium text-base">Pofil</span>
        </li>
        </Link>

        <Link to=''>
          <li className="flex items-center py-3 px-6 mb-2 rounded-lg cursor-pointer text-red-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out gap-4 shadow-sm">
            <span className="font-medium text-base">Déconnexion</span>
        </li>
        </Link>

      </ul>
    </aside>
  )
}

export default SideBar
