import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AIChatCard from '../components/AIChatCards';

function BatBot() {
  const chats = [
    { message: 'How to cook Pasta?' },
    { message: 'Suggest a random task?' }
  ];


  return (
    <div className="flex flex-col w-full min-h-screen bg-white md:flex-row">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full p-4 ">
        <Navbar />
        <h2 className="text-3xl font-light text-[#424495] mt-6 mb-4 ml-2">"Call me Bat-Bot"</h2>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Chat Section */}
          <div className="flex flex-1 rounded-2xl bg-[#EEEEFF] shadow-lg overflow-hidden min-h-[500px] mr-10 mt-3 border-[#6163A8] border-[1px]" style={{ boxShadow: '0px 4px 15px 5px #6163A8' }}>
            {/* Left - Recent Chats */}
            <div className="w-1/3 bg-[#3F3E8C] text-white flex flex-col py-4">
              <h3 className="flex items-center gap-2 pl-4 mb-4 text-sm font-medium text-white">
                Recent Chats
              </h3>
              <div className="flex flex-col gap-2 px-2">
                {chats.map((chat, index) => (
                  <AIChatCard message={chat.message} key={index} />
                ))}
              </div>
            </div>

            {/* Middle - Chat UI */}
            <div className="flex flex-1 flex-col justify-end items-center bg-[#EEEEFF] p-4 relative ">
              <div className="flex items-center justify-center flex-1">
                <div className="text-[#C9C8F4] flex flex-col items-center">
                  {/* Replace this with your mascot SVG */}
                <svg width="147" height="147" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M110.25 4.59375C124.031 13.7812 128.625 27.5625 128.625 36.75C128.625 73.5 128.625 110.25 119.438 142.406L114.844 110.25C101.062 119.438 82.6875 128.625 73.5 128.625C64.3125 128.625 45.9375 119.438 32.1562 110.25L27.5625 142.406C18.375 110.25 18.375 73.5 18.375 36.75C18.375 27.5625 22.9688 13.7812 36.75 4.59375C32.1562 18.375 32.1562 32.1562 36.75 41.3438C55.125 32.1562 91.875 32.1562 110.25 41.3438C114.844 32.1562 114.844 18.375 110.25 4.59375ZM110.25 78.0938C100.574 91.5305 95.3203 94.5164 78.0938 101.062C87.7119 110.25 105.513 107.235 114.844 96.4688C118.892 91.7889 116.796 83.6637 110.25 78.0938ZM36.75 78.0938C30.2039 83.6637 28.108 91.7889 32.1562 96.4688C41.4873 107.235 59.2881 110.25 68.9062 101.062C51.6797 94.5164 46.4256 91.5305 36.75 78.0938Z" fill="#9591EF" />
                </svg>
                  <p className="text-md text-[#6366F1] bg-[#736ded6a] p-1 px-5 rounded-full mt-9 w-full">Bored? Lets mess things😏</p>
                  <p className="text-md text-[#6366F1] bg-[#736ded6a] p-1 px-5 rounded-full mt-3 w-full">In chef mode? Just ask my lord🧎‍♂️</p>

                </div>
              </div>

              {/* Chat Input */}
              <div className="flex items-center w-full max-w-sm px-4 py-2 mt-4 bg-white rounded-full shadow-inner">
                <input type="text" placeholder="BatBot at your service👾..." className="flex-1 outline-none text-sm text-[#3C3E87] placeholder-[#787bd6b0]" />
                <button className="ml-2 w-8 h-8 bg-[#BDBDFE] rounded-full flex items-center justify-center hover:bg-[#9B9BFE]">↑</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BatBot;
