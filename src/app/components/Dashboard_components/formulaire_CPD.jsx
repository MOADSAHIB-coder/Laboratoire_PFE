import { useEffect , useState } from "react";
import CadresAffichage from "./structure_affichage_card";
import { Datas } from "../../pages/enseignant/Dashboard";

function FormulaireCPD({children, Type, showTypeSelect, choix, role, onSubmit  }){

    // Interaction avec la base de donnees ---------------------------------

        const [etudiantData, setetudiantdata] = useState([])
        const [loading, setLoading] = useState(true);

        useEffect(() => {
          const etudiantURL = "http://127.0.0.1:8000/api/etudiants/etudiants/";

          // Fetch les deux APIs
          Promise.all([
            fetch(etudiantURL).then(res => res.json()),
          ])
            .then(([etudiantData]) => {
              setetudiantdata(etudiantData);
              setLoading(false)
            })
            .catch(err => console.log(err));

        }, []);

    // ---------------------------------------------------------------------

    const now = new Date()
    const DateActuelle = now.getFullYear();
    const MoisActuelle = now.getMonth()+1
    const Annees = Array.from({length:7},(_,i) => DateActuelle - 7 + i);

    const [Niveau, setniveaus] = useState('bac+1')
    const semestres = Niveau === 'bac+1' ? ['S1','S2'] : ['S3','S4']

    const [appliedFilters, setAppliedFilters] = useState(null);

    const valider = (e) => {
        e.preventDefault()
        setAppliedFilters(filters);
    }

    const [filters, setFilters] = useState({
        type: 'reseaux', 
        filiere: etudiantData[0]?.filiere || null,
        niveau: 'bac+1',
        semestre: 'S1',
        AU: MoisActuelle > 6 ? `${DateActuelle}-${DateActuelle+1}` : `${DateActuelle-1}-${DateActuelle}`,
        type_tp: 'projet'
        });

    // Prof simulé
    const user = { nomProf: "Naoual Nassiri" };
    const dataProf = Datas.filter(element => 
        element.nomProf === user.nomProf
    )

    const filieres = [...new Set(dataProf.map(f => f.filiere))]    

    if(loading){
        return (
            <div className="text-center mt-[50vh]"> Loading ...</div>
        )
    }

    return (
        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[90%] xl:w-[80%] mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
            <div className="w-full mx-auto p-3 sm:p-6">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">

                    {/* Filiere */}
                    <div className="flex flex-col">
                    <label htmlFor="filiere" className="mb-1 font-semibold text-gray-700">Filière :</label>
                    {role === 'etu' || role==='etuE' ? (
                        <input
                        type="text"
                        id="filiere"
                        name="filiere"
                        value={etudiantData[0].filiere || "---" }
                        className="border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        readOnly
                    />
                    ) : (
                        <select 
                        id="filiere"
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {filieres.map((f, i) => 
                            <option value={f} key={i}>{f}</option>
                        )}
                    </select>
                    )}
                    
                    </div>

                    {/* Année universitaire */}
                    <div className="flex flex-col">
                        <label htmlFor="AU" className="mb-1 font-semibold text-gray-700">Année universitaire :</label>
                        {role === 'etu' ? (
                            <select
                        id="AU"
                        name="AU"
                        defaultValue={filters.AU}
                        onChange={(e)=>setFilters({...filters, AU: e.target.value})}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {Annees.map((A, index) => (
                        <option key={index} value={`${A}-${A+1}`}>{A}-{A+1}</option>
                        ))}
                    </select>
                        ) : (
                            <select
                        id="AU"
                        name="AU"
                        defaultValue={filters.AU}
                        onChange={(e)=>setFilters({...filters, AU: e.target.value})}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {6<MoisActuelle ? (
                            <option value={`${DateActuelle}-${DateActuelle+1}`}>{DateActuelle}-{DateActuelle+1}</option>
                        ) : (
                            <option value={`${DateActuelle-1}-${DateActuelle}`}>{DateActuelle-1}-{DateActuelle}</option>
                        )}
                    </select>
                        )}
                    </div>

                    {/* Type de cours/projet/devoir */}
                    <div className="flex flex-col">
                    <label htmlFor="typeC" className="mb-1 font-semibold text-gray-700">Type de {Type} :</label>
                    <select
                        id="typeC"
                        name="typeC"
                        defaultValue={filters.type}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e)=>setFilters({...filters, type: e.target.value})}
                    >
                        <option value="reseaux">Réseaux</option>
                        <option value="dev">Développement</option>
                        <option value="data">Data</option>
                        <option value="securite">Sécurité</option>
                        <option value="infra">Infrastructure</option>
                    </select>
                    </div>

                    {/* Niveau avec radios */}
                    <div className="flex flex-col">
                    <label className="mb-1 font-semibold text-gray-700">Niveau :</label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                        <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="bac+1"
                            name="bac"
                            checked={Niveau === 'bac+1'}
                            onChange={(e)=>{
                                    setniveaus(e.target.value);
                                    setFilters({...filters, niveau: e.target.value, semestre: "S1"});
                                    }}
                            className="accent-blue-500"
                        />
                        Bac+1
                        </label>
                        <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="bac+2"
                            name="bac"
                            checked={Niveau === 'bac+2'}
                            onChange={(e)=>{
                                    setniveaus(e.target.value);
                                    setFilters({...filters, niveau: e.target.value, semestre: "S3"});
                                    }}
                            className="accent-blue-500"
                        />
                        Bac+2
                        </label>
                    </div>
                    </div>

                    {/* Semestre */}
                    <div className="flex flex-col">
                    <label htmlFor="sem" className="mb-1 font-semibold text-gray-700">Semestre :</label>
                    <select
                        id="sem"
                        name="sem"
                        onChange={(e)=>setFilters({...filters, semestre: e.target.value})}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {semestres.map((s, index) => (
                        <option key={index}>{s}</option>
                        ))}
                    </select>
                    </div>
                    {/* Type TP (Projet / Devoir) */}
                    {showTypeSelect && (<div className="flex flex-col">
                    <label htmlFor="typeTP" className="mb-1 font-semibold text-gray-700">Type :</label>
                    <select
                        id="typeTP"
                        name="typeTP"
                        defaultValue={filters.type_tp}
                        onChange={(e) => setFilters({...filters, type_tp: e.target.value})}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="projet">Projet</option>
                        <option value="devoir">Devoir</option>
                    </select>
                    </div>)}
                    {children}
                    
                    {/* Bouton submit */}
                    {(role === 'etu') && (
                    <button
                        type="submit"
                        onClick={valider}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
                    >
                        Valider
                    </button>)}
                </form>
            </div>

            {/* AFFICHAGE DES COURS SOUS LE FORMULAIRE */}
            {appliedFilters && (
            <div className="mt-4 w-full overflow-x-auto">
                <CadresAffichage userFilter={appliedFilters} type_service={choix} />
            </div>
            )}


        </div>

    )
}

export default FormulaireCPD