import { NavLink } from "react-router-dom";
import { useState } from "react";

function DropdownMenu({ title, items }) {
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);

  return (
    <div className="relative group">
      {/* Bouton principal */}
      <button
        onClick={() => {
          setOpen(!open);
          setTouched(!open);
        }}
        className={`px-3 py-1 font-bold hover:bg-gray-100 ${touched ? "border-b-2 border-black bg-gray-100" : ""} transition justify-center  flex items-center gap-1`}
      >
        {title}
        <span className="text-gray-500 text-lg pl-3 ">⌄</span>
      </button>

      {/* Dropdown */}

      <div
        className={`
          absolute top-full left-0 mt-2 w-80 bg-white shadow-lg border-b-8 border-black flex flex-col z-50
          opacity-0 -translate-y-4 pointer-events-none
          transition-all duration-300 ease-in-out
          group-hover:opacity-100 group-hover:translate-y-0
          ${open ? "opacity-100 translate-y-0 pointer-events-auto" : ""}
        `}
      >
        {items.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className="block px-4 py-2 hover:bg-gray-100  transition"
            onClick={() => {
              setOpen(false);
              setTouched(false);
            }}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default DropdownMenu;
