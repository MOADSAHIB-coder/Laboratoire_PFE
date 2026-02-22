import FooterHome from "../../../components/contentHome/footerHome";
import HeaderHome from "../../../components/contentHome/headerHome";

function Terms() {
  return (
    <div>
      <HeaderHome />
      <div className="min-h-screen bg-gray-50 pb-10 px-4 text-justify">
        <div className="max-w-3xl mx-auto bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">
            Conditions d’utilisation – ESTD LabTechNet
          </h1>

          {/* Introduction */}
          <section className="mb-6">
            <p className="text-gray-700 leading-relaxed ">
              Bienvenue sur la plateforme ESTD-LabTechNet. Cette plateforme
              constitue un laboratoire virtuel permettant la réalisation de
              travaux pratiques (TP) en réseaux informatiques.
            </p>
          </section>

          {/* Accès */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              1. Conditions d’accès
            </h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>L’accès est réservé aux étudiants autorisés.</li>
              <li>L’utilisateur doit fournir des informations exactes.</li>
              <li>Chaque compte est strictement personnel.</li>
            </ul>
          </section>

          {/* Utilisation */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              2. Utilisation du laboratoire virtuel
            </h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>
                La plateforme doit être utilisée uniquement à des fins
                pédagogiques.
              </li>
              <li>
                Toute tentative de piratage ou de perturbation est interdite.
              </li>
              <li>
                L’utilisateur s’engage à respecter l’éthique informatique.
              </li>
            </ul>
          </section>

          {/* Responsabilité */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">3. Responsabilités</h2>
            <p className="text-gray-700">
              L’utilisateur est responsable de toute activité effectuée depuis
              son compte. L’établissement se réserve le droit de suspendre tout
              compte en cas d’utilisation abusive.
            </p>
          </section>

          {/* Données */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              4. Protection des données
            </h2>
            <p className="text-gray-700">
              Les informations collectées sont utilisées uniquement dans le
              cadre pédagogique et ne seront pas partagées avec des tiers sans
              autorisation.
            </p>
          </section>

          {/* Propriété */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              5. Propriété intellectuelle
            </h2>
            <p className="text-gray-700">
              Tous les contenus de la plateforme ESTD-LabTechNet sont protégés
              par les lois relatives à la propriété intellectuelle.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold mb-2">6. Contact</h2>
            <p className="text-gray-700">
              Pour toute question concernant ces conditions, veuillez contacter
              l’administration du laboratoire.
            </p>
          </section>
        </div>
      </div>
      <FooterHome />
    </div>
  );
}

export default Terms;
