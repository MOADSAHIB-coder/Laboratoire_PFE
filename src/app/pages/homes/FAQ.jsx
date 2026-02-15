import FooterHome from "../../components/contentHome/footerHome";
import HeaderHome from "../../components/contentHome/headerHome";
import { useState } from "react";

function FoireQuestion() {
  const categories = [
    "compte",
    "Travaux pratiques",
    "Généralité sur le site",
    "Laboratoire virtuel",
    "Réseaux",
    "Virtualisation",
  ];

  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div>
      <HeaderHome />
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
      <div className="flex justify-center px-4 py-8">
        <ol className="list-decimal  grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 font-semibold lg:grid-cols-3 xl:grid-cols-3 max-w-5xl w-full">
          {categories.map((cat, index) => (
            <li
              key={index}
              className={`p-6 rounded-xl cursor-pointer text-center transition
            ${activeCategory === cat ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-100"} `}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ol>
      </div>
      <div className="mb-10">
        {activeCategory && (
          <div className="max-w-5xl mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Questions sur : {activeCategory}
            </h2>
            <p>{activeCategory}.</p>
          </div>
        )}
      </div>
      <FooterHome />
    </div>
  );
}

export default FoireQuestion;
