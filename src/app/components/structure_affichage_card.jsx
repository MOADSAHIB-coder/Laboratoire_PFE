import { useState } from "react";

const Datas = [
  {id:1, titre: 'cours de reseaux informatique', description : 'reseaux informatique ....', type: 'Reseau', niveau: 'bac+1', semestre:'S2', nomProf : 'Ayoube jibouni', date: '2026-01-22 14:35:12', filiere : 'Gestion des reseau et securite',AU:'2026-2027' },
  {id:2, titre: 'TP de dev web',type_tp:'projet', description : 'SQL....', type: 'Data', niveau: 'bac+1', semestre:'S2', nomProf : 'Maryame Homare', date: '2026-01-23 14:35:12', filiere : 'Gestion des reseau et securite',AU:'2026-2027'},
  {id:3, titre: 'cours de reseaux informatique', description : 'reseaux informatique ....', type: 'dev', niveau: 'bac+2', semestre:'S3', nomProf : 'Naoual Nassiri', date: '2026-01-22 14:35:12', filiere : 'Gestion des reseau et securite',AU:'2026-2027' },
  {id:4, titre: 'TP de base de donnees et conception',type_tp:'devoir', description : 'UML et NoSQL ....', type: 'Data', niveau: 'bac+1', semestre:'S2', nomProf : 'Ibrahim Dib', date: '2025-01-22 13:35:12', filiere : 'Gestion des reseau et securite',AU:'2026-2027' }
];//supprimer par la suite (l'utilisation de la base de donnees.)

function CadresAffichage({ userFilter }) {
  const [selectedCours, setSelectedCours] = useState(null);

  // Filtrer les cours selon les infos de l'utilisateur
  const filteredDatas = Datas.filter(Meschoix =>
    (!userFilter.type || Meschoix.type === userFilter.type) &&
    (!userFilter.filiere || Meschoix.filiere === userFilter.filiere) &&
    (!userFilter.niveau || Meschoix.niveau === userFilter.niveau) &&
    (!userFilter.semestre || Meschoix.semestre === userFilter.semestre) &&
    (!userFilter.AU || Meschoix.AU === userFilter.AU)&&
    (!userFilter.type_tp || Meschoix.type_tp === userFilter.type_tp) 
  );

  return (
    <div className="p-5 flex flex-col gap-4">
      {filteredDatas.length>0 ? (filteredDatas.map((Meschoix, index) => (
        <div
          key={Meschoix.id}
          className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer"
          onClick={() => setSelectedCours(Meschoix)}
        >
          <p>
            <span className="font-bold mr-2">{index + 1}.</span>
            <span className="mr-2">{Meschoix.titre}</span>
            <span className="text-gray-500">{Meschoix.date}</span>
          </p>
        </div>
        ))) : 
          (
        <p className="text-center text-gray-500 italic mt-4">
          ⚠️ Aucun résultat trouvé pour vos critères.
        </p>
          )
        }

        {selectedCours && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white w-[40vw] max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative">

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-800">
                    {selectedCours.titre}
                    </h2>
                    <button
                    className="text-gray-400 hover:text-red-500 text-xl"
                    onClick={() => setSelectedCours(null)}
                    >
                    ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-3 text-sm text-gray-700">
                    <div className="grid grid-cols-2 gap-3">
                    <p><span className="font-medium">Filière :</span> {selectedCours.filiere}</p>
                    <p><span className="font-medium">Année :</span> {selectedCours.AU}</p>
                    <p><span className="font-medium">Professeur :</span> {selectedCours.nomProf}</p>
                    <p><span className="font-medium">Niveau :</span> {selectedCours.niveau}</p>
                    <p><span className="font-medium">Semestre :</span> {selectedCours.semestre}</p>
                    </div>

                    <div className="pt-3 border-t">
                    <p className="font-medium mb-1">Description</p>
                    <p className="text-gray-600">{selectedCours.description}</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                    <button
                    className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                    onClick={() => setSelectedCours(null)}
                    >
                    Fermer
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                    Télécharger
                    </button>
                </div>

                </div>
            </div>
        )}

    </div>
  );
}

export default CadresAffichage
