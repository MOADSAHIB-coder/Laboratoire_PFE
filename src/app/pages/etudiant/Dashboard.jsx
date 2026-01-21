import EtudiantLayout from "../../layouts/EtudiantLayout";

function Dashboard(){
    const studentImage = ''
    const studenName = ''
    const filiere = ''
    const DevoirProjet = ''
    return (
        <EtudiantLayout>
            <div className=" p-5 h-screen overflow-auto bg-gray-50 flex flex-col gap-6">
                {/* Carte de bienvenue */}
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                    <h2 className="text-2xl font-bold">Bienvenue, {studenName || 'Etudiant Reseaux'} !</h2>
                    <p className="text-gray-600 mt-1">Filière : {filiere || 'Gestion des Reseaux et Securite Informatique'}</p>
                    <p className="mt-2 text-blue-500 font-semibold">
                        Vous avez {DevoirProjet || '0'} TP à compléter cette semaine
                    </p>
                    </div>
                    <img
                        src={studentImage || '/icons/user.png'}
                        alt="visage de Etudiant"
                        className="w-[6.3rem] h-[6.3rem] rounded-full object-cover bg-[#E9F1F2] ml-[3.4rem]"
                    />
                </div>

                {/* Accès rapide aux TP / projets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-blue-500 text-white px-6 py-4 rounded-lg shadow hover:bg-blue-600">
                    Commencer un TP
                    </button>
                    <button className="bg-green-500 text-white px-6 py-4 rounded-lg shadow hover:bg-green-600">
                    Voir Projet Académique
                    </button>
                    <button className="bg-yellow-500 text-white px-6 py-4 rounded-lg shadow hover:bg-yellow-600">
                    Consulter Mes Cours
                    </button>
                </div>
            </div>
        </EtudiantLayout>
    )
}

export default Dashboard