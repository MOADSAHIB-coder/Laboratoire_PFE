import { useState } from "react";
import { FaTrash, FaEdit  } from "react-icons/fa";
import SearchBar from "../../components/Dashboard_components/barreRecherche";
import EnseignantLayout from "../../layouts/EnseignantLayout";
import FilterBar from "../../components/Dashboard_components/barreFiltrage";

function ShowDecument({ coursEnvoyes=[] , type='cours' }){

    const [operations, setoperation] = useState(null); // modification et suppression
    const [selectcours, setselectcours] = useState(null)

    return (
        <EnseignantLayout>
            <div className="flex justify-center mb-6">
                <SearchBar placeholder="Rechercher..." />
            </div>
            <FilterBar/>
            <div className="space-y-4 ml-10">
            {coursEnvoyes.length === 0 ? (
                <p>Aucun resultat envoyé pour le moment.</p>
            ) : (
                coursEnvoyes.map((c, i) => (
                <>
                <div
                    key={i}
                    className="border p-4 cursor-pointer rounded-xl bg-white hover:bg-gray-100 flex justify-between items-center"
                    >
                    <div>
                        <b>{c.titre}</b> — {c.date}
                    </div>

                    <div className="flex gap-3">
                        {/* Icon modification */}
                    <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={()=>{setoperation('modi'); setselectcours(c)}}/>

                        {/* Icon suppression */}
                        <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" onClick={()=>{setoperation('del'); setselectcours(c)}}/>
                    </div>
                </div>
                {operations === 'modi' && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white w-[90vw] md:w-[40vw] max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative">

                            {/* Header */}
                            <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
                                <h2 className="text-lg font-semibold text-gray-800">{type} : {selectcours.titre}</h2>
                                <button
                                className="text-gray-400 hover:text-red-500 text-xl"
                                onClick={() => setoperation(null)}
                                >
                                ✕
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-3 text-sm text-gray-700">
                                <p>Êtes-vous sûr(e) de vouloir modifier ce {type} ? </p>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                                <button
                                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                                onClick={() => setoperation(null)}
                                >
                                Fermer
                                </button>
                                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={()=>setoperation('modifPage')}
                                >
                                Modifier
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {operations==='modifPage' && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                        <form 
                            className="bg-white rounded-2xl w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-4xl p-4 sm:p-6 md:p-8 flex flex-col gap-4 overflow-y-auto max-h-[90vh]"
                        >
                            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Modifier le contenu</h2>
                        
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["date","titre","typeTP","filiere","AU","typeC","bac","sem","file"].map((field) => {
                                    // Si c'est le champ typeTP et qu'on n'est pas dans un TP, on ne l'affiche pas
                                    if(field === "typeTP") return null;

                                    return (
                                        <div key={field} className="relative w-full mb-6">
                                        <input
                                            type={field === "date" ? "date" : field === 'file' ? 'file' : "text"}
                                            name={field}
                                            value={field === 'file' ? undefined : selectcours[field]}
                                            onChange={(e) => {
                                                setselectcours({...selectcours, [field]: e.target.value});
                                            }}
                                            placeholder=" "
                                            required
                                            className="peer block w-full border-b-2 border-gray-300 text-gray-900 bg-transparent py-2 px-0 appearance-none focus:outline-none focus:border-blue-600 transition-colors duration-300"
                                        />
                                        <label
                                            htmlFor={field}
                                            className={`absolute left-0 px-1 transition-all duration-300
                                            ${selectcours[field] && selectcours[field].toString().length > 0
                                                ? "top-0 -translate-y-1/2 text-sm text-blue-600"
                                                : "top-2.5 text-base text-gray-400"
                                            }
                                            peer-focus:-translate-y-1/2 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600
                                            `}
                                        >
                                            {field === "date" ? "Date" :
                                            field === "titre" ? "Titre" :
                                            field === "typeTP" ? "Type de TP" :
                                            field === 'filiere' ? "Filiere" : 
                                            field === 'AU' ? 'Annee Universitaire' :
                                            field === 'typeC' ? 'Type de cours' :
                                            field === 'bac' ? 'Niveau' :
                                            field === 'sem' ? 'Semestre ' : 
                                            ''}
                                        </label>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="relative grid grid-cols-1 gap-4 mb-6">
                                <textarea
                                    id="description"
                                    name="description"
                                    value={selectcours['description']}
                                    maxLength={255}
                                    placeholder=" "
                                    required
                                    onChange={(e) =>
                                    setselectcours({ ...selectcours, description: e.target.value })
                                    }
                                    className="peer block w-full border-b-2 border-gray-300 text-gray-900 bg-transparent py-1 pt-5 appearance-none focus:outline-none focus:border-blue-600 transition-colors duration-300"
                                />

                                <label
                                    htmlFor="description"
                                    className={`absolute left-0 px-1 bg-white transition-all duration-300
                                    ${selectcours['description'] && selectcours['description'].length > 0
                                        ? "top-0 -translate-y-1/2 text-sm text-blue-600"
                                        : "top-4 text-base text-gray-400"
                                    }
                                    peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-blue-600
                                    `}
                                >
                                    Description
                                </label>
                                </div>
                                <p className="text-sm text-gray-500 -mt-5">
                                    * La description ne doit pas dépasser un nombre total de 255 caractères.
                                </p>
                            {/* Boutons modal */}
                                <div className="w-full flex justify-end xl:mt-4">
                                    <div className="flex gap-2">
                                    <button 
                                        type="button" 
                                        onClick={()=>setoperation('voir')} 
                                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                    >
                                        Annuler
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        Enregistrer
                                    </button>
                                    </div>
                                </div>
                        </form>
                    </div>
                )}

                {operations === 'del' && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white w-[90vw] md:w-[40vw] max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative">

                            {/* Header */}
                            <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
                                <h2 className="text-lg font-semibold text-gray-800">
                                {type} : {selectcours.titre}
                                </h2>
                                <button
                                className="text-gray-400 hover:text-red-500 text-xl"
                                onClick={() => setoperation(null)}
                                >
                                ✕
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-3 text-sm text-gray-700">
                                <p>Êtes-vous sûr(e) de vouloir supprimer ce {type} ?</p>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                                <button
                                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                                onClick={() => setoperation(null)}
                                >
                                Fermer
                                </button>
                                <button className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                    onClick={()=>setoperation(null)}
                                >
                                Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                </>
                ))
            )}
            </div>
            
        </EnseignantLayout>
    )
}

export default ShowDecument