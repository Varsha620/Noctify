import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChatCard from '../components/ChatCard';

function NotifyFriends() {
  const chats = [
    { name: 'Nila', icon: '🦑', lastUpdate: 'Last update 2w ago', isActive: true },
    { name: 'Aradhana', icon: '👸', lastUpdate: 'Last update 1w ago', isActive: false },
    { name: 'Alona', icon: '🧙‍♀️', lastUpdate: '2 days ago', isActive: false },
    { name: 'Room T60', icon: '👩‍🦰👱‍♀️🧕', lastUpdate: '3 days ago', isActive: false },
  ];

  const updates = [
    { message: 'Warden on rounds 🐭', initial: 'VS' },
    { message: 'Maggie on floor 2..Rush🍜', initial: 'AR' },
    { message: 'Guys I reached home😘', initial: 'RO' },
    { message: 'Let me know when u r free...lets study', initial: 'AL' },
    { message: 'Guys I reached home😘', initial: 'NS' },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white md:flex-row">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full p-4">
        <Navbar />
        <h2 className="text-3xl font-light text-[#424495] mt-6 mb-4 ml-2">NOTIFY YOUR FRIENDS</h2>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Chat Section */}
          <div className="flex flex-1 rounded-2xl bg-[#EEEEFF] shadow-lg overflow-hidden min-h-[500px] border-[#6163A8] border-[1px]" style={{ boxShadow: '0px 4px 15px 5px #6163A8' }}>
            {/* Left - Recent Chats */}
            <div className="w-1/3 bg-[#3F3E8C] text-white flex flex-col py-4">
              <h3 className="flex items-center gap-2 pl-4 mb-4 text-sm font-medium text-white">
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 3.375C10.8147 3.375 8.23936 4.44174 6.34055 6.34054C4.44175 8.23935 3.37501 10.8147 3.37501 13.5C3.37501 16.1966 4.42688 18.6446 6.14588 20.4593L6.71289 21.0578L5.28751 23.625H13.5C14.8296 23.625 16.1463 23.3631 17.3747 22.8543C18.6031 22.3455 19.7193 21.5996 20.6595 20.6595C21.5997 19.7193 22.3455 18.6031 22.8543 17.3747C23.3631 16.1462 23.625 14.8296 23.625 13.5C23.625 12.1704 23.3631 10.8538 22.8543 9.62533C22.3455 8.39691 21.5997 7.28074 20.6595 6.34054C19.7193 5.40035 18.6031 4.65455 17.3747 4.14572C16.1463 3.63689 14.8296 3.375 13.5 3.375ZM1.12501 13.5C1.12501 6.66563 6.66563 1.125 13.5 1.125C20.3344 1.125 25.875 6.66563 25.875 13.5C25.875 20.3344 20.3344 25.875 13.5 25.875H1.46251L3.96001 21.3818C2.12424 19.1658 1.12134 16.3776 1.12501 13.5Z" fill="white" />
                </svg>

                Recent Chats
              </h3>
              <div className="flex flex-col gap-2 px-2">
                {chats.map((chat, index) => (
                  <ChatCard key={index} name={chat.name} icon={chat.icon} lastUpdate={chat.lastUpdate} isActive={chat.isActive} />
                ))}
              </div>
            </div>

            {/* Middle - Chat UI */}
            <div className="flex flex-1 flex-col justify-end items-center bg-[#EEEEFF] p-4 relative">
              <div className="flex items-center justify-center flex-1">
                <div className="text-[#C9C8F4] flex flex-col items-center">
                  {/* Replace this with your mascot SVG */}
                <svg width="172" height="172" viewBox="0 0 172 172" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.125 86.3153V133.021C16.125 138.496 18.3323 144.272 21.8583 148.264C25.4488 152.327 31.562 155.517 38.2485 152.156C43.2365 149.647 47.386 149.554 50.7615 151.819C58.8312 157.229 70.1688 157.229 78.2385 151.819C80.711 150.17 82.5887 149.611 84.151 149.597C85.7133 149.59 87.6268 150.113 90.171 151.819C98.2478 157.229 109.585 157.229 117.655 151.819C119.182 150.801 121.812 150.12 125.137 150.199C128.391 150.271 131.573 151.059 133.751 152.156C140.438 155.517 146.551 152.327 150.142 148.264C153.668 144.272 155.875 138.496 155.875 133.028V86.3153C155.875 47.5795 124.614 16.125 86 16.125C47.386 16.125 16.125 47.5795 16.125 86.3153ZM120.156 93.009C121.147 94.0329 121.69 95.4081 121.668 96.8326C121.645 98.257 121.057 99.6141 120.035 100.606C118.806 101.8 117.524 102.938 116.193 104.017L117.755 107.206C119.568 111.035 119.8 115.424 118.402 119.423C117.005 123.423 114.09 126.711 110.287 128.578C106.484 130.445 102.099 130.741 98.0801 129.401C94.0611 128.061 90.7309 125.193 88.8093 121.418L86.8528 117.426C77.8338 119.183 68.5416 118.97 59.6123 116.802C58.2477 116.44 57.0806 115.555 56.3632 114.339C55.6458 113.122 55.4358 111.673 55.7784 110.303C56.1211 108.933 56.989 107.753 58.1945 107.018C59.4 106.283 60.8464 106.052 62.221 106.375C70.3193 108.403 79.6288 108.432 89.0673 105.902C98.5058 103.372 106.554 98.6993 112.56 92.8872C113.584 91.8966 114.959 91.353 116.383 91.3759C117.808 91.3987 119.165 91.9861 120.156 93.009ZM98.4628 116.68L97.4093 114.538C100.854 113.295 104.117 111.814 107.199 110.094L108.109 111.943C108.679 113.215 108.733 114.658 108.259 115.968C107.786 117.279 106.822 118.354 105.571 118.968C104.32 119.581 102.879 119.685 101.553 119.257C100.227 118.829 99.1191 117.91 98.4628 116.68ZM66.8578 71.6667L67.596 75.1712C67.7606 75.8683 67.7843 76.5912 67.6655 77.2976C67.5468 78.0039 67.2881 78.6794 66.9046 79.2843C66.5211 79.8893 66.0205 80.4115 65.4324 80.8203C64.8442 81.229 64.1803 81.5161 63.4796 81.6646C62.7789 81.8132 62.0556 81.8202 61.3522 81.6852C60.6487 81.5503 59.9794 81.2761 59.3834 80.8788C58.7874 80.4815 58.2769 79.9691 57.8818 79.3717C57.4866 78.7743 57.2149 78.1039 57.0825 77.4L56.3372 73.8955C56.1725 73.1984 56.1489 72.4755 56.2677 71.7691C56.3864 71.0628 56.6451 70.3873 57.0286 69.7823C57.4121 69.1774 57.9126 68.6552 58.5008 68.2464C59.089 67.8376 59.7529 67.5506 60.4536 67.402C61.1543 67.2535 61.8776 67.2465 62.581 67.3814C63.2844 67.5164 63.9538 67.7906 64.5498 68.1879C65.1457 68.5852 65.6563 69.0976 66.0514 69.695C66.4465 70.2924 66.7183 70.9627 66.8507 71.6667M95.5173 60.071C96.2082 59.9238 96.9212 59.9142 97.6158 60.0427C98.3103 60.1713 98.9727 60.4355 99.565 60.8202C100.157 61.2049 100.668 61.7026 101.068 62.2848C101.468 62.867 101.749 63.5224 101.896 64.2133L102.641 67.7178C102.8 68.4128 102.82 69.1326 102.698 69.8352C102.577 70.5378 102.317 71.2092 101.933 71.8103C101.55 72.4114 101.05 72.9302 100.465 73.3365C99.8785 73.7428 99.2176 74.0284 98.5201 74.1767C97.8227 74.325 97.1027 74.3331 96.4021 74.2005C95.7015 74.0678 95.0343 73.7971 94.4394 73.4041C93.8445 73.0111 93.3336 72.5036 92.9367 71.9113C92.5398 71.3189 92.2647 70.6535 92.1275 69.9538L91.3822 66.4422C91.087 65.048 91.3575 63.5937 92.1343 62.399C92.9111 61.2043 94.1305 60.3669 95.5245 60.071" fill="#6366F1" fill-opacity="0.47" />
                </svg>

                  <p className="text-8xl">...</p>
                </div>
              </div>

              {/* Chat Input */}
              <div className="flex items-center w-full max-w-sm px-4 py-2 mt-4 bg-white rounded-full shadow-inner">
                <input type="text" placeholder="Notify something exciting✨..." className="flex-1 outline-none text-sm text-[#3C3E87]" />
                <button className="ml-2 w-8 h-8 bg-[#BDBDFE] rounded-full flex items-center justify-center hover:bg-[#9B9BFE]">↑</button>
              </div>
            </div>
          </div>

          {/* Right Column: Updates + CTA */}
          <div className="flex flex-col justify-between gap-4 w-full md:w-[28%]">
            {/* Latest Updates */}
            <div className="bg-[#EEEEFF] p-4 rounded-2xl shadow-lg" style={{ boxShadow: '0px 4px 15px 5px #6163A8' }}>
              <h4 className="text-[#6366F1] text-lg font-medium mb-3">Latest updates</h4>
              <ul className="space-y-3">
                {updates.map((update, i) => (
                  <li key={i} className="flex items-center justify-between px-4 py-2 text-sm bg-white rounded-lg shadow-sm">
                    <span>{update.message}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-[#E0E0FF] text-[#3C3E87] rounded-full">{update.initial}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Box */}
            <div className="bg-[#EEEEFF] px-5 py-4 rounded-2xl shadow-lg flex flex-col justify-between" style={{ boxShadow: '0px 4px 15px 5px #6163A8' }}>
              <p className="text-lg text-[#757575] mb-3">
                Join your Roomies,<br />dare your friends!
              </p>
              <button className="self-end text-sm px-5 py-2 rounded-xl text-white bg-gradient-to-r from-[#5C3CFF] to-[#E44B88] shadow-md">
                New +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotifyFriends;
