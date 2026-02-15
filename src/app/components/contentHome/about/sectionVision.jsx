export function VisionSection() {
  return (
    <section className="bg-blue-500 py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-10 justify-center  items-center md:items-start">
        <h1
          className="text-xl md:text-2xl
 lg:text-4xl text-white font-bold md:w-1/3 text-center md:text-left"
        >
          Notre Vision
        </h1>
        <p className="text-white   lg:text-2xl md:w-2/3 text-justify   md:text-left">
          Est de faire de LabTechNet-ESTD un outil de référence pour la
          formation pratique en réseaux au sein des établissements
          universitaires.
        </p>
      </div>
    </section>
  );
}

export function NosValeurs() {
  return (
    <section className="bg-blue-white relative w-full py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-10 justify-center  items-center md:items-start">
        <h1 className="text-xl md:text-2xl lg:text-4xl text-blue-600 font-bold md:w-1/3 text-center md:text-left">
          Nos Valeurs
        </h1>
        <p className="text-blue-600 lg:text-2xl md:w-2/3   text-justify md:text-left">
          LabTech-EST-D repose sur des valeurs fondamentales :
          <ul className="list-disc list-inside mt-2">
            <li>Innovation pédagogique</li>
            <li>Apprentissage pratique et autonome</li>
            <li>Accessibilité et flexibilité</li>
            <li>Collaboration académique</li>
            <li>Sécurité et fiabilité</li>
          </ul>
        </p>
      </div>
    </section>
  );
}
