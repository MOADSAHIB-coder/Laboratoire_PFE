export const filieres = [
  { value: "GRS", label: "Gestion des réseaux et Sécurité " },
  { value: "ID", label: "Ingenierie des donneés" },
  { value: "CDL", label: "Conception et Dévelopement Logiciel" },
  { value: "IG", label: "Informatique et Gestion" },
];

export const niveaux = [
  { value: "bac+1", label: "BAC+1 " },
  { value: "bac+2", label: "BAC+2" },
  { value: "bac+3", label: "BAC+3" },
  { value: "Autres", label: "Autres" },
];

export function Button({
  children,
  disabled = false,
  onClick,
  classname = "",
  type,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`px-4 py-4 text-lg w-full rounded ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"} text-white font-medium ${classname}`}
    >
      {children}
    </button>
  );
}

export function Select({
  options = [],
  value,
  onChange,
  name,
  isTouched = false,
  children,
  className = "",
}) {
  const borderColor =
    isTouched && !value ? "border-red-500" : "border-gray-400";
  const focusColor =
    isTouched && !value ? "border focus:ring-red-500" : "focus:ring-blue-500";

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border-b-2 ${borderColor} text-lg px-3 py-3 bg-white text-gray-400 focus:outline-none focus:ring-2 ${focusColor} ${className}`}
    >
      <option value="">{children}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
