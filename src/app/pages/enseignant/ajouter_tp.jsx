import EnvoyerDevoirCours from "../../components/addTpCoursenseignant";
import EnseignantLayout from "../../layouts/EnseignantLayout";

function Ajoutertp(){

    return (
        <div>
            <EnseignantLayout>
                <EnvoyerDevoirCours
                    type='TP'
                    bool={true}
                    role='ens'
                    type_evect='Devoir'
                >
                    <img src="/images/ex_ens.png" alt="" className="lg:w-96 lg:h-96 xl:mt-20"/>
                </EnvoyerDevoirCours>
            </EnseignantLayout>
        </div>
    )
}

export default Ajoutertp