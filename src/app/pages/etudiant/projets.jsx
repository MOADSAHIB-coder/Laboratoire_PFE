import FormulaireCPD from "../../components/Dashboard_components/formulaire_CPD";
import EtudiantLayout from "../../layouts/EtudiantLayout";

function Projets(){

    return (
        <EtudiantLayout>
            <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4 sm:p-6 md:p-10 gap-6 sm:gap-8 md:gap-10 w-full">
                <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 max-w-full sm:max-w-2xl md:max-w-3xl px-4">
                    Accédez dès maintenant à vos projets et devoirs en attente
                </h2>

                <FormulaireCPD 
                    Type="Projets/Devoirs"
                    choix='tp'
                    showTypeSelect={true} // <-- Affiche le select Projet/Devoir
                    role='etu'
                >

                    {/* Note informative sous Semestre */}
                        <p className="text-sm sm:text text-gray-500 mt-2">
                            * Après avoir complété ce formulaire avec vos informations essentielles, le système générera automatiquement la liste des devoirs et projets correspondant à vos critères, vous offrant un accès immédiat et clair aux travaux qui vous concernent.
                        </p>
                </FormulaireCPD>
                
            </div>
        </EtudiantLayout>

    );
};

export default Projets