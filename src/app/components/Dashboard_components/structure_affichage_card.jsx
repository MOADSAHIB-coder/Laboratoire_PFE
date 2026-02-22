import { useState , useEffect } from "react";
import AffichageInfos from "./affichage_info";

function CadresAffichage({ userFilter, type_service }) {

    const [selectedCours, setSelectedCours] = useState(null);

    // Interaction avec la base de donnees -----------------------------------
      const [coursInformations, setcoursInformation] = useState([]);
      const [etudiantData, setetudiantdata] = useState([])

        useEffect(() => {
          // Créer query string dynamiquement
          const params = new URLSearchParams();

          if (userFilter.type) params.append("type", userFilter.type);
          if (userFilter.niveau) params.append("niveau", userFilter.niveau);
          if (userFilter.semestre) params.append("semestre", userFilter.semestre);
          if (userFilter.AU) params.append("AU", userFilter.AU);
          if (userFilter.filiere) params.append("filiere", userFilter.filiere);

          const coursURL = `http://127.0.0.1:8000/api/info/mes-cours/?${params.toString()}`;
          const etudiantURL = "http://127.0.0.1:8000/api/etudiants/etudiants/";

          // Fetch les deux APIs
          Promise.all([
            fetch(coursURL).then(res => res.json()),
            fetch(etudiantURL).then(res => res.json())
          ])
            .then(([coursInfo, etudiantData]) => {
              setcoursInformation(coursInfo);
              setetudiantdata(etudiantData);
            })
            .catch(err => console.log(err));

        }, [userFilter]); // relance useEffect si filtre change

    // -----------------------------------------------------------------------


    
    const tps = coursInformations.filter(item =>
      item.type_tp && (!userFilter.type_tp || item.type_tp === userFilter.type_tp)
    ); // projet / devoir


    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {type_service ==='cours' ? (
              coursInformations.length > 0 ? (
                coursInformations.map((Meschoix, index) => (
                  <div
                    key={Meschoix.id}
                    className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer w-full"
                    onClick={() => setSelectedCours(Meschoix)}
                  >
                    <p>
                      <span className="font-bold mr-2">{index + 1}.</span>
                      <span className="mr-2">{Meschoix.titre}</span>
                      <span className="text-gray-500">{Meschoix.date_envoi}</span>
                    </p>
                  </div>
                ))
              ) : (
                // ⚠️ Aucun cours trouvé s'affiche seulement si on est sur la page cours
                <p className="col-span-full flex items-center justify-center text-center text-gray-500 italic h-11">
                  ⚠️ Aucun cours trouvé.
                </p>
              )
            ) : (
              tps.length > 0 ? (
                tps.map((Meschoix, index) => (
                  <div
                    key={Meschoix.id}
                    className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedCours(Meschoix)}
                  >
                    <p>
                      <span className="font-bold mr-2">{index + 1}.</span>
                      <span className="mr-2">{Meschoix.titre}</span>
                      <span className="text-gray-500">{Meschoix.date}</span>
                      <span className="ml-2 text-xs text-blue-500 uppercase">
                        {Meschoix.type_tp}
                      </span>
                    </p>
                  </div>
                ))
              ) : (
                // ⚠️ Aucun projet / devoir trouvé s'affiche seulement si on est sur la page tp/projet
                <p className="col-span-full flex items-center justify-center text-center text-gray-500 italic h-11">
                  ⚠️ Aucun projet / devoir trouvé.
                </p>
              )
            )}

          {selectedCours && (
              <AffichageInfos selectedCours={selectedCours} setSelectedCours={setSelectedCours}>
                {/* Body */}
                  <div className="p-6 space-y-3 text-sm text-gray-700">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <p><span className="font-medium">Filière :</span> {etudiantData[0]?.filiere || "—"}</p>
                      <p><span className="font-medium">Année :</span> {selectedCours.annee_universitaire || "—"}</p>
                      <p><span className="font-medium">Professeur :</span> Rien pour l'instant</p>
                      <p><span className="font-medium">Niveau :</span> {selectedCours.niveau || "—"}</p>
                      <p><span className="font-medium">Semestre :</span> {selectedCours.semestre || "—"}</p>

                      </div>

                      <div className="pt-3 border-t">
                      <p className="font-medium mb-1">Description</p>
                      <p className="text-gray-600">{selectedCours.description}</p>
                      </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                      Télécharger
                    </button>
                    {type_service !== 'cours' && (
                      <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
                      Envoyer
                    </button>
                    )}
                      <button
                      className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                      onClick={() => setSelectedCours(null)}
                      >
                      Fermer
                      </button>
                  </div>
              </AffichageInfos>
          )}

      </div>
      );
}

export default CadresAffichage
