import EtudiantLayout from "../../layouts/EtudiantLayout";
import { Bar } from "react-chartjs-2";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, RadialLinearScale, Title, Tooltip, Legend } from "chart.js";

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


function MesCours(){

    //const totalCours = 12; // total cours dans le système
    const coursTermine = 4; // comme bien de cours l'utilisateur faire
    const coursEncours = 2;
    const coursPasCommence = 6;

    // Graph1: progression détaillée
    const dataProgress = {
        labels: ["Terminé", "En cours", "Pas commencé"],
        datasets: [
        {
            label: "Cours",
            data: [coursTermine, coursEncours, coursPasCommence],
            backgroundColor: ["#4CAF50", "#FFC107", "#E0E0E0"],
        },
        ],
    };

    // Graph 2: 
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
            <div className="p-5 h-screen overflow-auto bg-gray-50 flex flex-wrap justify-center gap-10">
                {/* Graph1 */}
                <div className="bg-white p-5 rounded-2xl shadow-xl flex-1 min-w-[20px] max-w-[400px] max-h-[400px]">
                    <h2 className="text-xl font-semibold mb-6 text-center">Progression de l'utilisateur</h2>
                    <Bar data={dataProgress} />
                </div>

                {/* Graph2 */}
                <div className="bg-white p-5 rounded-2xl shadow-xl flex-1 min-w-[350px] max-w-[400px] max-h-[400px]">
                    <h2 className="text-xl font-semibold mb-6 text-center">Distribution par type de cours</h2>
                    <Radar data={dataRadar} options={optionsRadar} />
                </div>
            </div>

        </EtudiantLayout>

    );
};

export default MesCours