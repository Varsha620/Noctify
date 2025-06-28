import UserDropdown from './UserDropdown';

function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 mt-[-20px]">
      {/* Search */}
      <div className="relative w-full max-w-md md:w-1/3">
        <input
          className="w-full p-2 pl-8 rounded-md border border-[#FD8839] focus:outline-none focus:ring-2 focus:ring-[#F32D17] bg-gradient-to-r from-[#FD8839]/10 to-[#F32D17]/10 transition-all duration-200 focus:shadow-lg"
          placeholder="Search"
          type="text"
        />
        <span className="absolute transition-colors duration-200 left-2 top-3">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" stroke="#FD8839" strokeWidth="2"/>
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#FD8839" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </div>

      {/* Right side icons */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Notification */}
        <div className="relative p-2 transition-all duration-200 transform cursor-pointer hover:scale-110">
          <span className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-[#FD8839] to-[#F32D17] text-lg hover:from-[#F32D17] hover:to-[#C1000F] transition-all duration-200 hover:shadow-lg">
            <svg width="25" height="25" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.75 39.375H26.25C26.25 41.4375 24.5625 43.125 22.5 43.125C20.4375 43.125 18.75 41.4375 18.75 39.375ZM39.375 35.625V37.5H5.625V35.625L9.375 31.875V20.625C9.375 14.8125 13.125 9.75 18.75 8.0625V7.5C18.75 5.4375 20.4375 3.75 22.5 3.75C24.5625 3.75 26.25 5.4375 26.25 7.5V8.0625C31.875 9.75 35.625 14.8125 35.625 20.625V31.875L39.375 35.625ZM31.875 20.625C31.875 15.375 27.75 11.25 22.5 11.25C17.25 11.25 13.125 15.375 13.125 20.625V33.75H31.875V20.625Z" fill="white"/>
            </svg>
          </span>
          <span className="absolute w-2 h-2 bg-[#C1000F] rounded-full top-1 right-1 animate-pulse"></span>
        </div>

        {/* Message */}
        <div className="relative p-2 transition-all duration-200 transform cursor-pointer hover:scale-110">
          <span className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-[#FD8839] to-[#F32D17] text-lg hover:from-[#F32D17] hover:to-[#C1000F] transition-all duration-200 hover:shadow-lg">
            <svg width="30" height="30" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.16663 21.5C7.16663 17.6986 8.67674 14.0528 11.3648 11.3648C14.0528 8.67678 17.6985 7.16667 21.5 7.16667C25.3014 7.16667 28.9471 8.67678 31.6352 11.3648C34.3232 14.0528 35.8333 17.6986 35.8333 21.5V30.6196C35.8333 32.1389 35.8333 32.895 35.6075 33.5024C35.428 33.9837 35.1471 34.4207 34.7839 34.784C34.4207 35.1472 33.9836 35.4281 33.5023 35.6076C32.895 35.8333 32.1371 35.8333 30.6195 35.8333H21.5C17.6985 35.8333 14.0528 34.3232 11.3648 31.6352C8.67674 28.9472 7.16663 25.3014 7.16663 21.5Z" stroke="white" strokeWidth="2"/>
              <path d="M16.125 19.7083H26.875M21.5 26.875H26.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>

        {/* User Profile with Dropdown */}
        <UserDropdown />
      </div>
    </div>
  )
}

export default Navbar