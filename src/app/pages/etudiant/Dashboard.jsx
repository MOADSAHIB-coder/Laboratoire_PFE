import EtudiantLayout from "../../layouts/EtudiantLayout";
import { Link } from "react-router-dom";
import { Bar, Doughnut, Radar } from "react-chartjs-2";
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    ArcElement, 
    PointElement, 
    LineElement, 
    RadialLinearScale, 
    Title, 
    Tooltip, Legend } from "chart.js";


ChartJS.register(
  CategoryScale,     // pour Bar chart (axe X)
  LinearScale,       // pour Bar et Line chart (axe Y)
  BarElement,        // pour Bar chart
  ArcElement,        // pour Pie/Doughnut
  PointElement,      // pour Line et Radar chart
  LineElement,       // pour Line et Radar chart
  RadialLinearScale, // pour Radar chart
  Title,
  Tooltip,
  Legend
);

function Dashboard(){
    const studentImage = ''
    const studenName = ''
    const filiere = ''
    const DevoirProjet = ''

    /// Statistiques
    const devoirsTermines = 3;
    const devoirsEnCours = 2;
    const projetsTermines = 1;
    const projetsEnCours = 1;
    //const [devoirs, setDevoirs] = useState('')
    //const [projets, setProjets] = useState('')

    //const totalCours = 12; // total cours dans le système
    const coursTermine = 4; // comme bien de cours l'utilisateur faire
    const coursEncours = 2;
    const coursPasCommence = 6;


    // Graph 1: Progression Devoirs & Projets
    const dataProgress1 = {
        labels: ["Devoirs Terminés", "Devoirs En cours", "Projets Terminés", "Projets En cours"],
        datasets: [
        {
            label: "Progression académique",
            data: [devoirsTermines, devoirsEnCours, projetsTermines, projetsEnCours],
            backgroundColor: ["#22c55e", "#facc15", "#3b82f6", "#a855f7"],
            borderRadius: 8,
        },
        ],
    };

    // Graph 2: Répartition globale
    const dataRepartition = {
        labels: ["Total Devoirs", "Total Projets"],
        datasets: [
        {
            data: [
            devoirsTermines + devoirsEnCours,
            projetsTermines + projetsEnCours,
            ],
            backgroundColor: ["#3b82f6", "#ec4899"],
        },
        ],
    };

    // Graph3: progression détaillée
    const dataProgress2 = {
        labels: ["Terminé", "En cours", "Pas commencé"],
        datasets: [
        {
            label: "Cours",
            data: [coursTermine, coursEncours, coursPasCommence],
            backgroundColor: ["#4CAF50", "#FFC107", "#E0E0E0"],
        },
        ],
    };

    // Graph 4: 
    const courseTypes = ["Réseaux", "Développement", "Sécurité", "Infrastructure", "Data"];
    const coursesPerType = [5, 8, 3, 4, 6]; // exemple: nombre de cours par type

    const dataRadar = {
        labels: courseTypes,
        datasets: [
            {
            label: "Nombre de cours",
            data: coursesPerType,
            backgroundColor: "rgba(33, 150, 243, 0.2)",
            borderColor: "#2196F3",
            borderWidth: 2,
            pointBackgroundColor: "#2196F3",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#2196F3",
            },
        ],
        };

    const optionsRadar = {
        responsive: true,
        scales: {
            r: { // axe radial
            min: 0,
            ticks: {
                stepSize: 2, // intervalle entre les cercles
            },
            },
        },
        };

    return (
        <EtudiantLayout>
            <div className=" p-5 h-screen overflow-auto [&::-webkit-scrollbar]:hidden bg-gray-50 flex flex-col gap-6" 
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
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
                    <Link to='/etudiant/tps' className="bg-blue-500 text-white px-6 py-4 rounded-lg shadow hover:bg-blue-600 hover:font-bold text-center">
                        <button >
                        Commencer un TP
                        </button>
                    </Link>

                    <Link to='/etudiant/projets-devoirs' className="bg-green-500 text-white px-6 py-4 rounded-lg shadow hover:bg-green-600 hover:font-bold text-center">
                        <button >
                        Voir Projet Académique
                        </button>
                    </Link>
                    <Link to='/etudiant/mes-cours' className="bg-yellow-500 text-white px-6 py-4 rounded-lg shadow hover:bg-yellow-600 hover:font-bold text-center">
                        <button >
                        Consulter Mes Cours
                        </button>
                    </Link>
                </div>
                <div className="flex flex-wrap justify-center gap-10 w-full">

                    {/* Colonne 1: Graph1 devant Graph4 */}
                    <div className="flex flex-col gap-10">
                        <div className="bg-white p-5 rounded-2xl shadow-xl max-w-[70vw] max-h-[60vh] w-[30vw] h-[40vh]">
                        <h3 className="text-xl font-semibold mb-4 text-center">
                            Progression Devoirs & Projets
                        </h3>
                        <Bar data={dataProgress1} />
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-xl max-w-[70vw] max-h-[60vh] w-[30vw] h-[40vh]">
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Progression de l'utilisateur
                        </h2>
                        <Bar data={dataProgress2} />
                        </div>
                    </div>

                    {/* Colonne 2: Graph2 devant Graph3 */}
                    <div className="flex flex-col gap-10">
                        <div className="bg-white p-5 rounded-2xl shadow-xl max-w-[70vw] w-[20vw]">
                        <h3 className="text-xl font-semibold mb-4 text-center">
                            Répartition Devoirs vs Projets
                        </h3>
                        <Doughnut data={dataRepartition} />
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-xl max-w-[70vw] w-[20vw]">
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Distribution par type de cours
                        </h2>
                        <Radar data={dataRadar} options={optionsRadar} />
                        </div>
                    </div>

                </div>
            </div>
        </EtudiantLayout>
    )
}

export default Dashboard