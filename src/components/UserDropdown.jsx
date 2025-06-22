import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="p-2 cursor-pointer transform transition-all duration-200 hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#6366F1] text-lg hover:bg-[#5a54cc] transition-colors duration-200 hover:shadow-lg">
          <svg width="30" height="30" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 19.1667C27.2342 19.1667 30.6667 15.7342 30.6667 11.5C30.6667 7.26582 27.2342 3.83333 23 3.83333C18.7659 3.83333 15.3334 7.26582 15.3334 11.5C15.3334 15.7342 18.7659 19.1667 23 19.1667Z" fill="white"/>
            <path d="M38.3333 33.5417C38.3333 38.3046 38.3333 42.1667 23 42.1667C7.66663 42.1667 7.66663 38.3046 7.66663 33.5417C7.66663 28.7787 14.5321 24.9167 23 24.9167C31.4678 24.9167 38.3333 28.7787 38.3333 33.5417Z" fill="white"/>
          </svg>
        </span>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-fadeInScale">
          <div className="py-2">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">Varsha</p>
              <p className="text-xs text-gray-500">varsha@example.com</p>
            </div>
            
            <Link 
              to="/profile" 
              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-[#EEEEFF] transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>
            
            <Link 
              to="/settings" 
              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-[#EEEEFF] transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>
            
            <div className="border-t border-gray-100 mt-2">
              <Link 
                to="/login" 
                className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;