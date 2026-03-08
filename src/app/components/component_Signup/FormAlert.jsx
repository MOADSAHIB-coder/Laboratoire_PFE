function FormAlert({
  title = "Veuillez corriger les éléments suivants",
  errors = [],
}) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-4 text-amber-900 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
          !
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold tracking-tight text-amber-900">
            {title}
          </h3>

          <ul className="mt-2 space-y-1.5 text-sm leading-6 text-amber-800">
            {errors.map((msg, index) => (
              <li key={index} className="flex gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>{msg}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FormAlert;
