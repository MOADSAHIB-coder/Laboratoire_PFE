import React, { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/API_Djando";
import {
  NotificationBar,
  useNotification,
  ConfirmDialog,
} from "../../components/componentAdmin/notificat";

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

  // sélection
  const [selected, setSelected] = useState([]); // ids sélectionnés
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  // pour drag-select (sélection glissante)
  const [isSelecting, setIsSelecting] = useState(false);
  const selectionModeRef = (useRef < "add") | "remove" | (null > null); // savoir si on ajoute ou retire
  const selectedSetRef = useRef(new Set()); // snapshot pour la sélection glissante

  // Pour confirmation de suppression (unitaire ou multiple)
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState("single"); // "single" | "multiple"
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  // Notifications
  const { notificationState, notification, clearNotification } =
    useNotification();

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
        notification(
          "error",
          "Erreur lors du chargement des enseignants. Veuillez réessayer.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, [search, statut, notification]);

  // Helpers sélection
  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  const toggleSelectAll = () => {
    if (selected.length === teachers.length) setSelected([]);
    else setSelected(teachers.map((t) => t.id));
  };

  // Click sur une ligne -> toggle sélection de cette ligne
  const handleRowClick = (e, id) => {
    // si on clique sur un input checkbox, on laisse le comportement par défaut
    if (e.target.tagName === "INPUT") return;
    toggleSelect(id);
  };

  // Drag selection: début quand on enfonce la souris sur une ligne
  const handleRowMouseDown = (e, id) => {
    if (!showCheckboxes) return; // on active seulement si le mode sélection est visible

    e.preventDefault();

    setIsSelecting(true);
    const alreadySelected = selected.includes(id);
    // si déjà sélectionné -> mode "remove", sinon "add"
    selectionModeRef.current = alreadySelected ? "remove" : "add";

    // snapshot
    selectedSetRef.current = new Set(selected);

    // on applique immédiatement au premier
    if (selectionModeRef.current === "add") {
      selectedSetRef.current.add(id);
    } else {
      selectedSetRef.current.delete(id);
    }
    setSelected(Array.from(selectedSetRef.current));
  };

  const handleRowMouseEnter = (id) => {
    if (!isSelecting || !showCheckboxes) return;
    if (!selectionModeRef.current) return;

    if (selectionModeRef.current === "add") {
      selectedSetRef.current.add(id);
    } else {
      selectedSetRef.current.delete(id);
    }
    setSelected(Array.from(selectedSetRef.current));
  };

  const handleMouseUpGlobal = () => {
    if (isSelecting) {
      setIsSelecting(false);
      selectionModeRef.current = null;
    }
  };

  // écouteur global mouseup pour arrêter la sélection quand on relâche hors du tableau
  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUpGlobal);
    return () => window.removeEventListener("mouseup", handleMouseUpGlobal);
  });

  const handleAction = async (id, action) => {
    try {
      const res = await api.patch(`/admin/enseignants/${id}/`, { action });
      const newStatut = res.data.statut;
      setTeachers((prev) =>
        prev.map((t) => (t.id === id ? { ...t, statut: newStatut } : t)),
      );
      notification("success", "Statut de l’enseignant mis à jour.");
    } catch (error) {
      console.error("Erreur action enseignant :", error);
      notification(
        "error",
        error.response?.data?.detail ||
          "Erreur lors de la mise à jour de l’enseignant.",
      );
    }
  };

  // Ouvrir la confirmation pour un seul enseignant
  const askDeleteSingle = (teacher) => {
    setDeleteMode("single");
    setTeacherToDelete(teacher);
    setConfirmOpen(true);
  };

  // Ouvrir la confirmation pour plusieurs enseignants sélectionnés
  const askDeleteMultiple = () => {
    if (selected.length === 0) return;
    setDeleteMode("multiple");
    setTeacherToDelete(null);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteMode === "single" && teacherToDelete) {
        const id = teacherToDelete.id;
        await api.delete(`/admin/enseignants/${id}/`);
        setTeachers((prev) => prev.filter((t) => t.id !== id));
        setSelected((prev) => prev.filter((i) => i !== id));
        notification("success", "Enseignant supprimé avec succès.");
      } else if (deleteMode === "multiple") {
        const ids = [...selected];
        for (const id of ids) {
          try {
            await api.delete(`/admin/enseignants/${id}/`);
          } catch (err) {
            console.error("Erreur suppression enseignant (id:", id, "):", err);
          }
        }
        setTeachers((prev) => prev.filter((t) => !ids.includes(t.id)));
        setSelected([]);
        notification("success", "Enseignants sélectionnés supprimés.");
      }
    } catch (error) {
      console.error("Erreur suppression enseignant :", error);
      notification("error", "Erreur lors de la suppression.");
    } finally {
      setConfirmOpen(false);
      setTeacherToDelete(null);
      setDeleteMode("single");
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setTeacherToDelete(null);
    setDeleteMode("single");
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Barre de notification */}
        <div className="max-w-6xl mx-auto">
          <NotificationBar
            type={notificationState.type}
            message={notificationState.message}
            onClose={clearNotification}
          />
        </div>

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
                onClick={askDeleteMultiple}
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
                        checked={
                          teachers.length > 0 &&
                          selected.length === teachers.length
                        }
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
                  <th className="px-6 py-4 max-w-[140px] truncate">Titre</th>
                  <th className="px-6 py-4 max-w-[140px] truncate">Grade</th>
                  <th className="px-6 py-4 max-w-[140px] truncate">
                    Profession
                  </th>
                  <th className="px-6 py-4 max-w-[140px] truncate">Statut</th>
                  <th className="px-6 py-4 max-w-[100px] truncate">Actions</th>
                </tr>
              </thead>

              <tbody>
                {teachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className={`border-t cursor-pointer ${
                      selected.includes(teacher.id)
                        ? "bg-blue-50"
                        : "hover:bg-slate-50"
                    }`}
                    onClick={(e) => handleRowClick(e, teacher.id)}
                    onMouseDown={(e) => handleRowMouseDown(e, teacher.id)}
                    onMouseEnter={() => handleRowMouseEnter(teacher.id)}
                  >
                    {showCheckboxes && (
                      <td className="px-4 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={selected.includes(teacher.id)}
                          onChange={() => toggleSelect(teacher.id)}
                          onClick={(e) => e.stopPropagation()}
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
                    <td className="px-6 py-4 max-w-[140px] truncate">
                      {teacher.titre}
                    </td>
                    <td className="px-6 py-4 max-w-[140px] truncate">
                      {teacher.grade}
                    </td>
                    <td className="px-6 py-4 max-w-[140px] truncate">
                      {teacher.profession}
                    </td>
                    <td className="px-6 py-4 max-w-[140px] truncate">
                      <span
                        className={`px-3 py-1 rounded-full border text-xs font-semibold ${
                          statusClasses[teacher.statut] || ""
                        }`}
                      >
                        {teacher.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-[100px] truncate">
                      <button
                        className="text-xs text-rose-600 hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          askDeleteSingle(teacher);
                        }}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Supprimer enseignant(s)"
        message={
          deleteMode === "single"
            ? "Supprimer définitivement cet enseignant ?"
            : "Supprimer définitivement les enseignants sélectionnés ?"
        }
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </AdminLayout>
  );
}
