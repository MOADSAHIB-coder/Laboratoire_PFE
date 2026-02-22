import { useState } from "react";
import { FiStar } from "react-icons/fi";
import { etudiants } from "./DataTest";


function Communication() {

    const [selectedContact, setSelectedContact] = useState(null);
    const [search, setSearch] = useState("");
    
    // Fonction pour formater la date du dernier message
    const formatLastMessageDate = (dateStr) => {
    // Convertir la chaîne ISO en objet Date
    const messageDate = new Date(dateStr);

    // Date d'aujourd'hui
    const today = new Date();

    // Date d'hier
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    // Vérifier si le message est d'aujourd'hui
    const isToday =
        messageDate.getDate() === today.getDate() &&
        messageDate.getMonth() === today.getMonth() &&
        messageDate.getFullYear() === today.getFullYear();

    // Vérifier si le message est d'hier
    const isYesterday =
        messageDate.getDate() === yesterday.getDate() &&
        messageDate.getMonth() === yesterday.getMonth() &&
        messageDate.getFullYear() === yesterday.getFullYear();

    if (isToday) {
        // Si le message est d'aujourd'hui, afficher seulement l'heure hh:mm
        return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (isYesterday) {
        // Si le message est d'hier, afficher "Hier" + l'heure
        return `Hier ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
        // Sinon, afficher la date complète (dd/mm/yyyy)
        return messageDate.toLocaleDateString();
    }
    };



    const currentUser = {
        id: 1,
        nom: "Loubna",
        filiere: "Reseau",
        niveau: "S3"
    };

    
    const contacts = etudiants.filter(
        e => e.filiere === currentUser.filiere &&
            e.id !== currentUser.id &&
            e.nom.toLowerCase().includes(search.toLowerCase())
    );


  return (
    <div className="flex border md:border-black h-screen md:h-[87vh] lg:w-[99%] lg:h-[82vh] xl:h-[87vh] bg-gray-100 overflow-auto">
      
      {/* Contacts */}
      <aside className="w-80 md:w-80 lg:w-72 xl:w-96 bg-white border-r flex flex-col">
        <div className="absolute left-0 top-0 h-full w-1 bg-black rounded-r z-10"></div>
        <h2 className="p-4 text-lg font-bold uppercase">
            Mes contacts
        </h2>

        <div className="p-1">
          <input
            type="search"
            placeholder="Chercher vos contacts..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 pl-4 rounded-full lg:mb-2 bg-gray-200 outline-none"
          />
        </div>

        <ul className="flex-1 overflow-y-auto">
            {contacts.map(c => (
            <div onClick={() => setSelectedContact(c)}>
            <li key={c.id} 
                className={`flex items-center gap-3 p-3 cursor-pointer rounded
                ${selectedContact?.id === c.id ? "bg-gray-100 border border-blue-400" : "hover:bg-gray-100"}`}>
              
              {/* Avatar */}
              <img
                src={c.avatar || '/icons/user.png'}
                alt={c.nom}
                className="w-12 h-12 rounded-full object-cover"
              />

              {/* Infos */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-semibold">{c.role === 'etu' ? c.nom : <>{c.nom} - <FiStar className="inline text-blue-400" /></>}</p>
                  <span className="text-xs text-gray-400">{formatLastMessageDate(c.lastDate)}</span>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500 truncate">
                    {c.lastMessage}
                  </p>
                  {c.role === 'etu' ? (<span className="text-xs bg-blue-200 px-2 rounded">
                    Niveau : {c.niveau}
                  </span>)
                   : (
                        <span className="text-xs bg-blue-200 px-2 rounded">
                    Professeur
                  </span>)
                  }
                </div>
              </div>
            </li>
            </div>
          ))}
        </ul>
      </aside>

      {/* Chat */}
      <section className="flex-1 flex flex-col bg-[#f2f5f7]">        
        {!selectedContact ? (
          //pas de tap sur un contact
          <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
            Sélectionnez un contact
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-4 bg-white border-b flex items-center gap-3">
              <img
                src={selectedContact.avatar}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <p className="font-semibold">{selectedContact.nom}</p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-[#f2f5f7]">
              <div className="mb-2 text-right">
                <span className="inline-block bg-blue-300 p-2 rounded-lg">
                  Salam !
                </span>
              </div>

              <div className="mb-2 text-left">
                <span className="inline-block bg-white p-2 rounded-lg">
                  {selectedContact.lastMessage}
                </span>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder={`Message à ${selectedContact.nom}...`}
                className="flex-1 p-3 pl-5 rounded-full bg-gray-200 outline-none"
              />
              <button className="bg-blue-500 text-white px-6 py-2 rounded-full w-full sm:w-auto">
                Envoyer
              </button>
            </div>
          </>
        )}

      </section>
    </div>
  );
}

export default Communication;
