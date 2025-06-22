import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Sidebar from '../components/Sidebar'


function Dashboard() {
  return (
    <div className="flex ">
      <Sidebar />
    <div className="flex flex-col w-full min-h-screen bg-[#ffffff] p-6">
      <Navbar />
        <h1 className="text-3xl font-light text-[#424495] mt-6 mb-4 ml-2"> DASHBOARD</h1>
     {/* Main content */}
      <div className="flex flex-col gap-6 mt-2 md:flex-row ">
        {/* Left section */}
        <div className="flex flex-col w-full gap-6 md:w-2/3">
          {/* Welcome card */}
          <div className="bg-[#EEEEFF] p-6 rounded-2xl flex justify-between items-center h-90"
            style={{
              boxShadow: '-10px 9px 10px #6366F1'
            }}>
            {/* Left side */}
            <div className="flex flex-col justify-between">
              <h1 className="text-5xl font-300 text-[#3C3E87] ml-10" >Hi, Varsha!</h1>
              <p className="text-md text-2xl text-[#6365f1b1] ml-10 mt-4">What are you doing today?</p>
              {/* Chat prompt */}
              <div className="flex items-center gap-4 mt-5 ml-9">
                <svg width="55" height="75" viewBox="-20 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30.1778 0.0603638C34.6374 2.92422 36.1239 7.22 36.1239 10.0838C36.1239 21.5393 36.1239 32.9947 33.1509 43.0182L31.6643 32.9947C27.2047 35.8585 21.2586 38.7224 18.2855 38.7224C15.3125 38.7224 9.36632 35.8585 4.90671 32.9947L3.42018 43.0182C0.447113 32.9947 0.447113 21.5393 0.447113 10.0838C0.447113 7.22 1.93365 2.92422 6.39325 0.0603638C4.90671 4.35614 4.90671 8.65192 6.39325 11.5158C12.3394 8.65192 24.2317 8.65192 30.1778 11.5158C31.6643 8.65192 31.6643 4.35614 30.1778 0.0603638ZM30.1778 22.9712C27.0468 27.1596 25.3466 28.0903 19.7721 30.1308C22.8845 32.9947 28.6448 32.055 31.6643 28.6989C32.9743 27.2401 32.2961 24.7074 30.1778 22.9712ZM6.39325 22.9712C4.27494 24.7074 3.59671 27.2401 4.90671 28.6989C7.92624 32.055 13.6866 32.9947 16.799 30.1308C11.2245 28.0903 9.52426 27.1596 6.39325 22.9712Z" fill="#424495"/>
                </svg>
                <div className='text-11xl text-[#6366F1] ml-3'>
                  Sup there! Still thinking? <br />
                  <span className='text-[#424495] text-10xl'>Let's chat!</span>
                </div>
              </div>
            </div>
            {/* Right side - Mascot image or emoji */}
            <div className="flex items-center justify-center border-4 border-purple-300 rounded-2xl bg-[#FFFEFE] p-4 mr-10">
              <h1 className="text-[9rem]">🐳</h1>
            </div>
          </div>

        </div>

                {/* Right section - Notifications */}
                <div className="w-full md:w-1/3">
                <div className="p-4 bg-white rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {/* Bell SVG */}
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.6667 24.5H16.3333C16.3333 25.7833 15.2833 26.8333 14 26.8333C12.7167 26.8333 11.6667 25.7833 11.6667 24.5ZM24.5 22.1667V23.3333H3.5V22.1667L5.83333 19.8333V12.8333C5.83333 9.21666 8.16667 6.06666 11.6667 5.01666V4.66666C11.6667 3.38333 12.7167 2.33333 14 2.33333C15.2833 2.33333 16.3333 3.38333 16.3333 4.66666V5.01666C19.8333 6.06666 22.1667 9.21666 22.1667 12.8333V19.8333L24.5 22.1667ZM19.8333 12.8333C19.8333 9.56666 17.2667 6.99999 14 6.99999C10.7333 6.99999 8.16667 9.56666 8.16667 12.8333V21H19.8333V12.8333Z" fill="#6366F1"/>
                        </svg>
                        <h3 className="font-600 text-[#424495]">Notifications</h3>
                      </div>
                      <button className="text-sm text-purple-500">See all</button>
                    </div>
                    <ul className="mt-4 space-y-4">
                      <li className="flex items-center justify-between bg-[#EEEEFF] rounded-lg px-3 py-3"
                        style={{
                          boxShadow: '-8px 5px 10px #6366F1'
                        }}>
                        <span>Warden on rounds 🚨</span>
                        {/* Menu icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="6" r="1.5"/>
                          <circle cx="12" cy="12" r="1.5"/>
                          <circle cx="12" cy="18" r="1.5"/>
                        </svg>
                      </li>
                      <li className="flex items-center justify-between bg-[#EEEEFF] rounded-lg px-3 py-3"
                        style={{
                          boxShadow: '-8px 5px 10px #6366F1'
                        }}>
                        <span>Aradhana updated food 🍎</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="6" r="1.5"/>
                          <circle cx="12" cy="12" r="1.5"/>
                          <circle cx="12" cy="18" r="1.5"/>
                        </svg>
                      </li>
                      <li className="flex items-center justify-between bg-[#EEEEFF] rounded-lg px-3 py-3"
                        style={{
                          boxShadow: '-8px 5px 10px #6366F1'
                        }}>
                        <span>Maggie soon?</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="6" r="1.5"/>
                          <circle cx="12" cy="12" r="1.5"/>
                          <circle cx="12" cy="18" r="1.5"/>
                        </svg>
                      </li>
                    </ul>
                  </div>
                </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 mt-7 h-1/3">
        <Card title="Average spent this Month" value="Rs. 5,000" 
            icon={
              <svg width="70" height="70" viewBox="10 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M45 52.5C45 49.5163 46.1853 46.6548 48.295 44.545C50.4048 42.4353 53.2663 41.25 56.25 41.25H71.25C73.2391 41.25 75.1468 42.0402 76.5533 43.4467C77.9598 44.8532 78.75 46.7609 78.75 48.75V56.25C78.75 58.2391 77.9598 60.1468 76.5533 61.5533C75.1468 62.9598 73.2391 63.75 71.25 63.75H56.25C53.2663 63.75 50.4048 62.5647 48.295 60.455C46.1853 58.3452 45 55.4837 45 52.5ZM56.25 48.75C55.2554 48.75 54.3016 49.1451 53.5984 49.8484C52.8951 50.5516 52.5 51.5054 52.5 52.5C52.5 53.4946 52.8951 54.4484 53.5984 55.1516C54.3016 55.8549 55.2554 56.25 56.25 56.25H71.25V48.75H56.25Z" fill="#FE4B4B"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M46.0988 12.3487C46.802 11.6457 47.7556 11.2508 48.75 11.2508C49.7444 11.2508 50.698 11.6457 51.4012 12.3487L61.5525 22.5H50.9475L46.0988 17.6512C45.3957 16.948 45.0008 15.9944 45.0008 15C45.0008 14.0056 45.3957 13.052 46.0988 12.3487ZM46.5525 22.5L36.4013 12.3487C35.698 11.6457 34.7444 11.2508 33.75 11.2508C32.7556 11.2508 31.802 11.6457 31.0988 12.3487L20.9475 22.5H46.5525ZM17.1975 26.25L16.9875 26.4562C15.3514 26.8518 13.8959 27.7862 12.8552 29.1092C11.8146 30.4322 11.2492 32.0668 11.25 33.75V71.25C11.25 73.2391 12.0402 75.1468 13.4467 76.5533C14.8532 77.9598 16.7609 78.75 18.75 78.75H63.75C65.7391 78.75 67.6468 77.9598 69.0533 76.5533C70.4598 75.1468 71.25 73.2391 71.25 71.25H56.25C51.2772 71.25 46.5081 69.2746 42.9917 65.7583C39.4754 62.2419 37.5 57.4728 37.5 52.5C37.5 47.5272 39.4754 42.7581 42.9917 39.2417C46.5081 35.7254 51.2772 33.75 56.25 33.75H71.25C71.2509 32.0668 70.6854 30.4322 69.6448 29.1092C68.6041 27.7862 67.1486 26.8518 65.5125 26.4562L65.3025 26.25H17.1975Z" fill="#FE4B4B"/>
              </svg>
            }
          />
          <Card title="Items Available" value="Tomato +3 more" 
          icon={
            <svg width="65" height="65" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.125 65.625V68.75H21.875V65.625C20.2174 65.625 18.6277 64.9665 17.4556 63.7944C16.2835 62.6223 15.625 61.0326 15.625 59.375V12.5C15.625 10.8424 16.2835 9.25268 17.4556 8.08058C18.6277 6.90848 20.2174 6.25 21.875 6.25H53.125C54.7826 6.25 56.3723 6.90848 57.5444 8.08058C58.7165 9.25268 59.375 10.8424 59.375 12.5V59.375C59.375 61.0326 58.7165 62.6223 57.5444 63.7944C56.3723 64.9665 54.7826 65.625 53.125 65.625V68.75H46.875V65.625H28.125ZM21.875 12.5V28.125H53.125V12.5H21.875ZM21.875 59.375H53.125V34.375H21.875V59.375ZM25 37.5H31.25V46.875H25V37.5ZM25 18.75H31.25V25H25V18.75Z" fill="#746DED"/>
            </svg>
          } />
          <Card title="Latest Expiring item" value="Paneer" 
          icon={
            <svg width="50" height="50" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M57 12H51V9C51 8.20435 50.6839 7.44129 50.1213 6.87868C49.5587 6.31607 48.7956 6 48 6C47.2043 6 46.4413 6.31607 45.8787 6.87868C45.3161 7.44129 45 8.20435 45 9V12H27V9C27 8.20435 26.6839 7.44129 26.1213 6.87868C25.5587 6.31607 24.7956 6 24 6C23.2043 6 22.4413 6.31607 21.8787 6.87868C21.3161 7.44129 21 8.20435 21 9V12H15C12.6131 12 10.3239 12.9482 8.63604 14.636C6.94821 16.3239 6 18.6131 6 21V57C6 59.3869 6.94821 61.6761 8.63604 63.364C10.3239 65.0518 12.6131 66 15 66H57C59.3869 66 61.6761 65.0518 63.364 63.364C65.0518 61.6761 66 59.3869 66 57V21C66 18.6131 65.0518 16.3239 63.364 14.636C61.6761 12.9482 59.3869 12 57 12ZM60 57C60 57.7956 59.6839 58.5587 59.1213 59.1213C58.5587 59.6839 57.7956 60 57 60H15C14.2043 60 13.4413 59.6839 12.8787 59.1213C12.3161 58.5587 12 57.7956 12 57V36H60V57ZM60 30H12V21C12 20.2043 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2043 18 15 18H21V21C21 21.7956 21.3161 22.5587 21.8787 23.1213C22.4413 23.6839 23.2043 24 24 24C24.7956 24 25.5587 23.6839 26.1213 23.1213C26.6839 22.5587 27 21.7956 27 21V18H45V21C45 21.7956 45.3161 22.5587 45.8787 23.1213C46.4413 23.6839 47.2043 24 48 24C48.7956 24 49.5587 23.6839 50.1213 23.1213C50.6839 22.5587 51 21.7956 51 21V18H57C57.7956 18 58.5587 18.3161 59.1213 18.8787C59.6839 19.4413 60 20.2043 60 21V30Z" fill="#FFCD29"/>
            </svg>
          } />
          <Card title="Notify your friends" value="" 
          icon={
            <svg width="45" height="45" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M37.5 9.375C30.0408 9.375 22.8871 12.3382 17.6126 17.6126C12.3382 22.8871 9.37503 30.0408 9.37503 37.5C9.37503 44.9906 12.2969 51.7906 17.0719 56.8313L18.6469 58.4938L14.6875 65.625H37.5C41.1935 65.625 44.8507 64.8975 48.263 63.4841C51.6753 62.0707 54.7758 59.999 57.3874 57.3874C59.9991 54.7757 62.0707 51.6753 63.4841 48.263C64.8976 44.8507 65.625 41.1934 65.625 37.5C65.625 33.8066 64.8976 30.1493 63.4841 26.737C62.0707 23.3247 59.9991 20.2243 57.3874 17.6126C54.7758 15.001 51.6753 12.9293 48.263 11.5159C44.8507 10.1025 41.1935 9.375 37.5 9.375ZM3.12503 37.5C3.12503 18.5156 18.5157 3.125 37.5 3.125C56.4844 3.125 71.875 18.5156 71.875 37.5C71.875 56.4844 56.4844 71.875 37.5 71.875H4.06253L11 59.3938C5.90067 53.2384 3.11482 45.4933 3.12503 37.5Z" fill="#4CA85D"/>
            </svg>
          } />
        </div>
      </div>
    </div>
  )
}

export default Dashboard