import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { FcSmartphoneTablet } from "react-icons/fc";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

function FooterHome() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="flex-auto space-y-2">
            <h2 className="text-lg font-semibold text-white">
              Information Globale
            </h2>
            <h2>LabTeCH</h2>
            <p className="text-sm text-gray-400">Année académique 2025-2026</p>
            <p className="text-sm text-gray-400">Projet universitaire</p>
            <p className="text-sm text-gray-400">
              Filère: Gestion des Réseaux et Sécurité
            </p>
            <p className="text-sm text-gray-400">
              Encadrante: Professeur Nawal Nassiri
            </p>
            <p className="text-sm text-gray-400">
              Equipe: MOAD SAHIB | MEME-LEKO Juste Glavany | FARAH LOUBNA
            </p>
          </div>
          <div className="flex-auto space-y-2">
            <h2 className="text-lg font-semibold text-white">
              Contactez l'université
            </h2>
            <p className="flex items-center gap-2 text-sm text-gray-400">
              <MdLocationOn className="text-base flex-shrink-0 text-blue-400" />
              Ecole Supérieur de Techonologie - Dakhla
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-400">
              <FaPhoneAlt className="text-base flex-shrink-0 text-blue-400" />{" "}
              +1 (123) 456-7890
            </p>
            <a
              className="flex items-center gap-2 text-sm text-blue-400 hover:underline"
              href=""
            >
              <MdEmail className="text-base flex-shrink-0 text-blue-400" />
              EST-Dahla.com
            </a>
            <a
              className="flex items-center gap-2 text-sm text-blue-400 hover:underline"
              href=""
            >
              <FaArrowRight className="text-lime-500" />
              Pour savoir plus
            </a>
          </div>
          <div className="flex-auto space-y-2">
            <h2 className="text-lg font-semibold text-white">
              Ressources/Liens
            </h2>
            <Link className="block text-sm hover:text-white" to="">
              Accueil
            </Link>
            <Link className="block text-sm hover:text-white" to="">
              A propos
            </Link>
            <Link className="block text-sm hover:text-white" to="">
              Accedez à vos Cours
            </Link>
            <Link className="block text-sm hover:text-white" to="">
              Allez au TP/ Guide/Tutoriel
            </Link>
            <a className="block text-sm hover:text-white" href="">
              Site Ecole Supérieur de Technologie de Dakhla EST-D
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © 2026 LabTech-EST-D | Tout droit reservé
      </div>
    </footer>
  );
}

export default FooterHome;
