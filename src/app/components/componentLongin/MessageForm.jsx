export function FormMessage({ message, type }) {
  if (!message) return null;
  return (
    <p
      className={`text-sm  ${type === "error" ? "text-red-500" : "text-green-500"}`}
    >
      {message}
    </p>
  );
}
