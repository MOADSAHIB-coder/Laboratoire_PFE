import FooterHome from "../../components/contentHome/footerHome";
import HeaderHome from "../../components/contentHome/headerHome";
import { faqData } from "./FoireData";
import { useState } from "react";
import ContactezNous from "./FormulaireContact";

function FoireQuestion() {
  const categories = [
    { label: "compte", key: "compte" },
    { label: "Travaux pratiques", key: "Travaux_pratiques" },
    { label: "Généralité sur le site", key: "Generalite_sur_le_site" },
    { label: "Laboratoire virtuel", key: "Laboratoire_virtuel" },
    { label: "Réseaux", key: "Reseaux" },
    { label: "Virtualisation", key: "La_virtualisation" },
  ];

  const [activeCategory, setActiveCategory] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <HeaderHome />

      {/* title */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-6xl font-bold mb-6 text-center">
          Foire aux Questions (FAQ)
        </h1>
      </div>

      <div>
        <h2 className="md:text-4xl text-xl text-center text-white font-semibold mb-4 md:mb-6 bg-blue-500 p-10 md:p-14">
          Vos Questions / Nos Réponses
        </h2>
      </div>

      {/* catégories */}
      <div className="flex justify-center px-4 py-8">
        <ol className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 font-semibold max-w-5xl w-full">
          {categories.map((cat, index) => (
            <li
              key={index}
              className={`p-10 rounded-xl cursor-pointer text-center transition
              ${
                activeCategory?.key === cat.key
                  ? "bg-blue-500 text-white"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
            >
              {cat.label}
            </li>
          ))}
        </ol>
      </div>

      {/* FAQ */}
      <div className="mb-10">
        {activeCategory && (
          <div className="max-w-5xl mx-auto mt-8 p-6 bg-gray-50 border-2 border-blue-700 rounded-lg shadow">
            <h2 className="text-2xl text-red-500 font-bold mb-10">
              Questions à propos de <span>{activeCategory.label}</span>
            </h2>

            <div className="space-y-4">
              {(faqData[activeCategory.key] || []).map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border overflow-hidden"
                >
                  {/* question */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left p-4 font-semibold bg-blue-500 text-white flex justify-between items-center  hover:bg-blue-300"
                  >
                    {item.question}
                    <span className="text-white font-extrabold text-xl">
                      {openIndex === index ? "-" : "+"}
                    </span>
                  </button>

                  {/* réponse */}
                  <div
                    className={`transition-all duration-300 ${
                      openIndex === index
                        ? "max-h-96 p- opacity-100 p-4 border-2 mt-4 rounded-lg font-medium bg-white  border-blue-500"
                        : "max-h-0 opacity-0  overflow-hidden"
                    }`}
                  >
                    <p className="text-gray-700">{item.reponse}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="max-w-5xl mx-auto mt-8 p-6 bg-gray-50 border-2 border-blue-700 rounded-lg shadow">
          <button
            onClick={() => {
              setShowForm(!showForm);
            }}
            className="w-full text-left p-4 font-semibold bg-blue-500 text-white flex justify-between items-center  hover:bg-blue-300"
          >
            Autres questions ?
            <span className="text-xl font-extrabold">
              {showForm ? "-" : "+"}
            </span>
          </button>
          {showForm && (
            <div>
              <div className="flex justify-center items-center">
                <div className="w-full text-left p-10 my-6 font-semibold bg-blue-300 text-white">
                  <h2>
                    Veuillez remplir le formulaire ci-dessous, et contactez-nous
                    pour tout autre question .
                  </h2>
                </div>
              </div>
              <ContactezNous />
            </div>
          )}
        </div>
      </div>

      <FooterHome />
    </div>
  );
}

export default FoireQuestion;
