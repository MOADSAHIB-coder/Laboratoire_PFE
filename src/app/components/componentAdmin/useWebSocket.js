import { useEffect, useRef } from "react";

export default function useWebSocket(url, onMessage) {

  const socketRef = useRef(null);

  useEffect(() => {

    //  ouvrir la connexion websocket
    const socket = new WebSocket(url);

    socketRef.current = socket;

    // quand la connexion est ouverte
    socket.onopen = () => {
      console.log("WebSocket connecté");
    };

    // quand un message arrive
    socket.onmessage = (event) => {

      // convertir le message JSON
      const data = JSON.parse(event.data);

      // envoyer la donnée au composant
      if (onMessage) {
        onMessage(data);
      }

    };

    //  gestion des erreurs
    socket.onerror = (error) => {
      console.error("WebSocket erreur :", error);
    };

    // fermeture
    socket.onclose = () => {
      console.log("WebSocket fermé");
    };

    //  nettoyage quand le composant disparaît
    return () => {
      socket.close();
    };

  }, [url, onMessage]);
}