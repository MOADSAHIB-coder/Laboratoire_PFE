import { useState } from "react";
import EtudiantLayout from "../../layouts/EtudiantLayout";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaMapMarkerAlt, FaGraduationCap,FaCalendarAlt, FaCertificate } from "react-icons/fa";

const etudiantData = {
    // IDENTITÉ
    nom: "SAHIB",
    prenom: "MOAD",
    genre: "Homme",
    matricule: "ETU2026001",
    dateNaissance: "2003-05-12",
    lieuNaissance: "Casablanca, Maroc",
    photo: "/icons/user.png",

    // CONTACT
    email: "moad.sahib@example.com",
    telPrincipal: "+212612345678",
    telSecondaire: "+212698765432",
    whatsapp: "+212612345678",
    telegram: "@moadS",
    adresse: "Quartier Alwalaa, Casablanca",
    ville: "Casablanca",
    codePostal: "20000",
    pays: "Maroc",
    linkedin: "linkedin.com/in/moadsahib",
    github: "github.com/moadsahib",

    // ACADÉMIQUE
    niveau: "Bac+2",
    semestre: "S4",
    filiere: "Gestion des réseaux et sécurité",
    universite: "Université Internationale de Technologie",
    AU: "2025-2026",
    dateInscription: "2023-09-01",
    dateFin: "2026-06-30",
    tuteur: "Dr. Ayoube Jibouni",

    // COMPÉTENCES
    langages: "Python,Java,C++,SQL",
    outils: "Wireshark, Packet Tracer,Docker",
    certifications: "CCNA, AWS Cloud Practitioner",
    niveauCompetence: { reseaux: "Avancé", securite: "Intermédiaire", dev: "Avancé" },
    badges: ["Top 5 Promo", "Meilleur Projet"],

    // DESCRIPTION PERSONNELLE
    description: "Étudiant passionné par les réseaux et la cybersécurité, motivé à apprendre de nouvelles technologies et à participer à des projets innovants."
};

function ProfilEtudiant() {

    const [etudiant, setEtudiant] = useState(etudiantData);
    const [modalOpen, setModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEtudiant(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setModalOpen(false);
        // Ici je peux aussi appeler mon API pour sauvegarder les changements
        console.log("Profil mis à jour :", etudiant);
    };

    return (
        <EtudiantLayout>
            <main className="min-h-screen bg-gray-100 p-10 flex justify-center">
                <section className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl p-8 flex flex-col gap-8">

                    {/* HEADER PHOTO + IDENTITÉ */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <img src={etudiant.photo} alt={etudiant.nom} className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"/>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-bold text-gray-800">{etudiant.prenom} {etudiant.nom}</h1>
                            <p className="text-gray-500">{etudiant.filiere} - {etudiant.niveau} ({etudiant.semestre})</p>
                            <p className="text-gray-400">Inscrit depuis {etudiant.dateInscription}</p>
                        </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="border-t pt-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">À propos de moi</h2>
                        <p className="text-gray-700">{etudiant.description}</p>
                    </div>

                    {/* CONTACT */}
                    <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3"><FaEnvelope className="text-blue-500"/> {etudiant.email}</div>
                        <div className="flex items-center gap-3"><FaPhone className="text-green-500"/> {etudiant.telPrincipal}</div>
                        <div className="flex items-center gap-3"><FaCalendarAlt  className="text-gray-500"/> Né le {etudiant.dateNaissance}</div>
                        <div className="flex items-center gap-3"><FaMapMarkerAlt className="text-yellow-500"/> {etudiant.adresse}, {etudiant.ville}, {etudiant.pays}</div>
                        <div className="flex items-center gap-3"><FaLinkedin className="text-blue-700"/> {etudiant.linkedin}</div>
                        <div className="flex items-center gap-3"><FaGithub className="text-gray-800"/> {etudiant.github}</div>
                    </div>

                    {/* ACADÉMIQUE */}
                    <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3"><FaGraduationCap className="text-blue-500"/> Université : {etudiant.universite}</div>
                        <div className="flex items-center gap-3"><FaGraduationCap className="text-green-500"/> Niveau : {etudiant.niveau}</div>
                        <div className="flex items-center gap-3"><FaGraduationCap className="text-purple-500"/> Filière : {etudiant.filiere}</div>
                        <div className="flex items-center gap-3"><FaGraduationCap className="text-yellow-500"/> Semestre : {etudiant.semestre}</div>
                        <div className="flex items-center gap-3"><FaGraduationCap className="text-red-500"/> Année universitaire : {etudiant.AU}</div>
                        <div className="flex items-center gap-3"><FaGraduationCap className="text-indigo-500"/> Tuteur : {etudiant.tuteur}</div>
                    </div>

                    {/* COMPÉTENCES */}
                    <div className="border-t pt-6">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Compétences & Certifications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2"><FaCertificate/> Langages de Programmation</h3>
                                <p>{etudiant.langages}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2"><FaCertificate/> Outils</h3>
                                <p>{etudiant.outils}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2"><FaCertificate/> Certifications</h3>
                                <p>{etudiant.certifications}</p>
                            </div>
                        </div>
                    </div>

                    {/* BOUTONS */}
                    <div className="flex justify-end gap-4 pt-6 border-t">
                        <button 
                            onClick={() => setModalOpen(true)}
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                            Modifier profil
                        </button>
                        <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">Déconnexion</button>
                    </div>
                </section>

                {/* MODAL DE MODIFICATION */}
                {modalOpen && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                        <form 
                            className="bg-white rounded-2xl w-[90%] max-w-4xl p-8 flex flex-col gap-4 overflow-y-auto max-h-[90vh]"
                            onSubmit={handleSave}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Modifier profil</h2>
                        
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["prenom","nom","genre","dateNaissance","lieuNaissance","telPrincipal","telegram","adresse","ville","codePostal","pays","linkedin","github","langages","outils","certifications",'email'].map((field) => (
                                <div key={field} className="relative w-full mb-6">
                                    <input
                                        type={field === "dateNaissance" ? "date" : "text"}
                                        name={field}
                                        value={etudiant[field]}
                                        onChange={handleChange}
                                        placeholder=" " // obligatoire pour le peer
                                        required
                                        className="peer block w-full border-b-2 border-gray-300 text-gray-900 bg-transparent py-2 px-0 appearance-none focus:outline-none focus:border-blue-600 transition-colors duration-300"
                                    />
                                    <label
                                        htmlFor={field}
                                        className={`absolute left-0 px-1 transition-all duration-300
                                        ${etudiant[field] && etudiant[field].toString().length > 0
                                        ? "top-0 -translate-y-1/2 text-sm text-blue-600"
                                        : "top-2.5 text-base text-gray-400"
                                        }
                                        peer-focus:-translate-y-1/2 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600
                                        `}
                                    >
                                        {field === "prenom" ? "Prénom" :
                                        field === "nom" ? "Nom" :
                                        field === "genre" ? "Genre" :
                                        field === "dateNaissance" ? "Date de naissance" :
                                        field === "telPrincipal" ? "Téléphone" :
                                        field === 'email' ? 'Email' :
                                        field === 'telegram' ? 'Telegram' :
                                        field === 'adresse' ? 'Adresse' :
                                        field === 'ville' ? 'Ville' :
                                        field === 'codePostal' ? 'Code Postal' :
                                        field === 'pays' ? 'Pays' :
                                        field === 'linkedin' ? 'LinkedIn' :
                                        field === 'github' ? 'Github' :
                                        field === 'langages' ? 'Langages' :
                                        field === 'outils' ? 'Outils' :
                                        field === 'certifications' ? 'Certifications' :"Lieu de naissance"}
                                    </label>

                                </div>
                                ))}
                            </div>
                            <div className="relative grid grid-cols-1 gap-4 mb-6">
                            <textarea
                                id="description"
                                name="description"
                                value={etudiant.description}
                                onChange={handleChange}
                                maxLength='255'
                                placeholder=" "
                                required
                                className="peer block w-full border-b-2 border-gray-300 text-gray-900 bg-transparent py-1 pt-5 appearance-none focus:outline-none focus:border-blue-600 transition-colors duration-300"
                            />

                            <label
                                htmlFor="description"
                                className={`absolute left-0 px-1 bg-white transition-all duration-300
                                ${etudiant.description && etudiant.description.length > 0
                                    ? "top-0 -translate-y-1/2 text-sm text-blue-600"
                                    : "top-4 text-base text-gray-400"
                                }
                                peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-blue-600
                                `}
                            >
                                Description
                            </label>
                            </div>
                            <p className="text-sm text-gray-500 -mt-5">
                                * La description personnelle ne doit pas dépasser un nombre total de 255 caractères.
                            </p>


                            {/* Boutons modal */}
                            <div className="flex justify-end gap-4 mt-4">
                                <button type="button" onClick={()=>setModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Annuler</button>
                                <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </EtudiantLayout>
    );
}

export default ProfilEtudiant;


                    