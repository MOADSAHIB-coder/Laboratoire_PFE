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
                    <img src="/images/ex_ens.png" alt="" className="ml-[15rem]"/>
                </EnvoyerDevoirCours>
            </EnseignantLayout>
        </div>
    )
}

export default Ajoutertp