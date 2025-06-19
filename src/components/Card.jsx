function Card({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-start gap-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-600 mt-1">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default Card