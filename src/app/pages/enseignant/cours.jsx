import EnvoyerDevoirCours from "../../components/addTpCoursenseignant";
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
                    <img src="/images/c_ens.png" alt="" className="ml-[15rem]"/>
                </EnvoyerDevoirCours>
            </EnseignantLayout>
        </div>
    )
}

export default AjouterCours