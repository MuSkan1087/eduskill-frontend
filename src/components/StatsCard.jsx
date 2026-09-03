function StatsCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:scale-105 transition">
      <div className={`text-4xl ${color}`}>
        {icon}
      </div>

      <div>
        <h3 className="text-gray-500">
          {title}
        </h3>

        <h2 className="text-3xl font-bold">
          {value}
        </h2>
      </div>
    </div>
  );
}

export default StatsCard;