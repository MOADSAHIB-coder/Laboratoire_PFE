import SideBar from "../components/sidebar";
import Header from "../components/header";

function EtudiantLayout({children}){


    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <SideBar
                val1="Mes cours" 
                val2="Devoirs/Projets" 
                val3="Realiser TP" 
                icon1='/icons/cours.png'
                icon2='/icons/devoir.png'
                icon3='/icons/tp.png'
                link1='/etudiant/mes-cours'
                link2='/etudiant/projets-devoirs'
                link3='/etudiant/tps'
            />

            {/* Main Content */}
            <main className="ml-[20rem] p-5 overflow-auto h-screen">
                <Header />
                {children}
            </main>
        </div>

    );
}

export default EtudiantLayout