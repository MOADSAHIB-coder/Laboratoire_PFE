export default function SectionSuiviCorrection() {
  return (
    <section
      id="suivi"
      className="mb-16 scroll-mt-24 shadow-2xl rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
    >
      <div className="w-full h-64">
        <img
          className="object-cover h-full w-full"
          src="/images/LabTechCorr2.jpeg"
          alt="ESTD-LabTecnNet"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2  text-center  bg-blue-700 text-white py-6">
          Suivi et correction
        </h2>
        <div className="flex md:flex-col-2 flex-1">
          <div className="w-1/2 md:p-4">
            <p className="text-gray-500 text-justify">
              Ce module permet un suivi complet des activités des étudiants
              ainsi qu’une correction efficace et centralisée des travaux
              pratiques.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">
              L'objectif pédagogique est de:
            </h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Assurer un suivi continu</li>
              <li>Faciliter la correction</li>
              <li>Identifier rapidement les difficultés</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2">
              Les fonctionnalités sont centrées sur:
            </h3>

            <h4 className="font-semibold mt-4">Suivi en temps réel</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>Tableau de bord enseignant</li>
              <li>Statistiques de progression</li>
              <li>Historique des activités</li>
            </ul>
            <h4 className="font-semibold mt-4">Correction des TPs</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>Correction manuelle ou automatique</li>
              <li>Attribution de notes</li>
              <li>Commentaires personnalisés</li>
            </ul>
            <h4 className="font-semibold mt-4"> Publication des résultats</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>Affichage des notes</li>
              <li>Feedback détaillé</li>
              <li>Notifications aux étudiants</li>
              <li>Archivage des résultats</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2">Avantages:</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Suivi pédagogique précis </li>
              <li>Correction rapide</li>
              <li>Amélioration des performances</li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <img
              className=" w-full max-w-lg rounded-2xl object-cover hover:transition"
              src="/images/LabTechCorr.jpeg"
              alt="ESTD-LabTechNet"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
