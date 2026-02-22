import { useState } from "react";
import FormulaireCPD from "./formulaire_CPD";
import AjouterAuFormulaire from "./forme_EnseignantPlus";
import SuccessModal from "./fenetreValidation";
import { TP_TEST } from "./DataTest";

function EnseignantChoix({setchoixTraitement, choixTraitement, type_evect, bool, type, role}){

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

    // Dans AjouterCours, quand tu envoies le cours :
    const AjouterCours = (e) => {
        e.preventDefault();
        setCoursEnvoyes([...coursEnvoyes, info]);
        setInfo({ date: DateTime, titre: "", description: "" });
        setchoixTraitement('valide')
    };

    const [coursEnvoyes, setCoursEnvoyes] = useState([]);
    const [info, setInfo] = useState({
        date: DateTime,
        titre: "",
        description: ""
    });

    const [tpSelected, setTpSelected] = useState(null);
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [typeCorrection, setTypeCorrection] = useState("globale");
    const [visibilite, setVisibilite] = useState("etudiant");

    const handleTPChange = (e) => {
        const tp = TP_TEST.find(t => t.id === Number(e.target.value));
        setTpSelected(tp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tpSelected || !description || !file) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
        }

        const payload = {
        tp: tpSelected,
        description,
        file,
        typeCorrection,
        visibilite
        };

        console.log("Correction envoyée :", payload);
        alert("Correction envoyée avec succès ✅");
    };

    return (
        <>
            {choixTraitement === 'envoyer' && (
                    <>
                    <div 
                        onClick={()=>setchoixTraitement(null)}
                        className="cursor-pointer text-blue-500 font-semibold px-6 py-3 hover:text-blue-700 transition flex items-center justify-center w-max"
                    >
                        ← Retour à la page précédente
                        </div>
                    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-10 gap-10">
                        <h2 className="text-center text-3xl font-bold text-gray-800 max-w-5xl">
                            Veuillez renseigner toutes les informations pertinentes du {type} afin de permettre un envoi complet et précis aux étudiants.
                        </h2>
                    <FormulaireCPD
                        Type={type_evect}
                        showTypeSelect={bool}
                        choix={type}
                        role={role}
                        onSubmit={AjouterCours}
                    >
                        <AjouterAuFormulaire DateTimes={DateTime} info={info} setInfo={setInfo} type={type}/>
                    </FormulaireCPD>
                    </div>
                    </>
                )}

                {choixTraitement === 'correction' && (
                    <div>
                        <div 
                        onClick={()=>setchoixTraitement(null)}
                        className="cursor-pointer text-blue-500 font-semibold px-6 py-3 hover:text-blue-700 transition flex items-center justify-center w-max"
                    >
                        ← Retour à la page précédente
                        </div>

                        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-10 gap-10">
                        <h2 className="text-center text-3xl font-bold text-gray-800 max-w-5xl">
                            Veuillez renseigner toutes les informations pertinentes de la correction afin de garantir une transmission claire et complète aux étudiants.
                        </h2>
                        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[90%] xl:w-[80%] mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
                            <div className="w-full mx-auto p-3 sm:p-6">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    {/* Sélection TP */}
                                    <div className="flex flex-col">
                                    <label className="font-semibold text-gray-700 mb-1">
                                        TP concerné <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        required
                                        onChange={handleTPChange}
                                        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">-- Sélectionner un TP --</option>
                                        {TP_TEST.map(tp => (
                                        <option key={tp.id} value={tp.id}>
                                            {tp.titre}
                                        </option>
                                        ))}
                                    </select>
                                    </div>

                                    {/* Infos TP */}
                                    {tpSelected && (
                                    <div className="bg-gray-50 border rounded-lg p-3 text-sm text-gray-700">
                                        <p><b>Filière :</b> {tpSelected.filiere}</p>
                                        <p><b>Niveau :</b> {tpSelected.niveau}</p>
                                        <p><b>Semestre :</b> {tpSelected.semestre}</p>
                                        <p><b>Année :</b> {tpSelected.annee}</p>
                                    </div>
                                    )}

                                    {/* Description */}
                                    <div className="flex flex-col">
                                    <label className="font-semibold text-gray-700 mb-1">
                                        Description de la correction <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Explique les erreurs fréquentes, remarques, conseils..."
                                        rows={4}
                                        className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    />
                                    </div>
                                        
                                    {/* Fichier à envoyer */}
                                    <div className="flex flex-col">
                                        <fieldset className="border border-gray-300 rounded-xl p-3 bg-white shadow-sm">
                                            <legend className="font-semibold text-gray-700 px-2 text-sm">
                                            Document de correction <span className="text-red-500">*</span>
                                            </legend>
                                            <div className=" flex items-center gap-4">
                                                <label htmlFor="file" id="file" name='file' className="font-semibold text-gray-700 md:whitespace-nowrap">Veuillez sélectionner le {type} : </label>
                                                <input
                                                type="file"
                                                id="fichier"
                                                name="fichier"
                                                required
                                                multiple
                                                className="mt-2 text-gray-700 text-sm file:border file:border-gray-300 file:rounded-lg file:px-3 file:py-2 file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                        </fieldset>
                                    </div>

                                    {/* Bouton */}
                                    <button
                                    type="submit"
                                    className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                    Envoyer la correction
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>                        
                </div>
                )}
                {choixTraitement === 'valide' && (
                    <SuccessModal onClose={()=>setchoixTraitement('envoyer')} type={type}/>
                )}
        </>
    )
}

export default EnseignantChoix