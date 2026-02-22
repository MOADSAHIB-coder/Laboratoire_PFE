import Header from "../components/Dashboard_components/header"
import SideBar from "../components/Dashboard_components/sidebar"

function EnseignantLayout({children}){

    return(
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <SideBar
                val1="Cours enseignés" 
                val2="Travaux Académiques" 
                val3="TP réalisés" 
                icon1='/icons/cours.png'
                icon2='/icons/devoir.png'
                icon3='/icons/tp.png'
                link0='/enseignant/decument'
                link1='/enseignant/dashboard'
                link2='/enseignant/mes-cours'
                link3='/enseignant/mes-travaux'
                link4='/enseignant/tps-etudiant'
                link5='/enseignant/discussion'
                link6='/enseignant/statistique'
                link7='/enseignant/parametres'
                link8='/enseignant/profil'
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
    )
}

export default EnseignantLayout