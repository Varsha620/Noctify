import { useState } from 'react';
import { Link } from 'react-router-dom';

function MobileNavbar() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', path: '/', icon: '🏠', label: 'Home' },
    { id: 'food', path: '/food-tracker', icon: '🍽️', label: 'Food' },
    { id: 'expense', path: '/expense-tracker', icon: '💰', label: 'Money' },
    { id: 'notify', path: '/notify-friends', icon: '👥', label: 'Friends' },
    { id: 'bot', path: '/bat-bot', icon: '🦇', label: 'Bot' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-[#6366F1] text-white transform scale-110' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MobileNavbar;