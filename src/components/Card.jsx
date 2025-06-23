function Card({ title, value, icon }) {
  return (
    <div
      className="bg-[#EEEEFF] p-4 rounded-2xl gap-5 m-4"
      style={{
        boxShadow: '-8px 5px 10px #6366F1'
      }}
    >
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center h-10 mt-2 mb-3 text-5xl">{icon}</div>
        <div>
          <h2 className="text-[1.5rem] text-[#757575e5] font-500 ml-3">{title}</h2>
          <p className="text-2xl font-semibold text-[#2E2F6A] ml-3 mt-3">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default Card