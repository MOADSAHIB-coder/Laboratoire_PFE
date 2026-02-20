export default function SectionReseau() {
  return (
    <section
      id="reseau"
      className="mb-16 scroll-mt-24 shadow-2xl rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300"
    >
      <div className="w-full h-64">
        <img
          className="object-cover h-full w-full"
          src="/images/LabtechConfig.jpeg"
          alt="ESTD-LabTecnNet"
        />
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2  text-center  bg-blue-700 text-white py-6">
          Configuration réseau
        </h2>{" "}
        <div className="flex md:flex-cols-2 flex-1">
          <div className="md:w-1/2 md:p-4">
            <p className="text-gray-700 text-justify md:pt-4">
              Ce module offre un laboratoire réseau virtuel permettant de
              concevoir, configurer et tester des infrastructures réseau dans un
              environnement simulé réaliste.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">
              L'objectif pédagogique est de:
            </h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Simuler des réseaux </li>
              <li>Booster les compétences en configuration</li>
              <li>Développer les compétences pratiques réseau</li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-2">
              Les fonctionnalités sont centrées sur:
            </h3>
            <h4 className="font-semibold mt-4">Création de topologies</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>Connexions par glisser-déposer</li>
              <li>Modèles prédéfinis</li>
              <li>Topologies personnalisées</li>
            </ul>
            <h4 className="font-semibold mt-4">
              Configuration des équipements
            </h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>Configuration des routeurs, Switches, ....</li>
              <li>
                Gestion des VLAN, routages, configuration des interfaces,IP, ...
              </li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-2">Avantages:</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Environnement sans risque</li>
              <li>Compréhension approfondie des réseaux</li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <img
              className=" w-full max-w-lg rounded-2xl object-cover hover:transition"
              src="/images/LabTechToPo.jpeg"
              alt="ESTD-LabTechNet"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
