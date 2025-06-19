function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md">
      {/* Search */}
      <div className="relative w-1/3">
        <input
          className="w-full p-2 pl-8 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="Search"
          type="text"
        />
        <span className="absolute left-2 top-3">🔍</span>
      </div>

      {/* Right side icons */}
      <div className="flex items-center space-x-4">
        {/* Notification */}
        <div className="p-2 relative cursor-pointer">
          🔔
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* User Profile */}
        <div className="p-2 cursor-pointer">
          👤
        </div>
      </div>
    </div>
  )
}

export default Navbar