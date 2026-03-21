export default function StatCard({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
      {stats.map((s) => (
        <div
          key={s.id}
          className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:shadow-md hover:-translate-y-0.5 transform transition"
        >
          <p className="text-blue-700 text-xs md:text-sm font-medium tracking-wide text-center">
            {s.title}
          </p>
          <p className="text-2xl md:text-3xl text-blue-700 font-bold mt-2">
            {s.value}
          </p>
          {s.subtitle && (
            <p className="text-[11px] md:text-xs text-gray-400 mt-1 text-center">
              {s.subtitle}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
