export default function Introduction() {
  return (
    <section id="introduction" className="scroll-mt-24">
      <h2 className="text-3xl font-bold bg-blue-700  text-white p-5 md:p-10 ">
        Présentation générale du ESTD-LabTechNet
      </h2>
      <div className="flex flex-col md:flex-row mt-4 gap-6 md:py-10 ">
        <div className="md:w-1/2 text-justify space-y-4 shadow-md hover:scale-105 transition-transform duration-300">
          <p className="p-6 text-justify">
            La plateforme ESTD-LabTechNet est un laboratoire virtuel conçu pour
            faciliter l’apprentissage pratique des réseaux informatiques et des
            technologies associées. Elle offre un environnement numérique
            interactif permettant aux étudiants, enseignants et administrateurs
            d’accéder à des ressources pédagogiques, de réaliser des travaux
            pratiques et de simuler des scénarios réseau réalistes
          </p>

          <p className="p-6 py-0 text-justify">
            Face aux besoins croissants de formation pratique à distance,
            LabTechNet vise à moderniser l’enseignement en proposant une
            solution centralisée, accessible et intuitive. La plateforme met
            l’accent sur l’autonomie de l’étudiant, le suivi pédagogique en
            temps réel et l’automatisation intelligente des travaux pratiques.
          </p>
          <p className="p-6 text-justify">
            Dans ce contexte, plusieurs fonctionnalités clés ont été développées
            afin de répondre aux exigences pédagogiques et techniques des
            établissements de formation.
          </p>
        </div>
        <div className="py-6">
          <img
            className="text-justify space-y-4 object-cover hover:scale-105 transition-transform duration-300"
            src="/images/LabTech1.jpeg"
            alt="ESTD-LabTechNet"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10 p-6 justify-center items-center">
        <img
          className="w-full max-w-md rounded-2xl shadow-lg object-cover  hover:scale-105 transition-transform duration-300"
          src="/images/LabTech3.jpeg"
          alt="ESTD-LabTechNet"
        />
        <img
          className="w-full max-w-md rounded-2xl shadow-lg object-cover hover:scale-105 transition-transform duration-300"
          src="/images/Labtech4.jpeg"
          alt="ESTD-LabTechNet"
        />
      </div>
    </section>
  );
}
