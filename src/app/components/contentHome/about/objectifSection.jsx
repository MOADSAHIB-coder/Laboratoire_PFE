import { ButtonPreview } from "./buttonRotaiton";

function SectionObjectif() {
  return (
    <section className="relative w-full  min-h-[30.5vh] bg-blue-600">
      <div className="max-w-2xl pt-8">
        <section className="relative mx-auto max-w-screen-xl px-4">
          <div
            className="
                w-full max-w-2xl bg-white p-8 shadow-xl z-20
                static mt-8
                lg:absolute lg:-mt-[15vh] lg:right-0
              "
          >
            <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-blue-950">
              Objectifs du projet
            </h2>
            <div className="p-6 text-lg">
              <ButtonPreview
                preview={` 
                  La plateforme LabTech-EST-D a pour objectifs principaux :
                `}
              >
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>
                    Offrir un environnement de laboratoire virtuel fiable et
                    sécurisé
                  </li>
                  <li>
                    Permettre aux étudiants de réaliser des TPs pratiques en
                    ligne
                  </li>
                  <li>
                    Automatiser la génération et la personnalisation des travaux
                    pratiques
                  </li>
                  <li>
                    Améliorer le suivi pédagogique et l’évaluation continue
                  </li>
                  <li>
                    Favoriser l’interaction entre étudiants et enseignants
                  </li>
                  <li>Renforcer les compétences en réseaux</li>
                </ul>
                <p>Face à ces defis, LabTechNet-ESTD a été conçu pour:</p>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>Digitaliser les laboratoire de reséaux</li>
                  <li>Faciliter l'accès à tout moment</li>
                  <li>Ameliorer l'éfficacité pédagogique</li>
                  <li>Encourager l'autonomie et l'expérimentation</li>
                </ul>
              </ButtonPreview>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default SectionObjectif;
