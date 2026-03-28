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

export default function EtudiantsAdmin() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [statut, setStatut] = useState("");
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState([]); // ids sélectionnés
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  // drag‑select (sélection glissante)
  const [isSelecting, setIsSelecting] = useState(false);
  const selectionModeRef = useRef(null); // "add" | "remove"
  const selectedSetRef = useRef(new Set());

  // confirmation suppression (1 ou plusieurs)
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState("single"); // "single" | "multiple"
  const [studentToDelete, setStudentToDelete] = useState(null);

  // notifications
  const { notificationState, notification, clearNotification } =
    useNotification();

  // Chargement des étudiants
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const res = await api.get("/admin/etudiants/", {
          params: {
            search: search || undefined,
            statut: statut || undefined,
          },
        });
        setStudents(res.data);
      } catch (error) {
        console.error("Erreur chargement étudiants :", error);
        notification(
          "error",
          "Erreur lors du chargement des étudiants. Veuillez réessayer.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [search, statut, notification]);

  // helpers sélection
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === students.length) {
      setSelected([]);
    } else {
      setSelected(students.map((s) => s.id));
    }
  };

  // click sur une ligne => toggle sélection (sauf clic sur input)
  const handleRowClick = (e, id) => {
    if (e.target.tagName === "INPUT") return;
    toggleSelect(id);
  };

  // début drag‑select
  const handleRowMouseDown = (e, id) => {
    if (!showCheckboxes) return;
    e.preventDefault();

    setIsSelecting(true);
    const alreadySelected = selected.includes(id);
    selectionModeRef.current = alreadySelected ? "remove" : "add";

    selectedSetRef.current = new Set(selected);
    if (selectionModeRef.current === "add") {
      selectedSetRef.current.add(id);
    } else {
      selectedSetRef.current.delete(id);
    }
    setSelected(Array.from(selectedSetRef.current));
  };

  const handleRowMouseEnter = (id) => {
    if (!isSelecting || !showCheckboxes || !selectionModeRef.current) return;

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

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUpGlobal);
    return () => window.removeEventListener("mouseup", handleMouseUpGlobal);
  });

  const handleAction = async (id, action) => {
    try {
      const res = await api.patch(`/admin/etudiants/${id}/`, { action });
      const newStatut = res.data.statut;
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, statut: newStatut } : s)),
      );
      notification("success", "Statut de l’étudiant mis à jour.");
    } catch (error) {
      console.error("Erreur action étudiant :", error);
      notification(
        "error",
        error.response?.data?.detail ||
          "Erreur lors de la mise à jour du compte.",
      );
    }
  };

  // confirmation suppression d’un seul étudiant
  const askDeleteSingle = (student) => {
    setDeleteMode("single");
    setStudentToDelete(student);
    setConfirmOpen(true);
  };

  // confirmation suppression multiple
  const askDeleteMultiple = () => {
    if (selected.length === 0) return;
    setDeleteMode("multiple");
    setStudentToDelete(null);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteMode === "single" && studentToDelete) {
        const id = studentToDelete.id;
        await api.delete(`/admin/etudiants/${id}/`);
        setStudents((prev) => prev.filter((s) => s.id !== id));
        setSelected((prev) => prev.filter((i) => i !== id));
        notification("success", "Étudiant supprimé avec succès.");
      } else if (deleteMode === "multiple") {
        const ids = [...selected];
        for (const id of ids) {
          try {
            await api.delete(`/admin/etudiants/${id}/`);
          } catch (err) {
            console.error("Erreur suppression étudiant (id:", id, "):", err);
          }
        }
        setStudents((prev) => prev.filter((s) => !ids.includes(s.id)));
        setSelected([]);
        notification("success", "Étudiants sélectionnés supprimés.");
      }
    } catch (error) {
      console.error("Erreur suppression étudiant :", error);
      notification("error", "Erreur lors de la suppression.");
    } finally {
      setConfirmOpen(false);
      setStudentToDelete(null);
      setDeleteMode("single");
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setStudentToDelete(null);
    setDeleteMode("single");
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Notification */}
        <div className="max-w-6xl mx-auto">
          <NotificationBar
            type={notificationState.type}
            message={notificationState.message}
            onClose={clearNotification}
          />
        </div>

        {/* Titre */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            Gestion des étudiants
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Validez, suspendez ou supprimez les comptes étudiants.
          </p>
        </div>

        {/* Barre de recherche + filtres + actions */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Recherche */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              placeholder="Rechercher (nom, prénom, email, matricule, filière...)"
              className="bg-transparent text-sm outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filtre par statut */}
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

          {/* Actions sur les étudiants sélectionnés */}
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

        <section className="overflow-hidden border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-6 text-sm text-slate-500">
              Chargement des étudiants...
            </div>
          ) : students.length === 0 ? (
            <div className="p-6 text-sm text-slate-500">
              Aucun étudiant trouvé.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-2 text-sm">
                <thead className="bg-slate-50 text-sm text-slate-600">
                  <tr>
                    {showCheckboxes && (
                      <th className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={
                            students.length > 0 &&
                            selected.length === students.length
                          }
                          onChange={toggleSelectAll}
                        />
                      </th>
                    )}
                    <th className="px-6 py-4 max-w-[140px] truncate">Nom</th>
                    <th className="px-6 py-4 max-w-[140px] truncate">Prénom</th>
                    <th className="px-6 py-4 max-w-[140px] truncate">Email</th>
                    <th className="px-6 py-4 max-w-[140px] truncate">
                      Matricule
                    </th>
                    <th className="px-6 py-4 max-w-[140px] truncate">
                      Filière
                    </th>
                    <th className="px-6 py-4 max-w-[140px] truncate">Niveau</th>
                    <th className="px-6 py-4 max-w-[140px] truncate">Ville</th>
                    <th className="px-6 py-4 max-w-[140px] truncate">
                      Université
                    </th>
                    <th className="px-6 py-4 max-w-[140px] truncate">Statut</th>
                    <th className="px-6 py-4 max-w-[100px] truncate">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className={`border-t cursor-pointer ${
                        selected.includes(student.id)
                          ? "bg-blue-50"
                          : "hover:bg-slate-50"
                      }`}
                      onClick={(e) => handleRowClick(e, student.id)}
                      onMouseDown={(e) => handleRowMouseDown(e, student.id)}
                      onMouseEnter={() => handleRowMouseEnter(student.id)}
                    >
                      {showCheckboxes && (
                        <td className="px-4 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={selected.includes(student.id)}
                            onChange={() => toggleSelect(student.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                      )}
                      <td className="px-6 py-4 max-w-[140px] truncate">
                        {student.nom}
                      </td>
                      <td className="px-6 py-4 max-w-[140px] truncate">
                        {student.prenom}
                      </td>
                      <td className="px-6 py-4 max-w-[140px] truncate">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 max-w-[140px] truncate">
                        {student.matricule}
                      </td>
                      <td className="px-6 py-4 max-w-[140px] truncate">
                        {student.filiere}
                      </td>
                      <td className="px-6 py-4 max-w-[140px] truncate">
                        {student.niveau}
                      </td>
                      <td className="px-6 py-4 max-w-[140px] truncate">
                        {student.ville}
                      </td>
                      <td className="px-6 py-4 max-w-[140px] truncate">
                        {student.universite}
                      </td>
                      <td className="px-6 py-4 max-w-[140px] truncate">
                        <span
                          className={`px-3 py-1 rounded-full border text-xs font-semibold ${
                            statusClasses[student.statut] || ""
                          }`}
                        >
                          {student.statut}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-[100px] truncate">
                        <button
                          className="text-xs text-rose-600 hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            askDeleteSingle(student);
                          }}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Supprimer étudiant(s)"
        message={
          deleteMode === "single"
            ? "Supprimer définitivement cet étudiant ?"
            : "Supprimer définitivement les étudiants sélectionnés ?"
        }
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </AdminLayout>
  );
}
