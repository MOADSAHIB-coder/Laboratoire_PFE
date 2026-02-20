import FooterHome from "../../../components/contentHome/footerHome";
import HeaderHome from "../../../components/contentHome/headerHome";
import Conclusion from "./conclusion";
import Introduction from "./intro";
import SectionAccesCours from "./sectionCoursTP";
import SectionDiscussion from "./sectionDiscussion";
import SectionEspace from "./sectionEspace";
import SectionGeneration from "./sectionGenererTP";
import SectionReseau from "./sectionReseau";
import SectionSuiviCorrection from "./setionSuiviCorrection";

function FonctonnaliteSite() {
  return (
    <div>
      <HeaderHome />{" "}
      <div className="flex min-h-screen bg-white">
        {/* Barre latérale fixe */}
        <nav className="w-64 bg-gray-200 p-6 rounded-l-lg sticky top-0 h-screen overflow-y-auto">
          <div className="pt-16 p-3">
            <h3 className="text-lg font-bold mb-4">Chapitres</h3>
            <ul className="space-y-2 " style={{ listStyleType: "upper-roman" }}>
              <li>
                <a
                  href="#introduction"
                  className="text-blue-700 hover:underline"
                >
                  Introduction générale
                </a>
              </li>
              <li>
                <a href="#cours" className="text-blue-700 hover:underline">
                  Accès aux cours et TPs
                </a>
              </li>
              <li>
                <a href="#tp" className="text-blue-700 hover:underline">
                  TP interactif
                </a>
              </li>
              <li>
                <a href="#reseau" className="text-blue-700 hover:underline">
                  Configuration réseau
                </a>
              </li>
              <li>
                <a href="#generation" className="text-blue-700 hover:underline">
                  Génération TP
                </a>
              </li>
              <li>
                <a href="#suivi" className="text-blue-700 hover:underline">
                  Suivi et correction
                </a>
              </li>
              <li>
                <a
                  href="#collaboration"
                  className="text-blue-700 hover:underline"
                >
                  Collaboration
                </a>
              </li>
              <li className="text-blue-700 hover:underline">
                <a href="#conclusion">Conclusion</a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Contenu principal */}
        <main className="flex-1 md:p-6 space-y-10">
          <Introduction />

          <h1 className="text-3xl font-bold mb-2 text-white  bg-blue-700  p-10">
            {" "}
            Les fonctionnalités principales de ESTD-LabTechNet et les sevices
            fournis
          </h1>
          <div className="grid md:grid-cols-1 md:gap-10 grid-cols-1 m-6 md:m-10">
            <SectionAccesCours />

            <SectionEspace />

            <SectionReseau />

            <SectionGeneration />

            <SectionSuiviCorrection />

            <SectionDiscussion />
          </div>
          <Conclusion />
        </main>
      </div>
      <FooterHome />
    </div>
  );
}

export default FonctonnaliteSite;
