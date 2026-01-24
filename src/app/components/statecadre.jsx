function StatCard({ title, value, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4">
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      {value && <p className="text-2xl font-bold text-blue-600">{value}</p>}
      {children}
    </div>
  );
}

export default StatCard