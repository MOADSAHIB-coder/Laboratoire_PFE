import EtudiantLayout from "../../layouts/EtudiantLayout";
import { useState } from "react";

function TP(){

    const [Niveau, setniveaus] = useState('bac+1')
    const semestres = Niveau === 'bac+1' ? ['S1','S2'] : ['S3','S4']


    const valider = (e) => {
        e.preventDefault()
    }

    const [filters, setFilters] = useState({
        type: "Reseau",
        filiere: "Gestion des reseau et securite",
        niveau: "bac+1",
        semestre: "S1",

    });
    
    
    return (
        <EtudiantLayout>
            <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-10 gap-6 sm:gap-8">
                <h2 className="text-center text-3xl font-bold text-gray-800 max-w-3xl">
                    Créez votre TP sur mesure et explorez vos compétences avec un contenu adapté à votre parcours
                </h2>

                <div className="w-full max-w-full sm:max-w-[90%] md:max-w-[70%] lg:max-w-[100%] xl:w-[90%] mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg">
                    <div className="max-w-6xl mx-auto p-6">
                        <form className="flex flex-col gap-4 w-full">
                            {/* Filiere */}
                            <div className="flex flex-col">
                            <label htmlFor="filiere" className="mb-1 font-semibold text-gray-700">Filière :</label>
                            <input
                                type="text"
                                value={filters.filiere}
                                id="filiere"
                                readOnly
                                className="border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-3 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                            />
                            </div>

                            {/* Type de cours/projet/devoir */}
                            <div className="flex flex-col">
                            <label htmlFor="typeC" className="mb-1 font-semibold text-gray-700">Type de TP :</label>
                            <select
                                id="typeC"
                                defaultValue={filters.type}
                                className="border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                                onChange={(e)=>setFilters({...filters, type: e.target.value})}
                            >
                                <option value="Reseau">Réseaux</option>
                                <option value="dev" disabled>Développement</option>
                                <option value="Data" disabled>Data</option>
                                <option value="Securite" disabled>Sécurité</option>
                                <option value="infrat" disabled>Infrastructure</option>
                            </select>
                            </div>

                            {/* Niveau avec radios */}
                            <div className="flex flex-col">
                            <label className="mb-1 font-semibold text-gray-700">Niveau :</label>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
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
                                    className="border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-3 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
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
                                    className="border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-3 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
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
                                className="border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                            >
                                {semestres.map((s, index) => (
                                <option key={index}>{s}</option>
                                ))}
                            </select>
                            </div>
                            {/* Note informative sous Semestre */}
                            <p className="text-sm sm:text text-gray-500 mt-2 sm:mt-3">
                                * Sélectionnez le semestre et cliquez sur "Valider" pour générer un TP exemple basé sur vos choix. 
                                <u>(Ceci est une version de démonstration, la génération réelle sera disponible ultérieurement.)</u>
                                <br />
                                * La génération automatique des travaux pratiques (TP) est, pour le moment, limitée uniquement aux TP de réseaux.
                            </p>

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

                </div>
                
            </div>
            
        </EtudiantLayout>
    )
}

export default TP