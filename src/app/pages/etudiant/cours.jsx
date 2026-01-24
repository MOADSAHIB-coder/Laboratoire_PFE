import EtudiantLayout from "../../layouts/EtudiantLayout";
import FormulaireCPD from "../../components/formulaire_CPD";

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

    
    


    return (
        <EtudiantLayout>
            <div className="min-h-screen flex flex-col items-center bg-gray-50 p-10 gap-10">
                <h2 className="text-center text-3xl font-bold text-gray-800 max-w-3xl">
                    Découvrez vos cours et commencez votre apprentissage
                </h2>

                <FormulaireCPD 
                    Type="Cours"
                    showTypeSelect={false} // <-- Ne montre pas le select
                >
                    {/* Note informative sous Semestre */}
                        <p className="text-sm text-gray-500 mt-1">
                            * Après avoir rempli ce formulaire avec vos informations de base, le système vous présentera automatiquement la liste des cours disponibles correspondant aux critères que vous avez saisis, vous permettant ainsi d’accéder rapidement aux contenus qui vous concernent.
                        </p>
                </FormulaireCPD>

            </div>

        </EtudiantLayout>

    );
};

export default MesCours