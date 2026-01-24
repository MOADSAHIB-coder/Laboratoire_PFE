// Une formulaire pour les cours Prejets/Devoirs.

import { useState } from "react";
import CadresAffichage from "./structure_affichage_card";

function FormulaireCPD({children, Type, showTypeSelect  }){

    const DateActuelle = new Date().getFullYear();
    const Annees = Array.from({length:7},(_,i) => DateActuelle - 5 + i);

    const [Niveau, setniveaus] = useState('bac+1')
    const semestres = Niveau === 'bac+1' ? ['S1','S2'] : ['S3','S4']

    const [appliedFilters, setAppliedFilters] = useState(null);

    const valider = (e) => {
        e.preventDefault()
        setAppliedFilters(filters);
    }

    const [filters, setFilters] = useState({
        type: "Reseau",
        filiere: "Gestion des reseau et securite",
        niveau: "bac+1",
        semestre: "S1",
        AU: `${DateActuelle-1}-${DateActuelle}`,
        type_tp:'projet'

    });


    

    return (
        <div className="max-w-8xl w-[60vw] mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="max-w-6xl mx-auto p-6">
                <form className="flex flex-col gap-4">

                    {/* Filiere */}
                    <div className="flex flex-col">
                    <label htmlFor="filiere" className="mb-1 font-semibold text-gray-700">Filière :</label>
                    <input
                        type="text"
                        value={filters.filiere}
                        id="filiere"
                        readOnly
                        className="border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    </div>

                    {/* Année universitaire */}
                    <div className="flex flex-col">
                    <label htmlFor="AU" className="mb-1 font-semibold text-gray-700">Année universitaire :</label>
                    <select
                        id="AU"
                        defaultValue={DateActuelle-1}
                        onChange={(e)=>setFilters({...filters, AU: e.target.value})}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {Annees.map((A, index) => (
                        <option key={index} value={`${A}-${A+1}`}>{A}-{A+1}</option>
                        ))}
                    </select>
                    </div>

                    {/* Type de cours/projet/devoir */}
                    <div className="flex flex-col">
                    <label htmlFor="typeC" className="mb-1 font-semibold text-gray-700">Type de {Type} :</label>
                    <select
                        id="typeC"
                        defaultValue={filters.type}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e)=>setFilters({...filters, type: e.target.value})}
                    >
                        <option value="Reseau">Réseaux</option>
                        <option value="dev">Développement</option>
                        <option value="Data">Data</option>
                        <option value="Securite">Sécurité</option>
                        <option value="infrat">Infrastructure</option>
                    </select>
                    </div>

                    {/* Niveau avec radios */}
                    <div className="flex flex-col">
                    <label className="mb-1 font-semibold text-gray-700">Niveau :</label>
                    <div className="flex items-center gap-6">
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
                    <button
                    type="submit"
                    onClick={valider}
                    className="mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                    Valider
                    </button>
                </form>
            </div>

            {/* AFFICHAGE DES COURS SOUS LE FORMULAIRE */}
            {appliedFilters && (
            <div className="mt-4">
                <CadresAffichage userFilter={appliedFilters} />
            </div>
            )}


        </div>

    )
}

export default FormulaireCPD