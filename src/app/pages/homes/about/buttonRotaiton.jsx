import { useState } from "react";

export function ButtonRotation({
  children,
  className = "",
  titleclasse = "",
  titre,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <button onClick={() => setOpen(!open)} className={className}>
        <span className={titleclasse}>{titre}</span>
        <span
          className={`transform transition ${className} ${open ? "rotate-180" : ""}`}
        >
          ⌄
        </span>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

export function ButtonPreview({ preview, children, className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full bg-white text-blue-900 text-left px-4 pt-4  hover:bg-blue-100 transition rounded-lg ${className}`}
      >
        <p className={`text-justify font-normal ${className}`}>{preview}</p>

        <div className="flex justify-center mt-2">
          <span
            className={`transform transition duration-300 text-4xl font-semibold text-blue-400 ${
              open ? "rotate-180" : ""
            }`}
          >
            ⌄
          </span>
        </div>
      </button>

      {open && (
        <div className="bg-white px-4 pb-4  text-justify text-blue-900">
          {children}
        </div>
      )}
    </div>
  );
}

export default ButtonRotation;
