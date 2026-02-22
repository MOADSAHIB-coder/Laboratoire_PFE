import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

function SideBarItem({ icon, label, subItems }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // باش يبقى selected إلا كان شي subItem هو اللي active
  const isActive = subItems?.some(item => item.link === location.pathname);

  return (
    <div
      className="relative flex flex-col"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Main item */}
      <div
        className={`
          flex items-center py-2 px-4 rounded-lg cursor-pointer gap-3
          transition-colors duration-200
          ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"}
        `}
      >
        <img src={icon} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">{label}</span>

        {subItems && (
          <svg
            className={`ml-auto w-4 h-4 transition-transform duration-200 ${
              open ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </div>

      {/* Dropdown */}
      {subItems && open && (
        <div className="
            absolute left-4 top-full mt-0
            flex flex-col bg-white border shadow-lg
            rounded-lg z-50 xl:w-80 lg:w-44"
        >
                {subItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.link}
              className={({ isActive }) =>
                `px-4 py-2 transition-colors duration-200
                 ${isActive
                   ? "bg-blue-100 text-blue-600"
                   : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default SideBarItem;
