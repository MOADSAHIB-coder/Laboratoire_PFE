import EtudiantLayout from "../../layouts/EtudiantLayout";
import { useState , useEffect } from "react";
import { jsPDF } from "jspdf";

function TP(){

    // ----Interaction avec la base de donnees--------------
        const [etudiantData, setetudiantdata] = useState([])
        useEffect(() => {
                  const etudiantURL = "http://127.0.0.1:8000/api/etudiants/etudiants/";

                  Promise.all([
                    fetch(etudiantURL).then(res => res.json()),
                  ])
                    .then(([etudiantData]) => {
                      setetudiantdata(etudiantData);
                    })
                    .catch(err => console.log(err));
        
                }, []);
    // -----------------------------------------------------
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const valider = async (e) => {
    e.preventDefault();

    if (!filters.module) {
        alert("Choisissez un module");
        return;
    }

    setLoading(true);
    setResult("");

    try {
        const response = await fetch(
        "http://127.0.0.1:8000/generation/api/generate/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            prompt: buildPrompt(),
            max_length: 600
            })
        }
        );

    const data = await response.json();
        setResult(data.result);
    } catch (err) {
        console.error(err);
        setResult("Erreur lors de la génération");
    } finally {
        setLoading(false);
    }
    };

    const [filters, setFilters] = useState({
        type: "Reseau",
        filiere: "Gestion des reseau et securite",
        niveau: "bac+1",
        semestre: "S1",
        module: ""
    });

    const semestres = filters.niveau === "bac+1" ? ["S1", "S2"] : ["S3", "S4"];
    
    const MODULES = {
    "bac+1": {
        "S1": [
        "Modèle OSI",
        "TCP / UDP",
        "Adressage IP et sous-réseaux",
        "DHCP",
        "DNS"
        ],
        "S2": [
        "Mise en place d’un petit réseau d’entreprise",
        "Réseau d’un petit laboratoire informatique",
        "Réseau d’un petit cabinet médical",
        "ICMP et Ping",
        "Routage",
        "NAT",
        "VLAN",
        "Sécurité réseau (bases)"
        ]
    },
    "bac+2": {
        "S3": [
        "HTTP / HTTPS"
        ]
    }
    };

    const buildPrompt = () => {
        return `
        Le module Reseaux Informaique (${filters.semestre}) intitulé ${filters.module} pour le niveau ${filters.niveau.toUpperCase()} traite du thème ${filters.type} et dure environ 1h.

        Objectifs :
        - Comprendre les concepts de base du réseau
        - Attribuer et gérer les adresses IP
        - Comprendre et appliquer des règles de sécurité de base


        `;
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFont("helvetica");
        doc.setFontSize(12);

        const lines = doc.splitTextToSize(result, 180);
        doc.text(lines, 15, 20);

        doc.save("TP_Generé.pdf");
    };

    return (
        <EtudiantLayout>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg flex items-center gap-2">
                        <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        Génération en cours...
                    </div>
                </div>
            )}
            <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-10 gap-6 sm:gap-8">
                <h2 className="text-center text-3xl font-bold text-gray-800 max-w-3xl">
                    Créez votre TP sur mesure et explorez vos compétences avec un contenu adapté à votre parcours
                </h2>

                <div className="w-full max-w-full sm:max-w-[90%] md:max-w-[70%] lg:max-w-[100%] xl:w-[90%] mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg">
                    <div className="max-w-6xl mx-auto p-6">
                        <form className="flex flex-col gap-4 w-full" onSubmit={valider}>
                            {/* Filiere */}
                            <div className="flex flex-col">
                            <label htmlFor="filiere" className="mb-1 font-semibold text-gray-700">Filière :</label>
                            <input
                                type="text"
                                value={etudiantData[0]?.filiere || 'Not found'}
                                id="filiere"
                                readOnly
                                className="border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-3 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                            />
                            </div>

                            {/* Type de cours/projet/devoir */}
                            <div className="flex flex-col">
                            <label htmlFor="typeC" className="mb-1 font-semibold text-gray-700">Type de TP :</label>
                            <select
                                id="typeC"
                                defaultValue={filters.type}
                                className="border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                                onChange={(e)=>setFilters({...filters, type: e.target.value})}
                            >
                                <option value="Reseau">Réseaux</option>
                                <option value="dev" disabled>Développement</option>
                                <option value="Data" disabled>Data</option>
                                <option value="Securite" disabled>Sécurité</option>
                                <option value="infrat" disabled>Infrastructure</option>
                            </select>
                            </div>

                            {/* Niveau avec radios */}
                            <div className="flex flex-col">
                            <label className="mb-1 font-semibold text-gray-700">Niveau :</label>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="bac+1"
                                    name="bac"
                                    checked={filters.niveau === 'bac+1'}
                                    onChange={(e)=>{
                                            setFilters({...filters, niveau: e.target.value, semestre: "S1"});
                                            }}
                                    className="px-3 py-2 sm:px-4 sm:py-3 text-gray-700  w-full"
                                />
                                Bac+1
                                </label>
                                <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="bac+2"
                                    name="bac"
                                    checked={filters.niveau === 'bac+2'}
                                    onChange={(e)=>{
                                            setFilters({...filters, niveau: e.target.value, semestre: "S3"});
                                            }}
                                    className="px-3 py-2 sm:px-4 sm:py-3 text-gray-700  w-full"
                                />
                                Bac+2
                                </label>
                            </div>
                            </div>

                            {/* Semestre */}
                            <div className="flex flex-col">
                            <label htmlFor="sem" className="mb-1 font-semibold text-gray-700">Semestre :</label>
                            <select
                                id="sem"
                                onChange={(e)=>setFilters({...filters, semestre: e.target.value})}
                                className="border border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                            >
                                {semestres.map((s, index) => (
                                <option key={index}>{s}</option>
                                ))}
                            </select>
                            </div>
                            {/* Module */}
                            <div className="flex flex-col">
                            <label className="mb-1 font-semibold text-gray-700">
                                Module :
                            </label>
                            <select
                                className="border border-gray-300 rounded px-3 py-2"
                                onChange={(e) =>
                                setFilters({ ...filters, module: e.target.value })
                                }
                            >
                                <option value="">-- Choisir un module --</option>

                                {MODULES[filters.niveau]?.[filters.semestre]?.map((m, i) => (
                                <option key={i} value={m}>
                                    {m}
                                </option>
                                ))}
                            </select>
                            </div>
                            {/* Note informative sous Semestre */}
                            <p className="text-sm sm:text text-gray-500 mt-2 sm:mt-3">
                                * Sélectionnez le semestre et cliquez sur "Générer" pour générer un TP exemple basé sur vos choix. 
                                <u>(Ceci est une version de démonstration, la génération réelle sera disponible ultérieurement.)</u>
                                <br />
                                * La génération automatique des travaux pratiques (TP) est, pour le moment, limitée uniquement aux TP de réseaux.
                            </p>

                            {/* Bouton submit */}
                            <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                            >
                            {loading ? "Génération..." : "Générer"}
                            </button>
                        </form>
                    </div>
                    {result && (
                        <div className="mt-6 bg-gray-100 p-4 rounded">
                            <h3 className="font-bold mb-2">TP généré :</h3>

                            <pre className="whitespace-pre-wrap text-sm mb-4">
                                {result}
                            </pre>

                            <button
                                onClick={downloadPDF}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                            >
                                Télécharger en PDF
                            </button>
                        </div>
                    )}
                </div>
                
            </div>
            
        </EtudiantLayout>
    )
}

export default TP


