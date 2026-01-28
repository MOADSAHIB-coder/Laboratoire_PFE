import SideBar from "../components/sidebar";
import Header from "../components/header";

function EtudiantLayout({children}){


    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <SideBar
                val1="Mes cours" 
                val2="Devoirs en cours" 
                val3="TP Virtuel" 
                icon1='/icons/cours.png'
                icon2='/icons/devoir.png'
                icon3='/icons/tp.png'
                link1='/etudiant/dashboard'
                link2='/etudiant//mes-cours'
                link3='/etudiant/projets-devoirs'
                link4='/etudiant/tps'
                link5='/etudiant/discussion'
                link6='/etudiant/statistique'
                link7='/etudiant/parametres'
                link8='/etudiant/profil'
            />

            {/* Main Content */}
            <div className="flex-1 pl-[20vw] flex flex-col overflow-auto">
                    {/* Header fixe en haut */}
                    <Header />

                    {/* Contenu scrollable */}
                    <main className="flex-1 overflow-auto bg-gray-50 pt-[1rem] px-5">
                    {children}
                    </main>
                </div>
            </div>

    );
}

export default EtudiantLayout