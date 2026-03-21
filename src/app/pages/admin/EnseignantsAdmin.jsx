import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/API_Djando";

const statusClasses = {
  actif: "bg-emerald-50 text-emerald-700 border-emerald-200",
  en_attente: "bg-amber-50 text-amber-700 border-amber-200",
  suspendu: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function EnseignantsAdmin() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [statut, setStatut] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  // Fetch enseignants avec search + statut
  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const res = await api.get("/admin/enseignants/", {
          params: {
            search: search || undefined,
            statut: statut || undefined,
          },
        });
        setTeachers(res.data);
      } catch (error) {
        console.error("Erreur chargement enseignants :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, [search, statut]);

  // Toggle selection
  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  const toggleSelectAll = () => {
    if (selected.length === teachers.length) setSelected([]);
    else setSelected(teachers.map((t) => t.id));
  };

  const handleAction = async (id, action) => {
    try {
      const res = await api.patch(`/admin/enseignants/${id}/`, { action });
      const newStatut = res.data.statut;
      setTeachers((prev) =>
        prev.map((t) => (t.id === id ? { ...t, statut: newStatut } : t)),
      );
    } catch (error) {
      console.error("Erreur action enseignant :", error);
      alert(error.response?.data?.detail || "Erreur lors de la mise à jour.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer définitivement cet enseignant ?")) return;
    try {
      await api.delete(`/admin/enseignants/${id}/`);
      setTeachers((prev) => prev.filter((t) => t.id !== id));
      setSelected((prev) => prev.filter((i) => i !== id));
    } catch (error) {
      console.error("Erreur suppression enseignant :", error);
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            Gestion des enseignants
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Validez, désactivez ou supprimez les comptes enseignants.
          </p>
        </div>

        {/* Barre recherche + filtre + bouton selection */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              placeholder="Rechercher (nom, prénom, email, CIN, spécialité...)"
              className="bg-transparent text-sm outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
          >
            <option value="">Tous les statuts</option>
            <option value="en_attente">En attente</option>
            <option value="actif">Actif</option>
            <option value="suspendu">Suspendu</option>
          </select>

          <button
            className="rounded-lg border px-3 py-1 text-slate-700"
            onClick={() => setShowCheckboxes((prev) => !prev)}
          >
            {showCheckboxes ? "Masquer sélection" : "Sélectionner"}
          </button>

          {selected.length > 0 && (
            <div className="flex flex-wrap gap-2 ml-auto">
              <button
                className="rounded-lg border px-3 py-1 text-emerald-600"
                onClick={() =>
                  selected.forEach((id) => handleAction(id, "valider_compte"))
                }
              >
                Valider compte
              </button>
              <button
                className="rounded-lg border px-3 py-1 text-amber-600"
                onClick={() =>
                  selected.forEach((id) =>
                    handleAction(id, "desactiver_compte"),
                  )
                }
              >
                Désactiver compte
              </button>
              <button
                className="rounded-lg border px-3 py-1 text-rose-600"
                onClick={() => {
                  if (
                    !window.confirm(
                      "Supprimer définitivement les enseignants sélectionnés ?",
                    )
                  )
                    return;
                  selected.forEach((id) => handleDelete(id));
                }}
              >
                Supprimer
              </button>
            </div>
          )}
        </div>

        {/* Tableau */}
        <section className="overflow-auto border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-6 text-sm text-slate-500">
              Chargement des enseignants...
            </div>
          ) : teachers.length === 0 ? (
            <div className="p-6 text-sm text-slate-500">
              Aucun enseignant trouvé.
            </div>
          ) : (
            <table className="w-full border-separate border-spacing-y-2 text-sm">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  {showCheckboxes && (
                    <th className="text-left text-xs text-gray-500">
                      <input
                        type="checkbox"
                        checked={selected.length === teachers.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                  )}
                  <th className="px-6 py-4 max-w-[140px] truncate">Nom</th>
                  <th className="px-6 py-4 max-w-[140px] truncate">Prénom</th>
                  <th className="px-6 py-4 max-w-[140px] truncate">Email</th>
                  <th className="px-6 py-4 max-w-[140px] truncate">CIN</th>
                  <th className="px-6 py-4 max-w-[140px] truncate">
                    Spécialité
                  </th>
                  <th className="px-6 py-4 max-w-[140px] truncate ">Titre</th>
                  <th className="px-6 py-4 max-w-[140px] truncate">Grade</th>
                  <th className="px-6 py-4 max-w-[140px] truncate">
                    Profession
                  </th>
                  <th className="px-6 py-4 max-w-[140px] truncate">Statut</th>
                </tr>
              </thead>

              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="border-t">
                    {showCheckboxes && (
                      <td className="px-4 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={selected.includes(teacher.id)}
                          onChange={() => toggleSelect(teacher.id)}
                        />
                      </td>
                    )}
                    <td className="px-6 py-4 max-w-[140px] truncate">
                      {teacher.nom}
                    </td>
                    <td className="px-6 py-4 max-w-[140px] truncate">
                      {teacher.prenom}
                    </td>
                    <td className="px-6 py-4 max-w-[140px] truncate">
                      {teacher.email}
                    </td>
                    <td className="px-6 py-4 max-w-[140px] truncate">
                      {teacher.cin}
                    </td>
                    <td className="px-6 py-4 max-w-[140px] truncate">
                      {teacher.specialite}
                    </td>
                    <td className="ppx-6 py-4 max-w-[140px] truncate">
                      {teacher.titre}
                    </td>
                    <td className="px-6 py-4max-w-[140px] truncate">
                      {teacher.grade}
                    </td>
                    <td className="px-6 py-4 max-w-[140px] truncate">
                      {teacher.profession}
                    </td>
                    <td className="px-6 py-4max-w-[140px] truncate">
                      <span
                        className={`px-3 py-1 rounded-full border text-xs font-semibold ${
                          statusClasses[teacher.statut] || ""
                        }`}
                      >
                        {teacher.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
