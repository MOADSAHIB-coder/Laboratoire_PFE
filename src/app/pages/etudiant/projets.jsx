import FormulaireCPD from "../../components/formulaire_CPD";
import EtudiantLayout from "../../layouts/EtudiantLayout";

function Projets(){

    return (
        <EtudiantLayout>
            <div className="min-h-screen flex flex-col items-center bg-gray-50 p-10 gap-10">
                <h2 className="text-center text-3xl font-bold text-gray-800 max-w-3xl">
                    Accédez dès maintenant à vos projets et devoirs en attente
                </h2>

                <FormulaireCPD 
                    Type="Projets/Devoirs"
                    showTypeSelect={true} // <-- Affiche le select Projet/Devoir
                >

                    {/* Note informative sous Semestre */}
                        <p className="text-sm text-gray-500 mt-1">
                            * Après avoir complété ce formulaire avec vos informations essentielles, le système générera automatiquement la liste des devoirs et projets correspondant à vos critères, vous offrant un accès immédiat et clair aux travaux qui vous concernent.
                        </p>
                </FormulaireCPD>
                
            </div>
        </EtudiantLayout>

    );
};

export default Projets