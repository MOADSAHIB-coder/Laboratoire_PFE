import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Input({
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  className = "",
  onFocus,
  minLength,
  isTouched,
  checked,
  errors,
  disabled,
  ...rest
}) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);

  const finalType = type === "password" ? (show ? "text" : "password") : type;

  // Couleur de la bordure et du focus
  let borderColor = "border-gray-400";
  let ringColor = "focus:ring-blue-500";

  if (focused) {
    ringColor = "focus:ring-blue-500";
  }

  if (minLength && value.length > 0 && value.length < minLength) {
    ringColor = "focus:ring-red-500";
  }

  if (isTouched && errors) {
    borderColor = "border-red-500";
    ringColor = "focus:ring-red-500";
  }

  // Classes par défaut selon le type
  const defaultClasses =
    type === "checkbox"
      ? `w-4 h-4 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`
      : `w-full px-3 py-3 ${borderColor}  focus:outline-none focus:ring-2 ${ringColor}`;

  return (
    <div className="relative">
      <input
        type={finalType}
        name={name}
        value={type === "checkbox" ? undefined : value}
        checked={type === "checkbox" ? checked : undefined}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        onFocus={(e) => {
          setFocused(true);
          onFocus && onFocus(e);
        }}
        minLength={minLength}
        className={`${defaultClasses} ${className}`} // concatène les classes passées
        autoComplete={type === "password" ? "new-password" : "off"}
        onPaste={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        {...rest}
      />

      {/* Label pour checkbox */}
      {type === "checkbox" && (
        <label className="ml-2 text-sm text-gray-600 cursor-pointer">
          {placeholder}
        </label>
      )}

      {/* Bouton œil pour mot de passe */}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {show ? <EyeOff /> : <Eye />}
        </button>
      )}
    </div>
  );
}

export default Input;
