function Profil({ membre }) {
  const photoSrc = membre.photo || "/images/default-avatar.png";

  return (
    <div className="ring-1">
      <img
        src={photoSrc}
        alt={membre.nom}
        className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
      />

      <h2 className="text-xl font-semibold text-center text-gray-900">
        {membre.nomPrenom}
      </h2>
      <p className="text-md text-center font-medium text-blue-600">
        {membre.statut}
      </p>
      <p className="text-md text-center font-medium text-blue-600">
        {membre.role}
      </p>
      <p className="text-md font-medium text-center text-blue-600">
        {membre.description}
      </p>
    </div>
  );
}

export default Profil;
