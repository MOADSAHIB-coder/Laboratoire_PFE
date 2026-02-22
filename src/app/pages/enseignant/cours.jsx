import EnvoyerDevoirCours from "../../components/Dashboard_components/addTpCoursenseignant";
import EnseignantLayout from "../../layouts/EnseignantLayout";


function AjouterCours(){

    

    return (
        <div>
            <EnseignantLayout>
                <EnvoyerDevoirCours 
                    type='Cours'
                    bool={false}
                    role='ens'
                    type_evect='Cours'
                >
                    <img src="/images/cours_back.png" alt=""/>
                </EnvoyerDevoirCours>
            </EnseignantLayout>
        </div>
    )
}

export default AjouterCours