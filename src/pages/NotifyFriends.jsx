import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChatCard from '../components/ChatCard';
import NotificationsPanel from '../components/NotificationPanel';
import NewGroupModal from '../components/NewGroupModal';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from '../context/AuthContext';

function NotifyFriends() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [groups, setGroups] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [isGroupModalOpen, setGroupModalOpen] = useState(false);
  const [showChatView, setShowChatView] = useState(false);
  const [friends, setFriends] = useState([]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch user's friends for group creation
  useEffect(() => {
    const fetchFriends = async () => {
      if (!currentUser) return;

      try {
        const friendsQuery1 = query(
          collection(db, 'friends'),
          where('user1', '==', currentUser.uid)
        );
        
        const friendsQuery2 = query(
          collection(db, 'friends'),
          where('user2', '==', currentUser.uid)
        );

        const [snapshot1, snapshot2] = await Promise.all([
          getDocs(friendsQuery1),
          getDocs(friendsQuery2)
        ]);

        const friendsList = [];
        
        snapshot1.docs.forEach(doc => {
          const data = doc.data();
          friendsList.push({
            uid: data.user2,
            name: data.user2Name
          });
        });

        snapshot2.docs.forEach(doc => {
          const data = doc.data();
          friendsList.push({
            uid: data.user1,
            name: data.user1Name
          });
        });

        setFriends(friendsList);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [currentUser]);

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

  // Fetch user's groups (only groups where user is a member)
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'groups'),
      where('members', 'array-contains', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const groupsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGroups(groupsData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    if (!currentUser || !activeGroupId) return;

    try {
      await addDoc(collection(db, "groups", activeGroupId, "messages"), {
        text: newMessage,
        senderId: currentUser.uid,
        senderName: currentUser.displayName || currentUser.email.split('@')[0],
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleGroupSelect = (groupId) => {
    setActiveGroupId(groupId);
    setShowChatView(true);
  };

  const activeGroup = groups.find(group => group.id === activeGroupId) || { name: 'Select a chat', members: [], avatar: '👥' };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white md:flex-row">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex flex-col w-full p-4 pb-20 md:pb-4">
        <Navbar />
        <h2 className="text-2xl md:text-3xl font-light text-[#5E000C] mt-6 mb-4 ml-2">
          NOTIFY YOUR FRIENDS
        </h2>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Chat Section */}
          <div className="flex flex-1 rounded-2xl bg-gradient-to-br from-[#FD8839] to-[#F32D17] shadow-lg overflow-hidden min-h-[500px] border-[#C1000F] border-[1px]">
            
            {/* Mobile: Show either groups list or chat */}
            <div className="flex w-full md:hidden">
              {!showChatView ? (
                // Groups List (Mobile)
                <div className="w-full bg-gradient-to-b from-[#F32D17] to-[#C1000F] text-white flex flex-col py-4">
                  <div className="flex items-center justify-between px-4 mb-4">
                    <h3 className="text-sm font-medium text-white">Recent Chats</h3>
                    <button 
                      onClick={() => setGroupModalOpen(true)}
                      className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded"
                    >
                      New Group
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 px-2 overflow-y-auto">
                    {groups.map((group) => (
                      <div
                        key={group.id}
                        className="px-2 py-1 rounded-md cursor-pointer transition-colors hover:bg-white/20"
                        onClick={() => handleGroupSelect(group.id)}
                      >
                        <ChatCard
                          name={group.name}
                          icon={group.avatar || '👥'}
                          lastUpdate={`${group.members?.length || 0} members`}
                          isActive={false}
                        />
                      </div>
                    ))}
                    {groups.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-white/70">
                        <svg width="80" height="80" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M110.25 4.59375C124.031 13.7812 128.625 27.5625 128.625 36.75C128.625 73.5 128.625 110.25 119.438 142.406L114.844 110.25C101.062 119.438 82.6875 128.625 73.5 128.625C64.3125 128.625 45.9375 119.438 32.1562 110.25L27.5625 142.406C18.375 110.25 18.375 73.5 18.375 36.75C18.375 27.5625 22.9688 13.7812 36.75 4.59375C32.1562 18.375 32.1562 32.1562 36.75 41.3438C55.125 32.1562 91.875 32.1562 110.25 41.3438C114.844 32.1562 114.844 18.375 110.25 4.59375ZM110.25 78.0938C100.574 91.5305 95.3203 94.5164 78.0938 101.062C87.7119 110.25 105.513 107.235 114.844 96.4688C118.892 91.7889 116.796 83.6637 110.25 78.0938ZM36.75 78.0938C30.2039 83.6637 28.108 91.7889 32.1562 96.4688C41.4873 107.235 59.2881 110.25 68.9062 101.062C51.6797 94.5164 46.4256 91.5305 36.75 78.0938Z" fill="white" opacity="0.5"/>
                        </svg>
                        <p className="mt-4 text-center">No groups yet. Create your first group!</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Chat View (Mobile)
                <div className="flex flex-1 flex-col bg-white/10 relative">
                  <div className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-[#C1000F] to-[#5E000C] text-white">
                    <button 
                      onClick={() => setShowChatView(false)}
                      className="text-white hover:bg-white/20 p-1 rounded"
                    >
                      ←
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{activeGroup.avatar || '👥'}</span>
                      <div>
                        <h3 className="text-sm font-medium">{activeGroup.name}</h3>
                        <p className="text-xs opacity-80">{activeGroup.members?.length || 0} members</p>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  
                  <div className="flex flex-col justify-end flex-1 p-4 space-y-2 overflow-y-auto">
                    {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-white/70">
                        <svg width="80" height="80" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M110.25 4.59375C124.031 13.7812 128.625 27.5625 128.625 36.75C128.625 73.5 128.625 110.25 119.438 142.406L114.844 110.25C101.062 119.438 82.6875 128.625 73.5 128.625C64.3125 128.625 45.9375 119.438 32.1562 110.25L27.5625 142.406C18.375 110.25 18.375 73.5 18.375 36.75C18.375 27.5625 22.9688 13.7812 36.75 4.59375C32.1562 18.375 32.1562 32.1562 36.75 41.3438C55.125 32.1562 91.875 32.1562 110.25 41.3438C114.844 32.1562 114.844 18.375 110.25 4.59375ZM110.25 78.0938C100.574 91.5305 95.3203 94.5164 78.0938 101.062C87.7119 110.25 105.513 107.235 114.844 96.4688C118.892 91.7889 116.796 83.6637 110.25 78.0938ZM36.75 78.0938C30.2039 83.6637 28.108 91.7889 32.1562 96.4688C41.4873 107.235 59.2881 110.25 68.9062 101.062C51.6797 94.5164 46.4256 91.5305 36.75 78.0938Z" fill="white" opacity="0.5"/>
                        </svg>
                        <p className="mt-4 text-center">No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`self-start px-3 py-2 rounded-xl max-w-[70%] text-sm ${
                            msg.senderId === currentUser?.uid
                              ? 'bg-white/30 self-end text-right'
                              : 'bg-white/20 text-left'
                          }`}
                        >
                          <p className="mb-1 text-xs font-bold text-white/80">
                            {msg.senderId === currentUser?.uid ? 'You' : msg.senderName}
                          </p>
                          <p className='text-white'>{msg.text}</p>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <form onSubmit={handleSendMessage} className="flex items-center w-full px-3 py-2 mt-4 bg-white rounded-full shadow-inner border border-white/30 mx-4 mb-4">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 outline-none text-sm text-[#5E000C] placeholder-gray-500"
                    />
                    <button type="submit" className="ml-2 w-8 h-8 bg-[#FD8839] rounded-full flex items-center justify-center hover:bg-[#F32D17] transition-all text-white">
                      ↑
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Desktop: Show both groups list and chat */}
            <div className="hidden md:flex w-full">
              {/* Left - Recent Chats */}
              <div className="w-1/3 bg-gradient-to-b from-[#F32D17] to-[#C1000F] text-white flex flex-col py-4 rounded-l-lg">
                <div className="flex items-center justify-between px-4 mb-4">
                  <h3 className="text-sm font-medium text-white">Recent Chats</h3>
                  <button 
                    onClick={() => setGroupModalOpen(true)}
                    className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded"
                  >
                    New Group
                  </button>
                </div>
                <div className="flex flex-col gap-2 px-2 overflow-y-auto max-h-96">
                  {groups.map((group) => (
                    <div
                      key={group.id}
                      className={`px-2 py-1 rounded-md cursor-pointer transition-colors ${
                        activeGroupId === group.id ? 'bg-white/30' : 'hover:bg-white/20'
                      }`}
                      onClick={() => setActiveGroupId(group.id)}
                    >
                      <ChatCard
                        name={group.name}
                        icon={group.avatar || '👥'}
                        lastUpdate={`${group.members?.length || 0} members`}
                        isActive={activeGroupId === group.id}
                      />
                    </div>
                  ))}
                  {groups.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-white/70">
                      <svg width="60" height="60" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M110.25 4.59375C124.031 13.7812 128.625 27.5625 128.625 36.75C128.625 73.5 128.625 110.25 119.438 142.406L114.844 110.25C101.062 119.438 82.6875 128.625 73.5 128.625C64.3125 128.625 45.9375 119.438 32.1562 110.25L27.5625 142.406C18.375 110.25 18.375 73.5 18.375 36.75C18.375 27.5625 22.9688 13.7812 36.75 4.59375C32.1562 18.375 32.1562 32.1562 36.75 41.3438C55.125 32.1562 91.875 32.1562 110.25 41.3438C114.844 32.1562 114.844 18.375 110.25 4.59375ZM110.25 78.0938C100.574 91.5305 95.3203 94.5164 78.0938 101.062C87.7119 110.25 105.513 107.235 114.844 96.4688C118.892 91.7889 116.796 83.6637 110.25 78.0938ZM36.75 78.0938C30.2039 83.6637 28.108 91.7889 32.1562 96.4688C41.4873 107.235 59.2881 110.25 68.9062 101.062C51.6797 94.5164 46.4256 91.5305 36.75 78.0938Z" fill="white" opacity="0.5"/>
                      </svg>
                      <p className="mt-4 text-center text-sm">No groups yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right - Main Chat Area */}
              <div className="flex flex-1 flex-col bg-white/10 p-4 relative">
                {activeGroupId ? (
                  <>
                    <div className="w-full px-4 py-2 bg-gradient-to-r from-[#C1000F] to-[#5E000C] text-white rounded-t-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{activeGroup.avatar || '👥'}</span>
                        <div>
                          <h3 className="text-sm font-medium">{activeGroup.name}</h3>
                          <p className="text-xs opacity-80">{activeGroup.members?.length || 0} members</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-end flex-1 w-full p-4 space-y-2 overflow-y-auto">
                      {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-white/70">
                          <svg width="100" height="100" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M110.25 4.59375C124.031 13.7812 128.625 27.5625 128.625 36.75C128.625 73.5 128.625 110.25 119.438 142.406L114.844 110.25C101.062 119.438 82.6875 128.625 73.5 128.625C64.3125 128.625 45.9375 119.438 32.1562 110.25L27.5625 142.406C18.375 110.25 18.375 73.5 18.375 36.75C18.375 27.5625 22.9688 13.7812 36.75 4.59375C32.1562 18.375 32.1562 32.1562 36.75 41.3438C55.125 32.1562 91.875 32.1562 110.25 41.3438C114.844 32.1562 114.844 18.375 110.25 4.59375ZM110.25 78.0938C100.574 91.5305 95.3203 94.5164 78.0938 101.062C87.7119 110.25 105.513 107.235 114.844 96.4688C118.892 91.7889 116.796 83.6637 110.25 78.0938ZM36.75 78.0938C30.2039 83.6637 28.108 91.7889 32.1562 96.4688C41.4873 107.235 59.2881 110.25 68.9062 101.062C51.6797 94.5164 46.4256 91.5305 36.75 78.0938Z" fill="white" opacity="0.3"/>
                          </svg>
                          <p className="mt-4 text-center">No messages yet. Start the conversation!</p>
                        </div>
                      ) : (
                        messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`self-start px-3 py-2 rounded-xl max-w-[70%] text-sm ${
                              msg.senderId === currentUser?.uid
                                ? 'bg-white/30 self-end text-right'
                                : 'bg-white/20 text-left'
                            }`}
                          >
                            <p className="mb-1 text-xs font-bold text-white/80">
                              {msg.senderId === currentUser?.uid ? 'You' : msg.senderName}
                            </p>
                            <p className='text-white'>{msg.text}</p>
                          </div>
                        ))
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="flex items-center w-full max-w-sm px-4 py-2 mt-auto bg-white rounded-full shadow-inner border border-white/30">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 outline-none text-sm text-[#5E000C] placeholder-gray-500"
                      />
                      <button type="submit" className="ml-2 w-8 h-8 bg-[#FD8839] rounded-full flex items-center justify-center hover:bg-[#F32D17] transition-all text-white">
                        ↑
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white/70">
                    <svg width="120" height="120" viewBox="0 0 147 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M110.25 4.59375C124.031 13.7812 128.625 27.5625 128.625 36.75C128.625 73.5 128.625 110.25 119.438 142.406L114.844 110.25C101.062 119.438 82.6875 128.625 73.5 128.625C64.3125 128.625 45.9375 119.438 32.1562 110.25L27.5625 142.406C18.375 110.25 18.375 73.5 18.375 36.75C18.375 27.5625 22.9688 13.7812 36.75 4.59375C32.1562 18.375 32.1562 32.1562 36.75 41.3438C55.125 32.1562 91.875 32.1562 110.25 41.3438C114.844 32.1562 114.844 18.375 110.25 4.59375ZM110.25 78.0938C100.574 91.5305 95.3203 94.5164 78.0938 101.062C87.7119 110.25 105.513 107.235 114.844 96.4688C118.892 91.7889 116.796 83.6637 110.25 78.0938ZM36.75 78.0938C30.2039 83.6637 28.108 91.7889 32.1562 96.4688C41.4873 107.235 59.2881 110.25 68.9062 101.062C51.6797 94.5164 46.4256 91.5305 36.75 78.0938Z" fill="white" opacity="0.3"/>
                    </svg>
                    <p className="mt-4 text-center">Select a group to start chatting</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[28%]">
            <NotificationsPanel onCreateGroup={() => setGroupModalOpen(true)} />
          </div>
        </div>
      </div>

      <NewGroupModal
        isOpen={isGroupModalOpen}
        onClose={() => setGroupModalOpen(false)}
        friends={friends}
        onCreate={async ({ groupName, members, avatar }) => {
          try {
            const docRef = await addDoc(collection(db, 'groups'), {
              name: groupName,
              members,
              avatar: avatar || '👥',
              createdAt: serverTimestamp(),
              createdBy: currentUser.uid
            });
            setActiveGroupId(docRef.id);
            setGroupModalOpen(false);
            if (window.innerWidth < 768) {
              setShowChatView(true);
            }
          } catch (err) {
            console.error('Error creating group:', err);
          }
        }}
      />
    </div>
  );
}

export default NotifyFriends;