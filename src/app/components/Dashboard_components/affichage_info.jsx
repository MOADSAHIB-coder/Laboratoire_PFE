

function AffichageInfos({children, selectedCours, setSelectedCours}){

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
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
                    {children}
                </div>
            </div>
    )
}

export default AffichageInfos