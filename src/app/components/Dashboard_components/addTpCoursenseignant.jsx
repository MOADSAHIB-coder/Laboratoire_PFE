import { useState } from "react";
import EnseignantChoix from "./EnseignantTPC";

function EnvoyerDevoirCours({ children ,type, bool, role, type_evect}){

    const [choixTraitement, setchoixTraitement] = useState(null)// soit envoyer soit voir

    return (
        <>
        {choixTraitement === null && (
            <div className="ml-0 h-auto flex flex-col items-center space-y-6 relative">
                {children}
                    <div className="flex flex-col xl:flex-row lg:space-y-6 lg:space-x-0 items-center space-y-4 xl:space-y-0 xl:space-x-11">
                        {/* Bouton bleu */}
                        <div
                            onClick={() => setchoixTraitement('envoyer')}
                            className="bg-blue-500 text-white text-2xl font-bold px-8 py-6 rounded-lg shadow-lg cursor-pointer hover:bg-blue-600 transition xl:w-[35rem] xl:h-20 xl:text-2xl xl:px-10 xl:py-6 lg:w-96 lg:h-16 lg:text-lg lg:px-5 lg:py-4 lg:text-center"
                        >
                            Envoyer un nouveau {type} aux etudiant
                        </div>

                        {/* Bouton vert */}
                            { type!=='Cours' &&
                                (<div
                                onClick={() => setchoixTraitement('correction')}
                                className="bg-green-500 text-white text-2xl font-bold px-8 py-4 rounded-lg shadow-lg cursor-pointer hover:bg-green-600 transition xl:w-[35rem] xl:px-10 xl:py-6 xl:h-20 xl:text-2xl lg:w-96 lg:h-16 lg:text-lg lg:px-5 lg:text-center"
                                >
                                    <p>Envoyer la correction du TP </p>                       
                                </div>)
                            }
                    </div>
            </div>
                )}

                    <EnseignantChoix 
                        setchoixTraitement={setchoixTraitement}
                        choixTraitement={choixTraitement}
                        type_evect={type_evect}
                        bool={bool}
                        type={type}
                        role={role}
                    />
                    </>
    )
}

export default EnvoyerDevoirCours