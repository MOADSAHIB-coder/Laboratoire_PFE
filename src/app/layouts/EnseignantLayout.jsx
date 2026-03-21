import Header from "../components/header";
import SideBar from "../components/sidebar";

function EnseignantLayout({ children }) {
  return (
    <>
      {/* Sidebar */}
      <SideBar
        val1="Cours enseignés"
        val2="Ajouter devoirs"
        val3="TP réalisés par les étudiants"
        icon1="/icons/cours.png"
        icon2="/icons/devoir.png"
        icon3="/icons/tp.png"
        link1="/enseignant/dashboard"
        link2="/enseignant/mes-cours"
        link3="/enseignant/mes-travaux"
        link4="/enseignant/tps-etudiant"
        link5="/enseignant/discussion"
        link6="/enseignant/statistique"
        link7="/enseignant/parametres"
        link8="/enseignant/profil"
      />

      {/* Main Content */}
      <div className="flex-1 ml-[20rem] flex flex-col h-screen">
        {/* Header fixe en haut */}
        <Header />

        {/* Contenu scrollable */}
        <main className="flex-1 overflow-auto p-5 bg-gray-50">{children}</main>
      </div>
    </>
  );
}

export default EnseignantLayout;
