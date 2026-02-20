export default function SectionEspace() {
  return (
    <section
      id="tp"
      className="mb-16 scroll-mt-24 shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
    >
      <div className="h-64 w-full">
        <img
          className="object-cover w-full h-full "
          src="/images/LabtechEspace.jpeg"
          alt="ESTD-LabTecnNet"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2  text-center  bg-blue-700 text-white py-6">
          TP interactif
        </h2>
        <div className="flex md:flex-col-2  flex-1">
          <div className="md:w-1/2 md:p-4 ">
            <p className="text-gray-700">
              L’Espace TP interactif permet aux étudiants de réaliser leurs
              travaux pratiques directement en ligne dans un environnement
              guidé, sécurisé et interactif.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">
              L'objectif pédagogique est de:
            </h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Favoriser l’apprentissage par la pratique</li>
              <li>Permettre la réalisation des TPs à distance</li>
              <li>Automatiser la soumission des travaux</li>
              <li>Offrir un feedback rapide aux étudiants</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2">
              Les fonctionnalités sont centrées sur:
            </h3>

            <h4 className="font-semibold mt-4">Réalisation des TPs en ligne</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>Interface de travail intégrée</li>
              <li>Instructions pas à pas</li>
              <li>Sauvegarde automatique</li>
              <li>Reprise des TPs en cours</li>
            </ul>
            <h4 className="font-semibold mt-4">Soumission des devoirs</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>Dépôt direct sur la plateforme</li>
              <li>Vérification automatique</li>
              <li>Confirmation de réception</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2">Avantages:</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Travail sans installation locale</li>
              <li>Suivi simplifié</li>
              <li>Réduction des erreurs techniques</li>
              <li>Évaluation plus rapide</li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <img
              className=" w-full max-w-lg rounded-2xl object-cover hover:transition"
              src="/images/LabTech2.jpeg"
              alt="ESTD-LabTechNet"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
