import { useState } from "react";
import EtudiantLayout from "../../layouts/EtudiantLayout";
import { FaUserCog, FaLock, FaBell, FaPalette, FaGlobe, FaSave } from "react-icons/fa";

function Parametres() {

  const [settings, setSettings] = useState({
    siteName: "ESTD-LABTECHNET",
    adminEmail: "admin@estd.ma",
    language: "fr",
    theme: "light",
    notifications: true,
    twoFactorAuth: false,
    maintenanceMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === "checkbox" ? checked : value });
  };

  const handleSave = () => {
    console.log("Paramètres sauvegardés :", settings);
    alert("Paramètres enregistrés avec succès !");
  };

  return (
    <EtudiantLayout>
      <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-4xl p-6 space-y-6">

          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaUserCog /> Paramètres du Site
          </h1>

          <section className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-3">Informations générales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                placeholder="Nom du site"
                className="border p-2 rounded"
              />
              <input
                type="email"
                name="adminEmail"
                value={settings.adminEmail}
                onChange={handleChange}
                placeholder="Email administrateur"
                className="border p-2 rounded"
              />
            </div>
          </section>

          <section className="border-b pb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2"><FaLock /> Sécurité</h2>
            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" name="twoFactorAuth" checked={settings.twoFactorAuth} onChange={handleChange} />
              Activer l’authentification à deux facteurs
            </label>
          </section>

          <section className="border-b pb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2"><FaBell /> Notifications</h2>
            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleChange} />
              Recevoir les notifications par email
            </label>
          </section>

          <section className="border-b pb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2"><FaPalette /> Apparence</h2>
            <select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              className="border p-2 rounded mt-2"
            >
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
            </select>
          </section>

          <section className="border-b pb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2"><FaGlobe /> Langue</h2>
            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
              className="border p-2 rounded mt-2"
            >
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </section>

          <section>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} />
              Activer le mode maintenance
            </label>
          </section>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <FaSave /> Enregistrer
            </button>
          </div>

        </div>
      </div>
    </EtudiantLayout>
  );
}

export default Parametres;
