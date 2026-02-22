import EtudiantLayout from "../../layouts/EtudiantLayout"
import FormulaireCPD from "../../components/Dashboard_components/formulaire_CPD";

function EnvoyerTP(){

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Formulaire envoyé avec succès !");
        
    };

    return (
        <div>
            <EtudiantLayout>
                <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4 sm:p-6 md:p-10 gap-6 sm:gap-8 md:gap-10 w-full">
                    <h1 className="text-3xl font-bold mb-6">Espace de soumission des projets et devoirs</h1>

                    <FormulaireCPD
                        Type="TP"
                        showTypeSelect={true} 
                        choix="cours"         
                        role="etuE"            
                        onSubmit={handleSubmit}
                    >
                        {/* Description du TP */}
                        <div className="flex flex-col">
                            <label htmlFor="description" className="mb-1 font-semibold text-gray-700">Description<span className="text-red-500">*</span> :</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Décris ton projet / devoir ici..."
                                required
                                className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            />
                        </div>

                        {/* Fichier à envoyer */}
                        <div className="flex flex-col">
                        <fieldset className="border border-gray-300 rounded-xl p-3 bg-white shadow-sm">
                            <legend className="font-semibold text-gray-700 px-2 text-sm">
                            Fichier à envoyer<span className="text-red-500">*</span>
                            </legend>

                            <input
                            type="file"
                            id="fichier"
                            name="fichier"
                            required
                            className="mt-2 w-full text-gray-700 text-sm file:border file:border-gray-300 file:rounded-lg file:px-3 file:py-2 file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </fieldset>
                        </div>
                        {/* Note informative sous Semestre */}
                        <p className="text-sm sm:text text-gray-500 mt-2">
                            * Tous les champs sont obligatoires. Veuillez joindre le fichier correspondant avant de valider la soumission.
                        </p>
                        <button
                        type="submit"
                        onClick={(e)=>e.preventDefault()}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full sm:w-auto hover:bg-blue-600 transition-colors"
                    >
                        Envoyer le TP
                    </button>
                    </FormulaireCPD>
                </div>

            </EtudiantLayout>
        </div>
    )
}

export default EnvoyerTP