import { useState, useEffect } from "react";
import { Donnees } from "../../components/Dashboard_components/DataTest";
import "../../../index.css"
import EnseignantLayout from "../../layouts/EnseignantLayout";

function ProfTPDashboard() {
  const [filiere, setFiliere] = useState("");
  const [annee, setAnnee] = useState("");
  const [niveau, setNiveau] = useState("");
  const [tpList, setTpList] = useState([]);
  const [selectedTP, setSelectedTP] = useState(null); // pour la modal

  useEffect(() => {
    if (filiere && niveau && annee) {
      const filtered = Donnees.filter(
        (tp) =>
          tp.filiere === filiere &&
          tp.bac === niveau &&
          tp.date === annee
      );
      setTpList(filtered);
    } else {
      setTpList(null);
    }
  }, [filiere, niveau, annee]);

  return (
    <EnseignantLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Tableau de suivi des TP
        </h1>

        {/* Filtrage */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <select
            value={filiere}
            onChange={(e) => setFiliere(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Filière</option>
            <option value="Informatique">Informatique</option>
            <option value="Gestion">Gestion</option>
          </select>

          <select
            value={niveau}
            onChange={(e) => setNiveau(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Niveau</option>
            <option value="Bac+1">Bac+1</option>
            <option value="Bac+2">Bac+2</option>
          </select>

          <select
            value={annee}
            onChange={(e) => setAnnee(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Année universitaire</option>
            <option value="2025-2026">2025-2026</option>
            <option value="2026-2027">2026-2027</option>
          </select>
        </div>

        {/* Messages */}
        {tpList === null ? (
          <p className="text-gray-500">
            Merci de remplir tous les champs pour voir les résultats.
          </p>
        ) : tpList.length === 0 ? (
          <p className="text-gray-500">Aucun TP trouvé pour cette sélection.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
            {tpList.map((tp) => (
              <div
                key={tp.id}
                className="flip-card cursor-pointer perspective h-40 lg:w-72 xl:w-80  "
              >
                <div className="flip-card-inner relative w-full h-full transition-transform duration-500">
                  {/* Front */}
                  <div className="flip-card-front absolute inset-0 bg-white p-4 rounded-2xl shadow flex flex-col justify-center backface-hidden">
                    <h2 className="font-bold text-lg text-gray-800">{tp.titre}</h2>
                    <p className="text-gray-500 text-sm mt-2">
                      Étudiant : {tp.etudiant} <br />
                      Filière : {tp.filiere} <br />
                      Niveau : {tp.bac} <br />
                      Année : {tp.date}
                    </p>
                  </div>

                  {/* Back */}
                  <div className="flip-card-back absolute inset-0 bg-white p-4 rounded-2xl shadow flex flex-col justify-between backface-hidden rotate-y-180">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{tp.titre}</h3>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-4">
                        {tp.description || "Pas de description fournie."}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedTP(tp)}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Voir plus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedTP && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-[90vw] md:w-[50vw] max-w-3xl rounded-2xl shadow-2xl p-6 relative">
              <button
                onClick={() => setSelectedTP(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedTP.titre}</h2>
              <p className="text-gray-600 mb-2"><b>Étudiant:</b> {selectedTP.etudiant}</p>
              <p className="text-gray-600 mb-2"><b>Filière:</b> {selectedTP.filiere}</p>
              <p className="text-gray-600 mb-2"><b>Niveau:</b> {selectedTP.bac}</p>
              <p className="text-gray-600 mb-2"><b>Année:</b> {selectedTP.date}</p>
              <p className="text-gray-600 mb-4"><b>Description:</b> {selectedTP.description || "Pas de description."}</p>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-gray-700">Documents:</h3>
                {selectedTP.documents && selectedTP.documents.length > 0 ? (
                  selectedTP.documents.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {doc.name}
                    </a>
                  ))
                ) : (
                  <p className="text-gray-500">Aucun document soumis.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </EnseignantLayout>
  );
}

export default ProfTPDashboard;
