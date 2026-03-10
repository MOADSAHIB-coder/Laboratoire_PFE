import {
  FaPhoneAlt,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

export function ReseauSocial() {
  const socials = [
    {
      icon: <FaInstagram size={18} />,
      href: "https://www.instagram.com",
      label: "Instagram",
    },
    {
      icon: <FaFacebook size={18} />,
      href: "https://www.facebook.com",
      label: "Facebook",
    },
    {
      icon: <FaLinkedin size={18} />,
      href: "https://www.linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <FaWhatsapp size={18} />,
      href: "https://wa.me/1234567890",
      label: "WhatsApp",
    },
  ];

  return (
    <div className="flex items-center gap-3">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-gray-800 text-gray-300 transition duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}

function FooterHome() {
  const aproposLinks = [
    { name: "Présentation générale", to: "/apropos#presentation" },
    { name: "Objectif du projet", to: "/apropos#objectif" },
    { name: "Contexte et motivation", to: "/apropos#contexte" },
    { name: "La vision du projet", to: "/apropos#vision" },
    { name: "Les valeurs du projet", to: "/apropos#valeurs" },
    { name: "Cadre du projet", to: "/apropos#cadre" },
    { name: "Équipe du projet", to: "/apropos#equipe" },
  ];

  const serviceLinks = [
    { name: "Les Projets et Devoirs", to: "/etudiant/projets-devoirs" },
    { name: "Réalisez vos Travaux Pratiques", to: "/etudiant/dashboard" },
    { name: "Accédez aux programmes", to: "/etudiant/mes-cours" },
    { name: "Suivez les étudiants", to: "/enseignant/tps-etudiant" },
    { name: "Créez les topologies", to: "/enseignant/dashboard" },
    { name: "Créez les Travaux Pratiques", to: "/enseignant/mes-travaux" },
    { name: "Recevez les Guides / Tutoriels", to: "/etudiant/dashboard" },
    { name: "Discutez en communauté", to: "/etudiant/discussion" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
            {/* Bloc marque */}
            <div className="xl:pr-6">
              <Link
                to="/"
                className="inline-block text-2xl font-bold tracking-wide text-white"
              >
                ESTD-LabTechNet
              </Link>

              <p className="mt-4 text-sm leading-7 text-gray-400">
                Une plateforme moderne dédiée aux travaux pratiques, aux
                ressources pédagogiques, à la collaboration et à
                l’accompagnement numérique des étudiants et enseignants.
              </p>

              <div className="mt-6">
                <ReseauSocial />
              </div>

              <div className="mt-8">
                <Link
                  to="/contactez-nous"
                  className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Contactez-nous
                </Link>
              </div>
            </div>

            {/* À propos */}
            <div>
              <h2 className="text-lg font-semibold text-white">
                À propos du projet
              </h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-blue-500" />

              <ul className="mt-6 space-y-3">
                {aproposLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 transition hover:pl-1 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link
                  to="/faq"
                  className="inline-block text-sm font-semibold text-blue-400 transition hover:text-blue-300 hover:underline"
                >
                  Consulter la FAQ
                </Link>
              </div>
              <div className="mt-6">
                <Link
                  to="/inscrit-prof"
                  className="inline-block text-sm font-semibold text-blue-400 transition hover:text-blue-300 hover:underline"
                >
                  Inscription professeur
                </Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-lg font-semibold text-white">Nos services</h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-blue-500" />

              <ul className="mt-6 space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 transition hover:pl-1 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact institution */}
            <div>
              <h2 className="text-lg font-semibold text-white">
                Université IBN ZOHR
              </h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-blue-500" />

              <ul className="mt-6 space-y-5 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <MdLocationOn size={20} className="mt-0.5 text-blue-400" />
                  <span>
                    École Supérieure de Technologie
                    <br />
                    EST - Dakhla
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <FaPhoneAlt size={16} className="text-blue-400" />
                  <span>+212 528 22 71 25</span>
                </li>

                <li>
                  <a
                    href="mailto:contact@uiz.ac.ma"
                    className="flex items-center gap-3 transition hover:text-white"
                  >
                    <MdEmail size={20} className="text-blue-400" />
                    <span>contact@uiz.ac.ma</span>
                  </a>
                </li>

                <li>
                  <a
                    href="http://estd.uiz.ac.ma/#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 transition hover:text-white hover:underline"
                  >
                    Site de l’École Supérieure de Technologie de Dakhla
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-5 md:px-10 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-gray-500 md:flex-row">
          <p>© 2026 LabTech-EST-D. Tous droits réservés.</p>

          <div className="flex items-center gap-4">
            <Link to="/apropos" className="transition hover:text-white">
              À propos
            </Link>
            <Link to="/faq" className="transition hover:text-white">
              FAQ
            </Link>
            <Link to="/contactez-nous" className="transition hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterHome;
