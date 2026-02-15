import {
  FaPhoneAlt,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

//fonction qui associe les liens aux icons reseaux sociaux
export function ReseauSocial() {
  return (
    <div style={{ display: "flex", gap: "15px" }}>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram size={40} color="#E1306C" />
      </a>
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook size={40} color="#1877F2" />
      </a>
      <a
        href="https://www.linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin size={40} color="#0A66C2" />
      </a>
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={40} color="#25D366" />
      </a>
    </div>
  );
}

//La section
function FooterHome() {
  return (
    <footer id="id-footer" className="bg-gray-900 text-gray-300 pt-6">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 md:px-8 lg:px-16 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            {/*A propos du projet */}
            <h2 className="text-white md:text-xl font-semibold mb-4">
              A propos de{" "}
              <span className="text-white md:text-xl font-bold mb-4">
                ESTD-LabTechNet
              </span>
            </h2>
            <div>
              <ul className="space-y-5 text-sm text-gray-400 md:pt-6">
                <li>
                  <Link className="hover:text-white  hover:underline" to="">
                    Présentation générale
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white  hover:underline" to="">
                    Ojectif du projet
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white  hover:underline" to="">
                    Contexte et motivation
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white  hover:underline" to="">
                    La vision du projet
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white  hover:underline" to="">
                    Les valeurs du projet
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white  hover:underline" to="">
                    Cadre du projet
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white  hover:underline" to="">
                    Equipe du projet
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-4 md:mt-8">
              <Link
                className="text-xl md:text-2xl font-bold  hover:underline"
                to="/faq"
              >
                {" "}
                FAQ
              </Link>
            </div>
          </div>

          {/*Nos services*/}
          <div>
            <h2 className="text-white md:text-xl font-semibold mb-4">
              Nos Services
            </h2>
            <ul className="space-y-5 text-sm text-gray-400 md:pt-6">
              <li>
                <Link
                  className="block text-sm hover:text-white  hover:underline"
                  to=""
                >
                  Consultez les Travaux Pratiques
                </Link>
              </li>
              <li>
                <Link
                  className="block text-sm hover:text-white  hover:underline"
                  to=""
                >
                  Réalisez vos Travaux Pratiques
                </Link>
              </li>
              <li>
                <Link
                  className="block text-sm hover:text-white  hover:underline"
                  to=""
                >
                  Accédez aux programmes
                </Link>
              </li>
              <li>
                <Link
                  className="block text-sm hover:text-white hover:underline"
                  to=""
                >
                  Suivez les etudiants
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:underline" to="">
                  Créez les topologies/Configurez résaux
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="">
                  {" "}
                  Créez les Travaux Pratiques
                </Link>
              </li>
              <li>
                <Link
                  className="block text-sm hover:text-white hover:underline"
                  to=""
                >
                  Recevez les Guides/Tutoriels
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  className="hover:text-white  hover:underline"
                  Discutez
                  en
                  communauté
                ></Link>
              </li>
            </ul>
          </div>
          {/*A propros de EST-D */}
          <div>
            <h2 className="text-white md:text-xl font-semibold mb-4">
              Université IBN-ZHOR
            </h2>

            <div>
              <ul className="space-y-5 text-sm text-gray-400  md:pt-6">
                <li>
                  <p className="flex items-center gap-2 text-sm text-gray-400 hline hover:text-white hover:underline focus:outline-none">
                    <MdLocationOn
                      size={30}
                      className="text-blue-400 flex-shrink-0"
                    />
                    Ecole Supérieure de Technologie EST - Dakhla
                  </p>
                </li>

                <li>
                  <p className="flex items-center gap-2 text-sm text-gray-400">
                    <FaPhoneAlt
                      size={30}
                      className="text-base flex-shrink-0 text-blue-400"
                    />{" "}
                    +212528227125
                  </p>
                </li>
                <li>
                  {" "}
                  <a
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white hover:underline"
                    href="mailto:contact@uiz.ac.ma"
                  >
                    <MdEmail
                      size={30}
                      className="text-base flex-shrink-0 text-blue-400"
                    />
                    contact@uiz.ac.ma
                  </a>
                </li>
                <li>
                  {" "}
                  <a
                    className="block text-sm hover:text-white hover:underline"
                    href="http://estd.uiz.ac.ma/#"
                  >
                    Site Ecole Supérieur de Technologie de Dakhla EST-D
                  </a>
                </li>
              </ul>
              {/*affiche les liens  reseaux sociaux sous forme d'icons facebook, instagramme...*/}
              <div className="mt-10">
                <ReseauSocial />
                <Link to="/contactez-nous">
                  <button className="w-full md:w-auto px-6 py-2 border   text-white  hover:bg-white hover:text-blue-600 transition mt-16">
                    Contactez-nous
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className=" border-t max-w-full text-center border-gray-50 pb-5"></div>
        <div className=" py-4 text-center text-sm p-4 text-gray-400">
          <div></div>© 2026 LabTech-EST-D | Tout droit reservé
        </div>
      </div>
    </footer>
  );
}

export default FooterHome;
