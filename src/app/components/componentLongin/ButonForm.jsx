export const filieres = [
  { value: "GRS", label: "Gestion des réseaux et Sécurité " },
  { value: "ID", label: "Ingenierie des donneés" },
  { value: "CDL", label: "Conception et Dévelopement Logiciel" },
  { value: "IG", label: "Informatique et Gestion" },
];

export const niveaux = [
  { value: "S1-S2", label: "1ère année" },
  { value: "S3-S2", label: "2ème année" },
];

export function Button({
  children,
  disabled = false,
  onClick,
  classname,
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
}) {
  const borderColor =
    isTouched && !value ? "border-red-500" : "border-gray-400";
  const focusColor =
    isTouched && !value ? "focus:ring-red-500" : "focus:ring-blue-500";

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border ${borderColor} rounded-md text-lg px-3 py-3 bg-white text-gray-400 focus:outline-none focus:ring-2 ${focusColor}`}
    >
      <option value="">Sélectionnez votre filière</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
