//components/ChatCard.jsx
function ChatCard({ name, icon, lastUpdate, isActive }) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 cursor-pointer ${
        isActive ? 'bg-[#A1A3F7]' : 'bg-[#3C3E87]'
      } text-white rounded-md transition-all`}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl bg-[#f3f3f8] p-1 rounded-full">{icon}</div>
        <div className="flex flex-col">
          <span className="font-medium text-md">{name}</span>
          <span className="text-sm text-[#ddddff] -mt-1">{lastUpdate}</span>
        </div>
      </div>
    </div>
  );
}

export default ChatCard;