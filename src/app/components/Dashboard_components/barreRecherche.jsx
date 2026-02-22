import { FaSearch } from "react-icons/fa";

function SearchBar({  placeholder = "Rechercher..." }) {
  return (
    <div className="relative w-full max-w-md">
      {/* Icon */}
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      {/* Input */}
      <input
        type="text"
        //value={value}
        //onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          pl-11 pr-4 py-3
          rounded-full
          bg-white
          border border-gray-200
          shadow-sm
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          focus:border-blue-500
          transition-all
          duration-300
          
        "
      />
    </div>
  );
}

export default SearchBar;
