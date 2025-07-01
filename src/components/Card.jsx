function Card({ title, value, icon, onClick }) {
  return (
    <div
      className="bg-gradient-to-br from-[#064469] to-[#5790AB] p-4 rounded-2xl gap-5 m-4 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      style={{
        boxShadow: '-8px 5px 10px #9CCDDB'
      }}
      onClick={onClick}
    >
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center h-10 mt-2 mb-3 text-5xl text-white">{icon}</div>
        <div>
          <h2 className="text-[1.5rem] text-white/90 font-500 ml-3">{title}</h2>
          <p className="mt-3 ml-3 text-2xl font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default Card