import { useState } from "react";
import EnseignantLayout from "../../layouts/EnseignantLayout";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

// Exemple données
export const Datas = [
  {id:1, titre: 'Cours de réseaux informatique', description: 'reseaux informatique ....', type: 'Reseau', niveau: 'bac+1', semestre:'S2', nomProf : 'Ayoube jibouni', date: '2026-01-22', filiere : 'Gestion des reseau et securite',AU:'2025-2026',numTp:15,description_prof:'description du professeur et son parcours' },
  {id:2, titre: 'TP de dev web', type_tp:'projet', description: 'SQL....', type: 'Data', niveau: 'bac+1', semestre:'S2', nomProf : 'Ayoube jibouni', date: '2026-01-23', filiere : 'Informatique de gestion',AU:'2025-2026',numTp:17,description_prof:'description du professeur et son parcours'},
  {id:3, titre: 'Cours de dev web', description: 'HTML/CSS/JS', type: 'dev', niveau: 'bac+2', semestre:'S3', nomProf : 'Ayoube jibouni', date: '2026-01-24', filiere : 'Génie Informatique',AU:'2025-2026',numTp:2,description_prof:'description du professeur et son parcours' },
  {id:4, titre: 'Devoir UML', type_tp:'projet', description: 'UML et NoSQL ....', type: 'Data', niveau: 'bac+1', semestre:'S2', nomProf : 'Ayoube jibouni', date: '2025-01-22', filiere : 'Gestion des reseau et securite',AU:'2025-2026',numTp:20,description_prof:'description du professeur et son parcours' },
  {id:5, titre: 'Devoir UML', type_tp:'devoir', description: 'UML et NoSQL ....', type: 'Data', niveau: 'bac+2', semestre:'S4', nomProf : 'Ayoube jibouni', date: '2025-01-22', filiere : 'Gestion des reseau et securite',AU:'2025-2026',numTp:20,description_prof:'description du professeur et son parcours' },
  {id:6, titre: 'Devoir UML', type_tp:'projet', description: 'UML et NoSQL ....', type: 'Data', niveau: 'bac+1', semestre:'S2', nomProf : 'Naoual Nassiri', date: '2025-01-22', filiere : 'Informatique Appliquée',AU:'2025-2026',numTp:20,description_prof:'description du professeur et son parcours' },
  {id:7, titre: 'Devoir UML', type_tp:'devoir', description: 'UML et NoSQL ....', type: 'Data', niveau: 'bac+1', semestre:'S2', nomProf : 'Ayoube jibouni', date: '2025-01-22', filiere : 'Sécurité Informatique',AU:'2025-2026',numTp:20,description_prof:'description du professeur et son parcours' },
  {id:8, titre: 'cours UML', description: 'UML et NoSQL ....', type: 'Data', niveau: 'bac+1', semestre:'S2', nomProf : 'Naoual Nassiri', date: '2025-01-22', filiere : 'Réseaux et Télécommunications',AU:'2025-2026',numTp:20 },
  {id:9, titre: 'Devoir UML', type_tp:'projet', description: 'UML et NoSQL ....', type: 'Data', niveau: 'bac+2', semestre:'S3', nomProf : 'Naoual Nassiri', date: '2025-01-22', filiere : 'Ingénierie Logicielle',AU:'2025-2026',numTp:20,description_prof:'description du professeur et son parcours' },
  {id:10, titre: 'Cours UML', description: 'UML et NoSQL ....', type: 'Data', niveau: 'bac+2', semestre:'S3', nomProf : 'Ayoube jibouni', date: '2025-01-22', filiere : 'Gestion des reseau et securite',AU:'2025-2026',numTp:20,description_prof:'description du professeur et son parcours' },
  {id:11, titre: 'Devoir UML', type_tp:'projet', description: 'UML et NoSQL ....', type: 'Data', niveau: 'bac+1', semestre:'S2', nomProf : 'Ayoube jibouni', date: '2025-01-22', filiere : 'Gestion des reseau et securite',AU:'2025-2026',numTp:20,description_prof:'description du professeur et son parcours' }
];

function DashboardEnseignant() {
  const [selectedFiliere, setSelectedFiliere] = useState(null);

  // Prof simulé
  const user = { nomProf: "Ayoube jibouni" };

  // Filtrer données du prof
  const datasProf = Datas.filter(item => item.nomProf === user.nomProf);


  // Récupérer les filières uniques
  const filieres = [...new Set(datasProf.map(d => d.filiere))];

  // Si filière sélectionnée, filtrer datas
  const datasFiliere = selectedFiliere
    ? datasProf.filter(d => d.filiere === selectedFiliere)
    : [];

  const cours = datasFiliere.filter(item => !item.type_tp);
  const tps = datasFiliere.filter(item => item.type_tp);

  const stats = [
    { title: "Cours enseignés", value: cours.length },
    { title: "Travaux à corriger", value: tps.length },
    { title: "Étudiants encadrés", value: 25 } // exemple
  ];

  return (
    <EnseignantLayout>
      <div className="p-5 flex flex-col gap-8">
            <div className=" p-5 h-screen overflow-auto [&::-webkit-scrollbar]:hidden bg-gray-50 flex flex-col gap-6" 
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                
                {/* Carte de bienvenue */}
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                    <h2 className="text-2xl font-bold">Bienvenue, {user.nomProf || 'Professeur '} !</h2>
                    <p className="text-gray-600 mt-1">{datasProf[0]?.description_prof}</p>
                    <p className="mt-2 text-blue-500 font-semibold">
                        Vous avez {Datas.numTp || 0} travaux à corriger cette semaine
                    </p>
                    </div>
                    <img
                        src='/icons/user.png'
                        alt="visage de Etudiant"
                        className="w-[6.3rem] h-[6.3rem] rounded-full object-cover bg-[#E9F1F2] ml-[3.4rem]"
                    />
                </div>
            
        {/* --- Écran choix de filière --- */}
        {!selectedFiliere && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold mb-4">Sélectionnez une filière pour voir le dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {filieres.map((f, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedFiliere(f)}
                  className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:scale-105 transform transition"
                >
                  <p className="text-xl font-semibold">{f}</p>
                  <p className="text-gray-500 mt-2">{datasProf.filter(d => d.filiere === f).length} cours / TP disponibles</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Dashboard principal --- */}
        {selectedFiliere && (
          <div className="flex flex-col gap-8">
            {/* Bouton revenir en arrière */}
            <button
              className="px-4 py-2 text-white rounded-lg border bg-blue-500 w-max hover:bg-blue-600 hover:text-[1.01rem]"
              onClick={() => setSelectedFiliere(null)}
            >
              ← Choisir une autre filière
            </button>
            <h2 className=" text-3xl font-bold text-gray-800 max-w-3xl">
                Filière - {selectedFiliere}
            </h2>
            

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {stats.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow flex flex-col items-center justify-center">
                  <p className="text-gray-500">{s.title}</p>
                  <p className="text-3xl font-bold mt-2">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-lg font-semibold mb-4">Cours par niveau</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={[
                    { name: "Bac+1", value: cours.filter(c => c.niveau==="bac+1" && c.filiere === selectedFiliere).length },
                    { name: "Bac+2", value: cours.filter(c => c.niveau==="bac+2" && c.filiere === selectedFiliere).length }
                  ]}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4F46E5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-lg font-semibold mb-4">Répartition des travaux</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={[
                    { name: "Cours", value: cours.length },
                    { name: "Projets/Devoirs", value: tps.length },
                  ]}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            </div>
        )}
        </div>
      </div>
    </EnseignantLayout>
  );
}

export default DashboardEnseignant;
