

function AjouterAuFormulaire({type, DateTimes, info, setInfo}){

    return (
        <>
            <div className="flex flex-col">
                <label htmlFor="date" className="mb-1 font-semibold text-gray-700">Date : </label>
                <input type="datetime-local" id="date" name="date" onChange={(e)=>setInfo({...info, date: e.target.value})} value={DateTimes} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="titre" className="mb-1 font-semibold text-gray-700">Titre de {type}<span className="text-red-500">*</span> : </label>
                <input type="text" id='titre' name="titre" onChange={(e)=>setInfo({...info, titre: e.target.value})} placeholder={`Titre de ${type}...`} required className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            </div>
            
            {/* Fichier à envoyer */}
            <div className="flex flex-col">
                <fieldset className="border border-gray-300 rounded-xl p-3 bg-white shadow-sm">
                    <legend className="font-semibold text-gray-700 px-2 text-sm">
                    Fichier à envoyer<span className="text-red-500">*</span>
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
            <div className="flex flex-col">
                <label htmlFor="description" className="mb-1 font-semibold text-gray-700">Description<span className="text-red-500">*</span> : </label>
                <textarea
                    className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Partagez les détails ou la description ici…"
                    id="description"
                    name="description"
                    required
                    onChange={(e)=>setInfo({...info, description: e.target.value})}
                ></textarea>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Envoyer
                </button>
            </div>
        </>
    )
}

export default AjouterAuFormulaire