import SideBar from "../components/sidebar";
import Header from "../components/header";

function EtudiantLayout({children}){


    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <SideBar
                val1="Mes cours" 
                val2="Devoirs en cours" 
                val3="Réaliser TP Virtuel" 
                icon1='/icons/cours.png'
                icon2='/icons/devoir.png'
                icon3='/icons/tp.png'
                link1='/etudiant/mes-cours'
                link2='/etudiant/projets-devoirs'
                link3='/etudiant/tps'
            />

            {/* Main Content */}
            <div className="flex-1 ml-[20rem] flex flex-col h-screen">
                    {/* Header fixe en haut */}
                    <Header />

                    {/* Contenu scrollable */}
                    <main className="flex-1 overflow-auto p-5 bg-gray-50">
                    {children}
                    </main>
                </div>
            </div>

    );
}

export default EtudiantLayout