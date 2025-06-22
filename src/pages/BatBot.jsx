import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AIChatCard from '../components/AIChatCards';
import MobileNavbar from '../components/MobileNavbar';

function BatBot() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const chats = [
    { message: 'How to cook Pasta?' },
    { message: 'Suggest a random task?' },
    { message: 'What\'s the weather like?' },
    { message: 'Help me plan my day' }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { type: 'user', content: message }]);
      setMessage('');
      // Simulate bot response
      setTimeout(() => {
        setChatHistory(prev => [...prev, { type: 'bot', content: 'Thanks for your message! I\'m here to help you with anything you need.' }]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white md:flex-row">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full p-4 pb-20 md:pb-4">
        <Navbar />
        <h2 className="text-2xl md:text-3xl font-light text-[#424495] mt-6 mb-4 ml-2">"Call me Bat-Bot"</h2>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Chat Section */}
          <div className="flex flex-1 rounded-2xl bg-[#EEEEFF] shadow-lg overflow-hidden min-h-[500px] mr-0 md:mr-10 mt-3 border-[#6163A8] border-[1px] animate-fadeInUp" style={{ boxShadow: '0px 4px 15px 5px #6163A8' }}>
            {/* Left - Recent Chats */}
            <div className="w-1/3 bg-[#3F3E8C] text-white flex flex-col py-4 rounded-l-2xl">
              <h3 className="flex items-center gap-2 pl-2 md:pl-4 mb-4 text-xs md:text-sm font-medium text-white">
                Recent Chats
              </h3>
              <div className="flex flex-col gap-2 px-1 md:px-2 max-h-96 overflow-y-auto">
                {chats.map((chat, index) => (
                  <div key={index} className="transform transition-all duration-200 hover:scale-105">
                    <AIChatCard message={chat.message} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Chat UI */}
            <div className="flex flex-1 flex-col justify-between bg-[#EEEEFF] p-2 md:p-4 relative">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto mb-4">
                {chatHistory.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-[#C9C8F4] flex flex-col items-center animate-bounce">
                      <svg width="120" height="120" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[147px] md:h-[147px]">
                        <path d="M110.25 4.59375C124.031 13.7812 128.625 27.5625 128.625 36.75C128.625 73.5 128.625 110.25 119.438 142.406L114.844 110.25C101.062 119.438 82.6875 128.625 73.5 128.625C64.3125 128.625 45.9375 119.438 32.1562 110.25L27.5625 142.406C18.375 110.25 18.375 73.5 18.375 36.75C18.375 27.5625 22.9688 13.7812 36.75 4.59375C32.1562 18.375 32.1562 32.1562 36.75 41.3438C55.125 32.1562 91.875 32.1562 110.25 41.3438C114.844 32.1562 114.844 18.375 110.25 4.59375ZM110.25 78.0938C100.574 91.5305 95.3203 94.5164 78.0938 101.062C87.7119 110.25 105.513 107.235 114.844 96.4688C118.892 91.7889 116.796 83.6637 110.25 78.0938ZM36.75 78.0938C30.2039 83.6637 28.108 91.7889 32.1562 96.4688C41.4873 107.235 59.2881 110.25 68.9062 101.062C51.6797 94.5164 46.4256 91.5305 36.75 78.0938Z" fill="#9591EF" />
                      </svg>
                      <div className="mt-4 text-center">
                        <p className="text-sm md:text-md text-[#6366F1] bg-[#736ded6a] p-2 px-3 md:px-5 rounded-full mt-6 md:mt-9">Bored? Let's mess things😏</p>
                        <p className="text-sm md:text-md text-[#6366F1] bg-[#736ded6a] p-2 px-3 md:px-5 rounded-full mt-3">In chef mode? Just ask my lord🧎‍♂️</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chatHistory.map((msg, index) => (
                      <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideInUp`}>
                        <div className={`max-w-xs md:max-w-sm p-3 rounded-2xl ${
                          msg.type === 'user' 
                            ? 'bg-[#6366F1] text-white' 
                            : 'bg-white text-[#424495] border border-[#6366F1]'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex items-center w-full px-3 md:px-4 py-2 bg-white rounded-full shadow-inner border border-[#6366F1]">
                <input 
                  type="text" 
                  placeholder="BatBot at your service👾..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 outline-none text-sm text-[#3C3E87] placeholder-[#787bd6b0]" 
                />
                <button 
                  onClick={handleSendMessage}
                  className="ml-2 w-8 h-8 bg-[#BDBDFE] rounded-full flex items-center justify-center hover:bg-[#9B9BFE] transition-all duration-200 transform hover:scale-110 active:scale-95"
                >
                  ↑
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavbar />
    </div>
  );
}

export default BatBot;