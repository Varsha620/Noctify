function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 mt-[-20px]">
      {/* Search */}
      <div className="relative w-1/3">
        <input
          className="w-full p-2 pl-8 rounded-md border border-[#6366F1] focus:outline-none focus:ring-1 focus:ring-purple-500 bg-[#EEEEFF]"
          placeholder="Search"
          type="text"
        />
        <span className="absolute left-2 top-3">
          {/* Search Icon */}
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" stroke="#888" strokeWidth="2"/>
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </div>

      {/* Right side icons */}
      <div className="flex items-center space-x-4">
        {/* Notification */}
        <div className="p-2 relative cursor-pointer">
          <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#B5B6ED] text-lg">
            {/* Bell Icon */}
            <svg width="25" height="25" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.75 39.375H26.25C26.25 41.4375 24.5625 43.125 22.5 43.125C20.4375 43.125 18.75 41.4375 18.75 39.375ZM39.375 35.625V37.5H5.625V35.625L9.375 31.875V20.625C9.375 14.8125 13.125 9.75 18.75 8.0625V7.5C18.75 5.4375 20.4375 3.75 22.5 3.75C24.5625 3.75 26.25 5.4375 26.25 7.5V8.0625C31.875 9.75 35.625 14.8125 35.625 20.625V31.875L39.375 35.625ZM31.875 20.625C31.875 15.375 27.75 11.25 22.5 11.25C17.25 11.25 13.125 15.375 13.125 20.625V33.75H31.875V20.625Z" fill="white"/>
            </svg>
          </span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Message */}
        <div className="p-2 relative cursor-pointer">
          <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#B5B6ED] text-lg">
            {/* Message Icon */}
            <svg width="30" height="30" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.16663 21.5C7.16663 17.6986 8.67674 14.0528 11.3648 11.3648C14.0528 8.67678 17.6985 7.16667 21.5 7.16667C25.3014 7.16667 28.9471 8.67678 31.6352 11.3648C34.3232 14.0528 35.8333 17.6986 35.8333 21.5V30.6196C35.8333 32.1389 35.8333 32.895 35.6075 33.5024C35.428 33.9837 35.1471 34.4207 34.7839 34.784C34.4207 35.1472 33.9836 35.4281 33.5023 35.6076C32.895 35.8333 32.1371 35.8333 30.6195 35.8333H21.5C17.6985 35.8333 14.0528 34.3232 11.3648 31.6352C8.67674 28.9472 7.16663 25.3014 7.16663 21.5Z" stroke="white" stroke-width="2"/>
              <path d="M16.125 19.7083H26.875M21.5 26.875H26.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>

        {/* User Profile */}
        <div className="p-2 cursor-pointer">
          <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#6366F1] text-lg">
            {/* User Icon */}
            <svg width="30" height="30" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 19.1667C27.2342 19.1667 30.6667 15.7342 30.6667 11.5C30.6667 7.26582 27.2342 3.83333 23 3.83333C18.7659 3.83333 15.3334 7.26582 15.3334 11.5C15.3334 15.7342 18.7659 19.1667 23 19.1667Z" fill="white"/>
              <path d="M38.3333 33.5417C38.3333 38.3046 38.3333 42.1667 23 42.1667C7.66663 42.1667 7.66663 38.3046 7.66663 33.5417C7.66663 28.7787 14.5321 24.9167 23 24.9167C31.4678 24.9167 38.3333 28.7787 38.3333 33.5417Z" fill="white"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar