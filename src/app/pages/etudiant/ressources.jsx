import EtudiantLayout from "../../layouts/EtudiantLayout";
import StatCard from "../../components/statecadre";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


const stats = {
progression: 50,
cours: { done: 12, total: 20 },
tp: { done: 9, total: 15 },
tempsTotal: '32h',
tempsMoyenTP: '45 min',
tpLances: 18,
tentatives: 3.2,
derniereActivite: 'TP Routage – 22/01/2026',
connexions: {today:45, total:150},
dureeSession: '35 min'
};


const topTP = [
{ name: 'Routage', value: 5 },
{ name: 'VLAN', value: 19 },
{ name: 'Firewall', value: 7 },
{ name: 'DNS', value: 5 }
];

const tpNiveaux = [
  { niveau: 'S1', value: 5 },
  { niveau: 'S2', value: 12 },
  { niveau: 'S3', value: 18 },
  { niveau: 'S4', value: 7 }
];

const dailyActivity = [
  { day: 'Lun', connexions: 5, tp: 2 },
  { day: 'Mar', connexions: 8, tp: 3 },
  { day: 'Mer', connexions: 4, tp: 1 },
  { day: 'Jeu', connexions: 6, tp: 4 },
  { day: 'Ven', connexions: 3, tp: 2 },
  { day: 'Sam', connexions: 2, tp: 1 },
  { day: 'Dim', connexions: 1, tp: 0 }
];


function Statistique(){

    return (
        <EtudiantLayout>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-6">📊 Statistiques – LABTECHNET</h1>


                {/* Cartes principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard title="Progression globale%">
                    <p className="text-2xl font-bold text-blue-600 mb-2">{stats.progression}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${stats.progression}%` }}
                        ></div>
                    </div>
                </StatCard>

                <StatCard title="Cours consultés" value={`${stats.cours.done} / ${stats.cours.total}`} />
                <StatCard title="TP réalisés" value={`${stats.tp.done} / ${stats.tp.total}`} />
                <StatCard title="Temps total passé" value={stats.tempsTotal} />
                <StatCard title="Temps moyen / TP" value={stats.tempsMoyenTP} />
                <StatCard title="TP virtuels lancés" value={stats.tpLances} />
                <StatCard title="Tentatives / TP" value={stats.tentatives} />
                <StatCard title="Nombre de connexions">
                    <div className="flex justify-between">
                        <div>
                        <p className="text-xs text-gray-500">Aujourd’hui</p>
                        <p className="text-xl font-bold text-blue-600">{stats.connexions.today}</p>
                        </div>
                        <div>
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="text-xl font-bold text-blue-600">{stats.connexions.total}</p>
                        </div>
                    </div>
                </StatCard>

                <StatCard title="Durée moyenne des sessions" value={stats.dureeSession} />
                <StatCard title="Dernière activité" value={stats.derniereActivite} />
                </div>


                {/* Graphique TP les plus travaillés */}
                <div className="bg-white rounded-2xl shadow p-6 mt-6">
                <h2 className="text-lg font-semibold mb-4">TP les plus travaillés</h2>
                <span className="text-sm text-gray-400">Top 4</span>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topTP}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" name='Total' fill="#3B82F6"/>
                </BarChart>
                </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl shadow p-6 mt-6">
                    <h2 className="text-lg font-semibold mb-4">📊 TP par niveau</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={tpNiveaux} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                        <XAxis dataKey="niveau" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" name='Total' fill="#3B82F6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl shadow p-6 mt-6">
                    <h2 className="text-lg font-semibold mb-4">📈 Activité quotidienne</h2>
                    <ResponsiveContainer width="100%" height={300}>
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
        </EtudiantLayout>
    )
}

export default Statistique