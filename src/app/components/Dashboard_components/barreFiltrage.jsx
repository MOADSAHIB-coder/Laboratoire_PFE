function FilterBar() {
  return (
    <div className=" p-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Filière */}
        <select
          //value={filters.filiere}
          //onChange={(e) => setFilters({ ...filters, filiere: e.target.value })}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Filière</option>
          <option value="Informatique">Informatique</option>
          <option value="Gestion">Gestion</option>
          <option value="Reseaux">Réseaux</option>
        </select>

        {/* Niveau */}
        <select
          //value={filters.niveau}
          //onChange={(e) => setFilters({ ...filters, niveau: e.target.value })}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Niveau</option>
          <option value="Bac+1">Bac +1</option>
          <option value="Bac+2">Bac +2</option>
        </select>

        {/* Type */}
        <select
          //value={filters.type}
          //onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Type</option>
          <option value="cours">Cours</option>
          <option value="tp">TP</option>
          <option value="correction">Correction</option>
          <option value="projet">Projet</option>
        </select>

        {/* Année universitaire */}
        <select
          //value={filters.annee}
          //onChange={(e) => setFilters({ ...filters, annee: e.target.value })}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Année universitaire</option>
          <option value="2023-2024">2023 - 2024</option>
          <option value="2024-2025">2024 - 2025</option>
          <option value="2025-2026">2025 - 2026</option>
        </select>

      </div>
    </div>
  );
}

export default FilterBar;
