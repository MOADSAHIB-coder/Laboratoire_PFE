import React, { useEffect, useState, useCallback } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/API_Djando";
import { DeleteIcon } from "lucide-react";
import {
  NotificationBar,
  useNotification,
  ConfirmDialog,
} from "../../components/componentAdmin/notificat";
export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  // Pour la confirmation de suppression
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  // Hook de notification
  const { notificationState, notification, clearNotification } =
    useNotification();

  // Chargement initial de la liste des messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await api.get("admin/messages/");
        setMessages(res.data || []);
      } catch (err) {
        console.error("Erreur chargement messages :", err);
        notification(
          "error",
          "Erreur lors du chargement des messages. Veuillez réessayer.",
        );
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, [notification]);

  const formatDate = (value) => {
    if (!value) return "";
    try {
      return new Date(value).toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return value;
    }
  };

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    setReplyContent("");
  };

  // Ouverture de la boîte de confirmation
  const askDeleteMessage = (msg) => {
    setMessageToDelete(msg);
    setConfirmOpen(true);
  };

  // Suppression côté backend + front
  const handleConfirmDelete = useCallback(async () => {
    if (!messageToDelete) return;

    const id = messageToDelete.id;

    try {
      // Suppression côté backend
      await api.delete(`admin/messages/${id}/`);

      // Mise à jour locale
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
        setReplyContent("");
      }

      notification("success", "Message supprimé avec succès.");
    } catch (err) {
      console.error("Erreur suppression message :", err);
      notification(
        "error",
        "Erreur lors de la suppression du message. Réessayez plus tard.",
      );
    } finally {
      setConfirmOpen(false);
      setMessageToDelete(null);
    }
  }, [messageToDelete, selectedMessage, notification]);

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setMessageToDelete(null);
  };

  const handleSendReply = async () => {
    if (!selectedMessage) return;
    if (!replyContent.trim()) return;

    setSendingReply(true);
    try {
      await api.post("admin/messages/reply/", {
        message_id: selectedMessage.id,
        contenu: replyContent,
      });

      setReplyContent("");
      notification("success", "Réponse envoyée avec succès.");
    } catch (err) {
      console.error("Erreur envoi réponse :", err);
      notification(
        "error",
        "Erreur lors de l’envoi de la réponse. Vérifiez votre connexion.",
      );
    } finally {
      setSendingReply(false);
    }
  };

  const unreadCount = 0;

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50 py-6 px-4 md:px-8">
        {/* Barre de notification en haut */}
        <div className="max-w-6xl mx-auto mb-3">
          <NotificationBar
            type={notificationState.type}
            message={notificationState.message}
            onClose={clearNotification}
          />
        </div>

        <div className="mb-5">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Boîte de réception
          </h1>
        </div>

        <div className="w-full max-w-6xl mx-auto h-[75vh] bg-white rounded-sm shadow-xl overflow-hidden flex border border-slate-200">
          {/* Colonne gauche */}
          <div className="w-[32%] border-r border-slate-200 flex flex-col bg-slate-50">
            <div className="px-4 py-3 bg-blue-600 text-white flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Messages</span>
                <span className="text-[11px] text-blue-100">
                  {messages.length} reçu(s)
                </span>
              </div>
              {unreadCount > 0 && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-blue-300">
                  {unreadCount} non lu(s)
                </span>
              )}
            </div>

            <div className="flex-1 overflow-auto">
              {loading && (
                <div className="p-4 text-xs text-slate-400 text-center">
                  Chargement...
                </div>
              )}

              {!loading && messages.length === 0 && (
                <div className="p-6 text-xs text-slate-400 text-center">
                  Aucun message pour le moment.
                </div>
              )}

              {!loading &&
                messages.map((m) => {
                  const fullName = `${m.prenom || ""} ${m.nom || ""}`.trim();
                  const isSelected = selectedMessage?.id === m.id;
                  const isUnread = false;

                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleSelectMessage(m)}
                      className={[
                        "w-full flex flex-col items-start px-4 py-3 text-left border-b border-slate-200/60 transition",
                        isSelected ? "bg-blue-50" : "hover:bg-slate-100",
                      ].join(" ")}
                    >
                      <div className="flex items-center w-full justify-between gap-2 mb-1">
                        <span className="text-[13px] font-semibold text-slate-900 truncate">
                          {fullName || m.email || "Utilisateur"}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {formatDate(m.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center w-full justify-between gap-2">
                        <span className="text-[12px] text-slate-600 truncate">
                          {m.sujet || "Sans objet"}
                        </span>
                        {isUnread && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-600 text-white font-semibold">
                            Nouveau
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Colonne droite */}
          <div className="flex-1 flex flex-col bg-slate-50">
            <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
              {selectedMessage ? (
                <>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">
                      {`${selectedMessage.prenom || ""} ${
                        selectedMessage.nom || ""
                      }`.trim() || "Utilisateur"}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {selectedMessage.email || ""}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {formatDate(selectedMessage.created_at)}
                  </span>
                </>
              ) : (
                <span className="text-sm text-slate-500">
                  Sélectionnez un message dans la liste
                </span>
              )}
            </div>

            <div className="flex-1 px-4 py-4 overflow-auto bg-slate-50">
              {!selectedMessage && (
                <div className="h-full flex items-center justify-center">
                  <div className="bg-white rounded-2xl px-6 py-4 text-center shadow-sm border border-slate-100">
                    <p className="text-sm font-semibold text-slate-800">
                      Aucun message sélectionné
                    </p>
                  </div>
                </div>
              )}

              {selectedMessage && (
                <div className="flex flex-col gap-3 max-w-2xl">
                  <div className="self-start max-w-[85%]">
                    <div className="rounded-2xl rounded-bl-sm bg-white shadow-sm px-4 py-3 border border-slate-100">
                      <div className="text-[12px] font-semibold text-slate-800 mb-1">
                        {selectedMessage.sujet || "Sans objet"}
                      </div>
                      <div className="text-sm text-slate-800 whitespace-pre-line">
                        {selectedMessage.message}
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 ml-1">
                      {formatDate(selectedMessage.created_at)}
                    </div>
                  </div>

                  <div className="self-start max-w-[85%]">
                    <div className="mt-1 inline-block rounded-xl bg-blue-50 border border-blue-100 px-3 py-2 text-[11px] text-slate-700">
                      <div>
                        <span className="font-semibold">Filière :</span>{" "}
                        {selectedMessage.filiere || "-"}
                      </div>
                      <div>
                        <span className="font-semibold">Niveau :</span>{" "}
                        {selectedMessage.niveau || "-"}
                      </div>
                      <div>
                        <span className="font-semibold">CIN :</span>{" "}
                        {selectedMessage.cin || "-"}
                      </div>
                      <div>
                        <span className="font-semibold">Téléphone :</span>{" "}
                        {selectedMessage.telephone || "-"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 py-3 bg-white border-t border-slate-200 flex items-center gap-3">
              {selectedMessage ? (
                <>
                  <button
                    type="button"
                    onClick={() => askDeleteMessage(selectedMessage)}
                    className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition"
                    title="Supprimer le message"
                  >
                    <DeleteIcon />
                  </button>

                  <div className="flex-1 flex items-center bg-slate-100 rounded-full px-3 py-2 border border-slate-200 focus-within:border-blue-500 focus-within:bg-white transition">
                    <textarea
                      className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 resize-none max-h-24"
                      rows={1}
                      placeholder="Écrire une réponse..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                  </div>

                  <button
                    type="button"
                    disabled={!replyContent.trim() || sendingReply}
                    onClick={handleSendReply}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-md hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    {sendingReply ? "Envoi..." : "Envoyer"}
                  </button>
                </>
              ) : (
                <div className="text-xs text-slate-400">
                  Sélectionnez un message pour répondre.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Boîte de dialogue de confirmation de suppression */}
      <ConfirmDialog
        open={confirmOpen}
        title="Supprimer le message"
        message="Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </AdminLayout>
  );
}
