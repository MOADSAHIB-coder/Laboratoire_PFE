import EtudiantLayout from "../../layouts/EtudiantLayout";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);
function Projets(){

    /// Statistiques
    const devoirsTermines = 3;
    const devoirsEnCours = 2;
    const projetsTermines = 1;
    const projetsEnCours = 1;
    //const [devoirs, setDevoirs] = useState('')
    //const [projets, setProjets] = useState('')

    const AffichierResultat = () => {
        
    }

    // Graph 1: Progression Devoirs & Projets
    const dataProgress = {
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

    


    return (
        <EtudiantLayout>
            <div className="min-h-screen flex flex-col items-center bg-gray-50 p-10 gap-10">
                <h2 className="text-center text-3xl font-bold text-gray-800 max-w-3xl">
                    Accédez dès maintenant à vos projets et devoirs en attente
                </h2>

                <div className="flex flex-wrap justify-center gap-10 w-full">
                    {/* Graph Progression */}
                    <div className="bg-white p-5 rounded-2xl shadow-xl max-w-[60vh] max-h-[40vh] w-full">
                    <h3 className="text-xl font-semibold mb-4 text-center">
                        Progression Devoirs & Projets
                    </h3>
                    <Bar data={dataProgress} />
                    </div>

                    {/* Graph Répartition */}
                    <div className="bg-white p-5 rounded-2xl shadow-xl max-w-[60vh] max-w-[30vh] w-full">
                    <h3 className="text-xl font-semibold mb-4 text-center">
                        Répartition Devoirs vs Projets
                    </h3>
                    <Doughnut data={dataRepartition} />
                    </div>
                </div>
            </div>
        </EtudiantLayout>

    );
};

export default Projets