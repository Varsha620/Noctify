import Navbar from '../components/Navbar'
import Card from '../components/Card'

function Dashboard() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f6f7fb] p-6">
      <Navbar />
      
      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Left section */}
        <div className="flex flex-col gap-6 w-full md:w-2/3">
          {/* Welcome card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-purple-800">Hi, Varsha!</h1>
            <p className="text-sm text-purple-500 mt-1">
              What are you doing today?
            </p>
            <div className="text-xs mt-2 text-zinc-400">
              🦑 Sup there! Still thinking? Let's chat! 
            </div>
          </div>
          
          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card title="Average spent this Month" value="Rs. 5,000" icon="🛍️" />
            <Card title="Items Available" value="Tomato +3 more" icon="🍅" />
            <Card title="Latest Expiring item" value="Paneer" icon="📅" />
            <Card title="Notify your friends" value="" icon="📸" />
          </div>
        </div>
        
        {/* Right section - Notifications */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Notifications</h3>
              <button className="text-sm text-purple-500">See all</button>
            </div>
            <ul className="mt-4 text-sm text-gray-600 space-y-3">
              <li>Warden on rounds �</li>
              <li>Aradhana updated food 🍎</li>
              <li>Maggie soon?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard