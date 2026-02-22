import { ButtonPreview } from "./buttonRotaiton";

function Contexte() {
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
              Contexte et motivation
            </h2>
            <div className="p-6 text-lg">
              <ButtonPreview
                preview={` 
              L’apprentissage des réseaux informatiques nécessite une forte
              composante pratique. Cependant, les laboratoires physiques
              présentent plusieurs contraintes :
            `}
              >
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>Disponibilité limitée du matériel</li>
                  <li>Coût élevé des équipements</li>
                  <li>Accès restreint en dehors des heures de cours</li>
                  <li>Difficulté de suivi individualisé des étudiants</li>
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

export default Contexte;
