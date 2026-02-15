import FooterHome from "../footerHome";
import HeaderHome from "../headerHome";
import { ButtonPreview } from "./buttonRotaiton";
import Contexte from "./contexte_motivation";
import AfficherProfils from "./equipes";
import SectionObjectif from "./objectifSection";
import Public from "./sectionCadreProjet";

import { NosValeurs, VisionSection } from "./sectionVision";

function About() {
  return (
    <div className="overflow-x-hidden">
      <HeaderHome />
      <div className="flex flex-col">
        <hr className="w-full h-2 bg-blue-700" />
        <hr className="w-full h-1 mt-0 bg-blue-500" />
      </div>

      <section className="relative w-full min-h-[30.5vh] ">
        <div className="static lg:absolute lg:inset-y-0 lg:left-0 bg-white p-5 lg:h-[30.5vh]">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-blue-500">
            À propos
          </h1>
        </div>
      </section>

      <section className="relative mx-auto max-w-screen-xl lg:mr-10 px-4">
        <div
          className="
            w-full max-w-2xl bg-white p-8 shadow-xl z-50
            static mt-8 
            lg:absolute lg:-mt-[15vh] lg:right-0 
          "
        >
          <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-blue-700">
            Présentation Générale
          </h2>
          <div className="p-6   text-lg">
            <ButtonPreview
              preview={` 
              ESTD-LabTechNet est une plateforme pédagogique innovante de
              laboratoire virtuel, développée dans le cadre d’un projet
              universitaire à l’École Supérieure de Technologie de Dakhla
              (EST-D).
            `}
            >
              <p className="mt-3 text-justify mb-10 ">
                Dans un contexte où les technologies de l’information évoluent
                rapidement, ESTD-LabTechNet propose une solution moderne
                permettant de réaliser des travaux pratiques (TPs) à distance,
                et de renforcer les compétences techniques des apprenants.
              </p>
            </ButtonPreview>
          </div>
        </div>
      </section>

      <section className="relative w-full min-h-[40vh] overflow-hidden">
        <img
          src="/images/labo1.jpg"
          alt="Illustration LabTech"
          className="absolute inset-0 w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>
      <section className="lg:m-14 lg:mx-5 ">
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          <Contexte />
          <SectionObjectif />
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="w-1/2 h-1 bg-blue-900 mx-auto md:my-12 lg:my-10 my-12 rounded-full"></div>

        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 lg:m-3">
          <VisionSection />
          <NosValeurs />
        </div>
      </section>
      <Public />

      <section className="relative w-full min-h-[50vh] overflow-hidden">
        <img
          src="/images/labo1.jpg"
          alt="Illustration LabTech"
          className="absolute inset-0 w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>
      <AfficherProfils />

      <FooterHome />
    </div>
  );
}

export default About;
