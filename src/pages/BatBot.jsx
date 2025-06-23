import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import AIChatCards from '../components/AIChatCards'

function BatBot() {
  const chatMessages = [
    "What should I cook today?",
    "Help me split the bill",
    "Remind me about groceries",
    "What's the weather like?",
    "Plan my day"
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full min-h-screen bg-[#ffffff] p-4 md:p-6 pb-20 md:pb-6">
        <Navbar />
        <h1 className="text-2xl md:text-3xl font-light text-[#424495] mt-6 mb-4 ml-2 animate-fadeInUp">BAT BOT</h1>
        
        {/* Main content */}
        <div className="flex flex-col gap-6 mt-2 lg:flex-row">
          {/* Left section */}
          <div className="flex flex-col w-full gap-6 lg:w-2/3">
            {/* Welcome card */}
            <div className="bg-[#EEEEFF] p-4 md:p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center min-h-[200px] md:h-90 animate-fadeInUp"
              style={{
                boxShadow: '-10px 9px 10px #6366F1'
              }}>
              {/* Left side */}
              <div className="flex flex-col justify-between mb-4 text-center md:text-left md:mb-0">
                <h1 className="text-3xl md:text-5xl font-300 text-[#3C3E87] ml-0 md:ml-10">Hi, Varsha!</h1>
                <p className="text-lg md:text-2xl text-[#6365f1b1] ml-0 md:ml-10 mt-2 md:mt-4">What are you doing today?</p>
                
                {/* Chat prompt */}
                <div className="flex flex-col items-center gap-4 mt-4 ml-0 md:flex-row md:mt-5 md:ml-9">
                  <svg width="40" height="55" viewBox="-20 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[55px] md:h-[75px]">
                    <path d="M30.1778 0.0603638C34.6374 2.92422 36.1239 7.22 36.1239 10.0838C36.1239 21.5393 36.1239 32.9947 33.1509 43.0182L31.6643 32.9947C27.2047 35.8585 21.2586 38.7224 18.2855 38.7224C15.3125 38.7224 9.36632 35.8585 4.90671 32.9947L3.42018 43.0182C0.447113 32.9947 0.447113 21.5393 0.447113 10.0838C0.447113 7.22 1.93365 2.92422 6.39325 0.0603638C4.90671 4.35614 4.90671 8.65192 6.39325 11.5158C12.3394 8.65192 24.2317 8.65192 30.1778 11.5158C31.6643 8.65192 31.6643 4.35614 30.1778 0.0603638ZM30.1778 22.9712C27.0468 27.1596 25.3466 28.0903 19.7721 30.1308C22.8845 32.9947 28.6448 32.055 31.6643 28.6989C32.9743 27.2401 32.2961 24.7074 30.1778 22.9712ZM6.39325 22.9712C4.27494 24.7074 3.59671 27.2401 4.90671 28.6989C7.92624 32.055 13.6866 32.9947 16.799 30.1308C11.2245 28.0903 9.52426 27.1596 6.39325 22.9712Z" fill="#424495"/>
                  </svg>
                  <div className='text-lg md:text-11xl text-[#6366F1] ml-0 md:ml-3 text-center md:text-left'>
                    Sup there! Still thinking? <br />
                    <span className='text-[#424495] text-base md:text-10xl'>Let's chat!</span>
                  </div>
                </div>
              </div>
              
              {/* Right side - Mascot */}
              <div className="flex items-center justify-center border-4 border-purple-300 rounded-2xl bg-[#FFFEFE] p-4 mr-0 md:mr-10">
                <h1 className="text-6xl md:text-[9rem]">🐳</h1>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="bg-[#3C3E87] p-4 md:p-6 rounded-2xl min-h-[300px] flex flex-col animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">Chat with BatBot</h2>
              
              {/* Chat Messages */}
              <div className="flex-1 space-y-3 mb-4 overflow-y-auto max-h-64">
                {chatMessages.map((message, index) => (
                  <div key={index} className="animate-slideInLeft" style={{ animationDelay: `${0.1 * index}s` }}>
                    <AIChatCards message={message} />
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex items-center gap-3 mt-4">
                <input
                  type="text"
                  placeholder="Ask BatBot anything..."
                  className="flex-1 px-4 py-3 rounded-xl border border-[#6366F1] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200"
                />
                <button className="px-6 py-3 bg-[#6366F1] text-white rounded-xl hover:bg-[#5a54cc] transition-all duration-200 transform hover:scale-105">
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Right section - Notifications */}
          <div className="w-full lg:w-1/3">
            <div className="p-4 bg-white rounded-xl animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6667 24.5H16.3333C16.3333 25.7833 15.2833 26.8333 14 26.8333C12.7167 26.8333 11.6667 25.7833 11.6667 24.5ZM24.5 22.1667V23.3333H3.5V22.1667L5.83333 19.8333V12.8333C5.83333 9.21666 8.16667 6.06666 11.6667 5.01666V4.66666C11.6667 3.38333 12.7167 2.33333 14 2.33333C15.2833 2.33333 16.3333 3.38333 16.3333 4.66666V5.01666C19.8333 6.06666 22.1667 9.21666 22.1667 12.8333V19.8333L24.5 22.1667ZM19.8333 12.8333C19.8333 9.56666 17.2667 6.99999 14 6.99999C10.7333 6.99999 8.16667 9.56666 8.16667 12.8333V21H19.8333V12.8333Z" fill="#6366F1"/>
                  </svg>
                  <h3 className="font-600 text-[#424495]">Quick Actions</h3>
                </div>
              </div>
              <ul className="mt-4 space-y-4">
                {[
                  'Check Food Storage 🍎',
                  'Split Recent Bill 💰',
                  'Notify Friends 👥'
                ].map((action, index) => (
                  <li key={index} className="flex items-center justify-between bg-[#EEEEFF] rounded-lg px-3 py-3 transform transition-all duration-200 hover:scale-105 hover:shadow-md animate-slideInRight cursor-pointer"
                    style={{
                      boxShadow: '-8px 5px 10px #6366F1',
                      animationDelay: `${0.1 * index}s`
                    }}>
                    <span className="text-sm md:text-base">{action}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 transition-colors duration-200 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BatBot