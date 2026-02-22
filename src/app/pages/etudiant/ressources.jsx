import { useState , useEffect } from "react";
import EtudiantLayout from "../../layouts/EtudiantLayout";
import StatCard from "../../components/Dashboard_components/statecadre";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { topTP , tpNiveaux , dailyActivity } from "../../components/Dashboard_components/DataTest";

function Statistique(){

    // ----Interaction avec la base de donnees--------------
        const [statsE, setStatsE] = useState([])
        useEffect(() => {
                    const etudiantURL = "http://127.0.0.1:8000/api/stats/statistique/";

                    Promise.all([
                    fetch(etudiantURL).then(res => res.json()),
                    ])
                    .then(([DataE]) => {
                        setStatsE(DataE);
                    })
                    .catch(err => console.log(err));
        
                }, []);
    // -----------------------------------------------------

    return (
        <EtudiantLayout>
            <div className="p-4 sm:p-6 md:p-8 min-h-screen w-full">
                <h1 className="text-2xl font-bold text-center mb-6">📊 Statistiques – LABTECHNET</h1>


                {/* Cartes principales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                <StatCard title="Progression globale%" >
                    <p className="text-2xl font-bold text-blue-600 mb-2">{statsE.progression}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${statsE.progression}%` }}
                        ></div>
                    </div>
                </StatCard>

                <StatCard title="Cours consultés" value={`${statsE.cours_done} / ${statsE.cours_total}`} />
                <StatCard title="TP réalisés" value={`${statsE.tp_done} / ${statsE.tp_total}`} />
                <StatCard title="Temps total passé" value={statsE.temps_total} />
                <StatCard title="Temps moyen / TP" value={statsE.temps_moyen_tp} />
                <StatCard title="TP virtuels lancés" value={statsE.tp_lances} />
                <StatCard title="Tentatives / TP" value={statsE.tentatives} />
                <StatCard title="Nombre de connexions">
                    <div className="flex justify-between">
                        <div>
                        <p className="text-xs text-gray-500">Aujourd’hui</p>
                        <p className="text-xl font-bold text-blue-600">{statsE.connexions_today}</p>
                        </div>
                        <div>
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="text-xl font-bold text-blue-600">{statsE.connexions_total}</p>
                        </div>
                    </div>
                </StatCard>

                <StatCard title="Durée moyenne des sessions" value={statsE.duree_session} />
                <StatCard title="Dernière activité" value={statsE.derniere_activite} />
                </div>


                {/* Graphique TP les plus travaillés */}
                <div className="bg-white rounded-2xl shadow p-6 mt-6">
                    <h2 className="text-lg font-semibold mb-4">TP les plus travaillés</h2>
                    <span className="text-sm text-gray-400">Top 4</span>
                    <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
                        <ResponsiveContainer width="100%" height='100%'>
                        <BarChart data={topTP}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" name='Total' fill="#3B82F6"/>
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow p-6 mt-6">
                    <h2 className="text-lg font-semibold mb-4">📊 TP par niveau</h2>
                    <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
                    <ResponsiveContainer width="100%" height='100%'>
                        <BarChart data={tpNiveaux} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                        <XAxis dataKey="niveau" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" name='Total' fill="#3B82F6" />
                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow p-6 mt-6">
                    <h2 className="text-lg font-semibold mb-4">📈 Activité quotidienne</h2>
                    <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
                    <ResponsiveContainer width="100%" height='100%'>
                        <BarChart data={dailyActivity}>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="connexions" name="Connexions" fill="#3B82F6" />
                        <Bar dataKey="tp" name="TP réalisés" fill="#10B981" />
                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                </div>


            </div>
        </EtudiantLayout>
    )
}

export default Statistique