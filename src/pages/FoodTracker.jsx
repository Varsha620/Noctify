import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MobileNavbar from '../components/MobileNavbar'

function FoodTracker() {
  return (
    <div className="min-h-screen w-full bg-[#ffffff] flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full p-4 pb-20 md:pb-4">
        <Navbar />
        
        <h1 className="text-2xl md:text-3xl font-light text-[#424495] mt-6 mb-4 ml-2 animate-fadeInUp">FOOD TRACKER</h1>

        <div className="flex flex-col justify-between mt-4 gap-7 lg:flex-row">
          {/* Storage Table */}
          <div className="flex-1 min-h-[500px] bg-[#EEEEFF] p-4 md:p-6 rounded-2xl shadow-lg w-full lg:w-2/3 h-full flex flex-col animate-fadeInUp"
            style={{ boxShadow: '-9px 10px 30px #524CC7' }}>
            <div className="flex items-center gap-3 mb-4">
              <svg width="60" height="60" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[80px] md:h-[80px]">
                <path d="M28.125 65.625V68.75H21.875V65.625C20.2174 65.625 18.6277 64.9665 17.4556 63.7944C16.2835 62.6223 15.625 61.0326 15.625 59.375V12.5C15.625 10.8424 16.2835 9.25268 17.4556 8.08058C18.6277 6.90848 20.2174 6.25 21.875 6.25H53.125C54.7826 6.25 56.3723 6.90848 57.5444 8.08058C58.7165 9.25268 59.375 10.8424 59.375 12.5V59.375C59.375 61.0326 58.7165 62.6223 57.5444 63.7944C56.3723 64.9665 54.7826 65.625 53.125 65.625V68.75H46.875V65.625H28.125ZM21.875 12.5V28.125H53.125V12.5H21.875ZM21.875 59.375H53.125V34.375H21.875V59.375ZM25 37.5H31.25V46.875H25V37.5ZM25 18.75H31.25V25H25V18.75Z" fill="#4A5FE1" />
              </svg>
              <h2 className="text-2xl md:text-3xl font-bold text-[#4D6CDA]">Your Storage</h2>
            </div>
            
            {/* Mobile-friendly table */}
            <div className="overflow-x-auto">
              <table className="w-full text-center min-w-[500px]">
                <thead>
                  <tr className="text-[#424495] text-lg md:text-2xl font-semibold">
                    <th className="py-2">Items</th>
                    <th className="py-2">|</th>
                    <th className="py-2">Added On</th>
                    <th className="py-2">|</th>
                    <th className="py-2">Added By</th>
                  </tr>
                </thead>
                <tbody className="text-[#423535]">
                  {[
                    { item: 'Apple', date: '5 Mar 2025', by: 'Varsha' },
                    { item: 'Banana', date: '5 Mar 2025', by: 'Alona' },
                    { item: 'Fresh Cream', date: '5 Mar 2025', by: 'Aradhana' }
                  ].map((row, index) => (
                    <tr key={index} className="transition-colors duration-200 animate-slideInUp hover:bg-white/50" style={{ animationDelay: `${0.1 * index}s` }}>
                      <td className="py-2">{row.item}</td>
                      <td className="py-2">|</td>
                      <td className="py-2">{row.date}</td>
                      <td className="py-2">|</td>
                      <td className="py-2">{row.by}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end mt-4">
              <button className="w-10 h-10 rounded-full bg-white text-[#4A5FE1] shadow-md hover:bg-[#e0e0ff] text-xl transform transition-all duration-200 hover:scale-110 active:scale-95">+</button>
            </div>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col w-full gap-5 lg:w-1/3">
            {/* Suggested Dishes */}
            <div className="bg-[#EEEEFF] p-4 rounded-xl shadow-md flex-1 min-h-[250px] animate-fadeInUp"
              style={{ boxShadow: '-5px 10px 30px #524CC7', animationDelay: '0.2s' }}>
              <h3 className="text-[#6366F1] text-medium text-lg md:text-xl m-3 md:m-5">Suggested Dishes :</h3>
              <ul className="m-3 mt-2 space-y-2 text-sm md:m-5 text-zinc-700">
                <li className="transform transition-all duration-200 hover:scale-105 hover:text-[#3C3E87]">→ <span className="font-semibold text-[#3C3E87]">Fruit Salad 🥗</span></li>
                <li className="transform transition-all duration-200 hover:scale-105 hover:text-[#3C3E87]">→ <span className="font-semibold text-[#3C3E87]">Smoothie 🥤</span></li>
              </ul>
            </div>

            {/* Reminders */}
            <div className="bg-[#EEEEFF] p-4 rounded-xl shadow-md flex-1 min-h-[250px] animate-fadeInUp"
              style={{ boxShadow: '-5px 10px 30px #524CC7', animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[40px] md:h-[40px]">
                  <path d="M6 2V6H4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V6H18V2H6ZM6 8H18V20H6V8ZM8 10V12H10V10H8ZM14 10V12H16V10H14Z" fill="#4A5FE1" />
                </svg>
                <h3 className="text-[#6366F1] font-medium text-base md:text-lg">Reminders</h3>
              </div>
              
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-xs md:text-sm min-w-[200px]">
                  <thead className="text-[#424495] font-200">
                    <tr>
                      <th className="pb-2 text-center">Items</th>
                      <th className="pb-2 text-center">Expiring In</th>
                    </tr>
                  </thead>
                  <tbody className="text-center text-zinc-700">
                    {[
                      { item: 'Banana', time: '2 days', color: 'bg-red-500' },
                      { item: 'Apples', time: '1 week', color: 'bg-yellow-400' },
                      { item: 'Fresh Cream', time: '1 month', color: 'bg-green-500' }
                    ].map((reminder, index) => (
                      <tr key={index} className="h-10 animate-slideInRight" style={{ animationDelay: `${0.1 * index}s` }}>
                        <td>{reminder.item}</td>
                        <td>
                          <span className={`px-2 py-1 text-xs text-white rounded-full ${reminder.color} animate-pulse`}>
                            {reminder.time}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodTracker