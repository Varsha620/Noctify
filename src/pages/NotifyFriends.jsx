import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChatCard from '../components/ChatCard';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from '../context/AuthContext';
import NewGroupModal from '../components/NewGroupModal';

function NotifyFriends() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [groups, setGroups] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeGroupId, setActiveGroupId] = useState('room-t60');
  const [isGroupModalOpen, setGroupModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const updates = [
    { message: 'Warden on rounds 🐭', initial: 'VS' },
    { message: 'Maggie on floor 2..Rush🍜', initial: 'AR' },
    { message: 'Guys I reached home😘', initial: 'RO' },
    { message: 'Let me know when u r free...lets study', initial: 'AL' },
    { message: 'Guys I reached home😘', initial: 'NS' },
  ];

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch messages for active group
  useEffect(() => {
    if (!activeGroupId) return;

    const q = query(
      collection(db, "groups", activeGroupId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });

    return () => unsubscribe();
  }, [activeGroupId]);

  // Fetch all groups
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'groups'), (snapshot) => {
      const groupsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGroups(groupsData);
    });
    return () => unsub();
  }, []);
  

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    if (!currentUser || !activeGroupId) return;

    try {
      await addDoc(collection(db, "groups", activeGroupId, "messages"), {
        text: newMessage,
        senderId: currentUser.uid,
        senderName: currentUser.name || currentUser.email || 'Anonymous',
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  


  const activeGroup = groups.find(group => group.id === activeGroupId) || { name: 'Loading...', members: [] };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white md:flex-row">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full p-4 pb-20 md:pb-4">
        <Navbar />
        <h2 className="text-2xl md:text-3xl font-light text-[#424495] mt-6 mb-4 ml-2 animate-fadeInUp">
          NOTIFY YOUR FRIENDS
        </h2>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Chat Section */}
          <div className="flex flex-1 rounded-2xl bg-[#EEEEFF] shadow-lg overflow-hidden min-h-[500px] border-[#6163A8] border-[1px] animate-fadeInUp" style={{ boxShadow: '0px 4px 15px 5px #6163A8' }}>
            {/* Left - Recent Chats */}
            <div className="w-1/3 bg-[#424395df] text-white flex flex-col py-4 rounded-l-lg">
              <h3 className="flex items-center gap-2 pl-2 mb-4 text-xs font-medium text-white md:pl-4 md:text-sm">
                <svg width="20" height="20" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[27px] md:h-[27px]">
                  <path d="M13.5 3.375C10.8147 3.375 8.23936 4.44174 6.34055 6.34054C4.44175 8.23935 3.37501 10.8147 3.37501 13.5C3.37501 16.1966 4.42688 18.6446 6.14588 20.4593L6.71289 21.0578L5.28751 23.625H13.5C14.8296 23.625 16.1463 23.3631 17.3747 22.8543C18.6031 22.3455 19.7193 21.5996 20.6595 20.6595C21.5997 19.7193 22.3455 18.6031 22.8543 17.3747C23.3631 16.1462 23.625 14.8296 23.625 13.5C23.625 12.1704 23.3631 10.8538 22.8543 9.62533C22.3455 8.39691 21.5997 7.28074 20.6595 6.34054C19.7193 5.40035 18.6031 4.65455 17.3747 4.14572C16.1463 3.63689 14.8296 3.375 13.5 3.375ZM1.12501 13.5C1.12501 6.66563 6.66563 1.125 13.5 1.125C20.3344 1.125 25.875 6.66563 25.875 13.5C25.875 20.3344 20.3344 25.875 13.5 25.875H1.46251L3.96001 21.3818C2.12424 19.1658 1.12134 16.3776 1.12501 13.5Z" fill="white" />
                </svg>
                Recent Chats
              </h3>
              <div className="flex flex-col gap-2 px-1 overflow-y-auto md:px-2 max-h-96">
                {groups.map((group, index) => (
                  <div
                    key={group.id}
                    className={`animate-slideInLeft px-2 py-1 rounded-md cursor-pointer transition-colors ${activeGroupId === group.id ? 'bg-[#6163A8]' : 'hover:bg-[#6163A8]/70'}`}
                    style={{ animationDelay: `${0.1 * index}s` }}
                    onClick={() => setActiveGroupId(group.id)}
                  >
                    <ChatCard
                      name={group.name}
                      icon={group.members.length > 1 ? '👥' : '👤'}
                      lastUpdate={`${group.members.length} members`}
                      isActive={activeGroupId === group.id}
                    />
                  </div>
                ))}
              </div>
            </div>


            {/* Middle - Chat UI */}
            <div className="flex flex-1 flex-col justify-end items-center bg-[#EEEEFF] p-2 md:p-4 relative">
              <div className="w-full px-4 py-2 bg-[#424395] text-white rounded-t-lg">
                <h3 className="text-sm font-medium">{activeGroup.name}</h3>
                <p className="text-xs opacity-80">{activeGroup.members.length} members</p>
              </div>

              <div className="flex flex-col justify-end flex-1 w-full p-4 space-y-2 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`self-start px-3 py-2 rounded-xl max-w-[70%] text-sm ${msg.senderId === currentUser?.uid
                        ? 'bg-[#168594] self-end text-right'
                        : 'bg-[#5353ff] text-left'
                      }`}
                  >
                    <p className="mb-1 text-xs font-bold text-[#bcbcff]">
                      {msg.senderId === currentUser?.uid ? 'You' : msg.senderName}
                    </p>
                    <p className='text-[#fbfbfb]'>{msg.text}</p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="flex items-center w-full max-w-sm px-3 md:px-4 py-2 mt-4 bg-white rounded-full shadow-inner border border-[#6366F1]">
                <input
                  type="text" 
                  placeholder="Notify something exciting✨..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)} 
                  className="flex-1 outline-none text-sm text-[#3C3E87] placeholder-[#787bd6b0]" 
                />
                <button type="submit" className="ml-2 w-8 h-8 bg-[#BDBDFE] rounded-full flex items-center justify-center hover:bg-[#9B9BFE] transition-all duration-200 transform hover:scale-110 active:scale-95">
                  ↑
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Updates + CTA */}
          <div className="flex flex-col justify-between gap-4 w-full lg:w-[28%]">
            {/* Latest Updates */}
            <div className="bg-[#EEEEFF] p-4 rounded-2xl shadow-lg animate-fadeInUp" style={{ boxShadow: '0px 4px 15px 5px #6163A8', animationDelay: '0.2s' }}>
              <h4 className="text-[#6366F1] text-base md:text-lg font-medium mb-3">Latest updates</h4>
              <ul className="space-y-3 overflow-y-auto max-h-64">
                {updates.map((update, i) => (
                  <li key={i} className="flex items-center justify-between px-3 py-2 text-xs transition-all duration-200 transform bg-white rounded-lg shadow-sm md:px-4 md:text-sm animate-slideInRight hover:scale-105" style={{ animationDelay: `${0.1 * i}s` }}>
                    <span className="flex-1 mr-2">{update.message}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-[#E0E0FF] text-[#3C3E87] rounded-full flex-shrink-0">{update.initial}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Box */}
            <div className="bg-[#EEEEFF] px-4 md:px-5 py-4 rounded-2xl shadow-lg flex flex-col justify-between animate-fadeInUp" style={{ boxShadow: '0px 4px 15px 5px #6163A8', animationDelay: '0.3s' }}>
              <p className="text-base md:text-lg text-[#757575] mb-3">
                Create a new group chat with your friends!
              </p>
              <button 
                onClick={() => setGroupModalOpen(true)} 
                className="self-end text-sm px-4 md:px-5 py-2 rounded-xl text-white bg-gradient-to-r from-[#5C3CFF] to-[#E44B88] shadow-md transform transition-all duration-200 hover:scale-105 active:scale-95"
              >
                New Group +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Group Modal */}
      <NewGroupModal
        isOpen={isGroupModalOpen}
        onClose={() => setGroupModalOpen(false)}
        onCreate={async ({ groupName, members }) => {
          try {
            const docRef = await addDoc(collection(db, 'groups'), {
              name: groupName,
              members,
              createdAt: serverTimestamp(),
              createdBy: currentUser.uid
            });
            setActiveGroupId(docRef.id);
            setGroupModalOpen(false);
          } catch (err) {
            console.error('Error creating group:', err);
          }
        }}
      />
    </div>
  );
}

export default NotifyFriends;