function StatCard({ title, value, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 ease-in-out p-4 w-full flex-1 min-w-[200px]">
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      {value && <p className="text-2xl font-bold text-blue-600">{value}</p>}
      {children}
    </div>
  );
}

export default StatCard;
