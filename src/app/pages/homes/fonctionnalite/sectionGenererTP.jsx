export default function SectionGeneration() {
  return (
    <section
      id="generation"
      className="mb-16 scroll-mt-24 shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
    >
      <div className="w-full h-64">
        <img
          className="object-cover w-full h-full "
          src="/images/LabTechGenerer2.jpeg"
          alt="ESTD-LabTecnNet"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2  text-center  bg-blue-700 text-white py-6">
          Génération automatique de TPs
        </h2>
        <div className="flex md:flex-col-2 ">
          <div className="md:w-1/2 md:p-4">
            <p className="text-gray-700">
              Le système de génération automatique produit des travaux pratiques
              personnalisés et variés afin d’améliorer l’évaluation individuelle
              et limiter la triche.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">
              L'objectif pédagogique est de:
            </h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Automatiser la création des TPs</li>
              <li>Adapter la difficulté au niveau</li>
              <li>Optimiser le temps des enseignants</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2">
              Les fonctionnalités sont centrées sur:
            </h3>

            <h4 className="font-semibold mt-4">Génération intelligente</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>Création automatique de scénarios</li>
              <li>Variantes d’exercices</li>
            </ul>
            <h4 className="font-semibold mt-4">Adaptation au niveau</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>Niveau débutant/intermédiaire/avancé</li>
              <li>Progression pédagogique</li>
              <li>Difficulté ajustable</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2">Avantages:</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Personnalisation de l’apprentissage</li>
              <li>Gain de temps</li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <img
              className=" w-full max-w-lg rounded-2xl object-cover hover:transition"
              src="/images/LabtechAuto.jpeg"
              alt="ESTD-LabTechNet"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
