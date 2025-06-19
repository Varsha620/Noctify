function Sidebar() {
  return (
    <div className="bg-[#6c63ff] text-gray-100 w-20 min-h-screen flex flex-col items-center py-4 space-y-6">
      {/* Logo */}
      <div className="text-2xl font-semibold mb-4">
        🦇
      </div>

      {/* Menu */}
      <ul className="flex flex-col space-y-4">
        <li className="p-2 hover:bg-[#5a54cc] rounded-md cursor-pointer">
          🏡
        </li>
        <li className="p-2 hover:bg-[#5a54cc] rounded-md cursor-pointer">
          🍽
        </li>
        <li className="p-2 hover:bg-[#5a54cc] rounded-md cursor-pointer">
          💸
        </li>
        <li className="p-2 hover:bg-[#5a54cc] rounded-md cursor-pointer">
          🦇
        </li>
        <li className="p-2 hover:bg-[#5a54cc] rounded-md cursor-pointer">
          ⚙
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
