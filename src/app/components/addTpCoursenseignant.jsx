import { useState } from "react";
import FormulaireCPD from "../components/formulaire_CPD";
import { FaTrash, FaEdit  } from "react-icons/fa";


function EnvoyerDevoirCours({ children ,type, bool, role, type_evect}){

    //Date standard
    const now = new Date()
    //jour
    const jour = String(now.getDate()).padStart(2,'0');
    //Mois
    const mois = String(now.getMonth()+1).padStart(2,'0')
    //Annee
    const annee = now.getFullYear()
    //heur
    const heur = String(now.getHours()).padStart(2,'0')
    //minute
    const minute = String(now.getMinutes()).padStart(2,'0')
    //seconde
    const s = String(now.getSeconds()).padStart(2,'0')
    // Affichage formater
    const DateTime = `${annee}-${mois}-${jour}T${heur}:${minute}:${s}`

    const [choixTraitement, setchoixTraitement] = useState(null)// soit envoyer soit voir
    const [info, setInfo] = useState({
        date: DateTime,
        titre: "",
        description: ""
    });

    const [coursEnvoyes, setCoursEnvoyes] = useState([]);
    const [operations, setoperation] = useState(null); // modification et suppression
    const [selectcours, setselectcours] = useState(null)

    // Dans AjouterCours, quand tu envoies le cours :
    const AjouterCours = (e) => {
        e.preventDefault();
        setCoursEnvoyes([...coursEnvoyes, info]);
        setInfo({ date: DateTime, titre: "", description: "" });
    };

    return (
        <>
        {choixTraitement === null && (
            <div className="ml-0 h-auto flex flex-col items-center space-y-6 relative">
                {children}
                    <div className="flex flex-col xl:flex-row items-center space-y-4 xl:space-y-0 xl:space-x-11">
                        {/* Bouton bleu */}
                        <div
                            onClick={() => setchoixTraitement('envoyer')}
                            className="bg-blue-500 text-white text-2xl font-bold px-10 py-6 rounded-lg shadow-lg cursor-pointer hover:bg-blue-600 transition"
                        >
                            Envoyer un nouveau {type} aux étudiants
                        </div>

                        {/* Bouton vert */}
                        <div
                            onClick={() => setchoixTraitement('voir')}
                            className="bg-green-500 text-white text-2xl font-bold px-10 py-6 rounded-lg shadow-lg cursor-pointer hover:bg-green-600 transition"
                        >
                            Voir les {type} envoyés aux étudiants
                        </div>
                    </div>
            </div>
                )}

                {choixTraitement === 'envoyer' && (
                    <>
                    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-10 gap-10">
                        <h2 className="text-center text-3xl font-bold text-gray-800 max-w-5xl">
                            Veuillez renseigner toutes les informations pertinentes du {type} afin de permettre un envoi complet et précis aux étudiants.
                        </h2>
                    <FormulaireCPD
                        Type={type_evect}
                        showTypeSelect={bool}
                        choix={type}
                        role={role}
                    >
                        <div className="flex flex-col">
                            <label htmlFor="date" className="mb-1 font-semibold text-gray-700">Date : </label>
                            <input type="datetime-local" onChange={(e)=>setInfo({...info, date: e.target.value})} value={DateTime} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="titre" className="mb-1 font-semibold text-gray-700">Titre : </label>
                            <input type="text" id='titre' onChange={(e)=>setInfo({...info, titre: e.target.value})} placeholder="Titre de cours..." className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                        </div>
                        <div className=" flex-col">
                            <label htmlFor="date" className="mb-1 font-semibold text-gray-700">Veuillez sélectionner le {type} : </label>
                            <input type="file" multiple />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="date" className="mb-1 font-semibold text-gray-700">Description : </label>
                            <textarea
                                className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="Partagez les détails ou la description ici…"
                                onChange={(e)=>setInfo({...info, description: e.target.value})}
                            ></textarea>
                            <button
                                type="submit"
                                onClick={(e)=>AjouterCours(e)}
                                className="mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                            >
                                Envoyer
                            </button>
                        </div>
                    </FormulaireCPD>
                    </div>
                    <div 
                        onClick={()=>setchoixTraitement(null)}
                        className="m-11 cursor-pointer bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 hover:shadow-lg transition flex items-center justify-center w-max"
                    >
                        ← Retour à la page précédente
                    
                    </div>
                    </>
                )}

                {choixTraitement === 'voir' && (
                    <>
                        <div
                        onClick={() => setchoixTraitement(null)}
                        className="cursor-pointer text-blue-500 mb-4"
                        >
                        ← Retour à la page précédente
                        </div>

                        <div className="space-y-4">
                        {coursEnvoyes.length === 0 ? (
                            <p>Aucun {type} envoyé pour le moment.</p>
                        ) : (
                            coursEnvoyes.map((c, i) => (
                            <>
                            <div
                                key={i}
                                className="border p-4 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
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
                                            <h2 className="text-lg font-semibold text-gray-800">{selectcours.titre}</h2>
                                            <button
                                            className="text-gray-400 hover:text-red-500 text-xl"
                                            onClick={() => setoperation(null)}
                                            >
                                            ✕
                                            </button>
                                        </div>

                                        {/* Body */}
                                        <div className="p-6 space-y-3 text-sm text-gray-700">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <p><span className="font-medium">Date :</span> {selectcours.date}</p>
                                                <p><span className="font-medium">Description :</span> {selectcours.description}</p>
                                            </div>
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
                                                onClick={()=>setoperation(null)}
                                            >
                                            Modifier
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {operations === 'del' && (
                                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                                    <div className="bg-white w-[90vw] md:w-[40vw] max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative">

                                        {/* Header */}
                                        <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
                                            <h2 className="text-lg font-semibold text-gray-800">
                                            {selectcours.titre}
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
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <p><span className="font-medium">Date :</span> {selectcours.date}</p>
                                                <p><span className="font-medium">Description :</span> {selectcours.description}</p>
                                            </div>
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
                        
                    </>
                    )}
                    </>
    )
}

export default EnvoyerDevoirCours