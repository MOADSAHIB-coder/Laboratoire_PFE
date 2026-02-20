export default function SectionDiscussion() {
  return (
    <section
      id="collaboration"
      className="mb-16 scroll-mt-24 shadow-lg rounded-xl  overflow-hidden hover:scale-105 transition-transform duration-300"
    >
      <div className="w-full h-64">
        <img
          className="object-cover w-full h-full"
          src="/images/LabTechDiscussion.jpeg"
          alt="ESTD-LabTecnNet"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2  text-center  bg-blue-700 text-white py-6">
          Échange et collaboration
        </h2>
        <div className="flex md:flex-cols-2 flex-1">
          <div className="md:w-1/2 md:p-4">
            <p className="text-gray-700">
              L’espace d’échange et de collaboration favorise la communication
              et le travail collectif entre les acteurs de la plateforme.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">
              L'objectif pédagogique est de:
            </h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Faciliter la communication</li>
              <li>Développer le travail collaboratif</li>
              <li>Créer une communauté d’apprentissage</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2">
              Les fonctionnalités sont centrées sur:
            </h3>

            <h4 className="font-semibold mt-4">Forum de discussion</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>Questions/réponses</li>

              <li>Modération enseignant</li>
              <li>Recherche dans le forum</li>
            </ul>
            <h4 className="font-semibold mt-4">Messagerie interne</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>Messages privés</li>
              <li>Notifications</li>
              <li>Pièces jointes</li>
              <li>Historique des conversations</li>
            </ul>
            <h4 className="font-semibold mt-4">Travail collaboratif</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>Groupes de travails</li>
              <li>Partage de fichiers</li>
              <li>Projets en équipe</li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-2">Avantages:</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Meilleure communication</li>
              <li>Apprentissage collaboratif</li>
              <li>Résolution rapide des problèmes</li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <img
              className=" w-full max-w-lg rounded-2xl object-cover hover:transition"
              src="/images/LabTechDiscussion.jpeg"
              alt="ESTD-LabTechNet"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
