export default function SectionAccesCours() {
  return (
    <section
      id="cours"
      className="mb-16 scroll-mt-24 shadow-lg rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300"
    >
      <div className="w-full h-64">
        <img
          className="object-cover h-full w-full"
          src="/images/LabTechCours.jpeg"
          alt="ESTD-LabTecnNet"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl text-center font-bold mb-2 bg-blue-700 text-white py-6">
          Accès aux cours et TPs
        </h2>
        <div className="flex md:flex-cols-2 flex-1">
          <div className="w-1/2 p-4  ">
            <p className="text-justify pt-4">
              Le module Accès aux cours et Travaux Pratiques constitue le point
              d’entrée principal des étudiants vers les ressources pédagogiques
              de la plateforme ESTD-LabTechNet.
            </p>
            <h3 className="text-xl font-semibold mt-4 md:mt-6 mb-2">
              L'objectif pédagogique est de:
            </h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Centraliser les ressources pédagogiques</li>
              <li>Faciliter l’accès aux cours</li>
              <li>Apprentissage autonome</li>
              <li>Réduction du papier</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 md:mt-6 mb-2">
              Les fonctionnalités sont centrées sur:
            </h3>
            <h4 className="font-semibold mt-4">La consultation des supports</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>Lecture des cours en ligne</li>
              <li>Visualisation PDF</li>
              <li>Accès aux guides TP</li>
              <li>Aperçu rapide</li>
            </ul>
          </div>
          <div>
            <img
              className="w-full max-w-md rounded-2xl object-cover hover:transition"
              src="/images/LabTechCours2.jpeg"
              alt="ESTD-LabTechNet"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
