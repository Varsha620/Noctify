import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChatCard from '../components/ChatCard';
import NotificationsPanel from '../components/NotificationPanel';
import NewGroupModal from '../components/NewGroupModal';
import { 
  collection, query, orderBy, onSnapshot, addDoc, 
  serverTimestamp, where, getDocs, doc, updateDoc 
} from "firebase/firestore";
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
  const [notifications, setNotifications] = useState([]);
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

  // Fetch notifications
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      setNotifications(notifs);
    });

    return () => unsubscribe();
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
        timestamp: doc.data().timestamp?.toDate()
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [activeGroupId]);

  // Fetch user's groups
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'groups'),
      where('members', 'array-contains', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const groupsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
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

  const markNotificationAsRead = async (notificationId) => {
    try {
      await updateDoc(doc(db, 'notifications', notificationId), {
        read: true
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const activeGroup = groups.find(group => group.id === activeGroupId) || { 
    name: 'Select a chat', 
    members: [], 
    avatar: '👥' 
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white md:flex-row">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full p-4 pb-20 md:pb-4">
        <Navbar />
        <h2 className="text-2xl md:text-3xl font-light text-[#5E000C] mt-6 mb-4 ml-2">
          NOTIFY YOUR FRIENDS
        </h2>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Chat Section */}
          <div className="flex flex-1 rounded-2xl bg-gradient-to-br from-[#FD8839] to-[#F32D17] shadow-lg overflow-hidden min-h-[500px] border-[#C1000F] border-[1px]">
            {/* Mobile View */}
            <div className="flex w-full md:hidden">
              {!showChatView ? (
                <div className="w-full bg-gradient-to-b from-[#F32D17] to-[#C1000F] text-white flex flex-col py-4">
                  <div className="flex items-center justify-between px-4 mb-4">
                    <h3 className="text-sm font-medium text-white">Recent Chats</h3>
                    <button 
                      onClick={() => setGroupModalOpen(true)}
                      className="px-2 py-1 text-xs rounded bg-white/20 hover:bg-white/30"
                    >
                      New Group
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 px-2 overflow-y-auto">
                    {groups.map((group) => (
                      <div
                        key={group.id}
                        className="px-2 py-1 transition-colors rounded-md cursor-pointer hover:bg-white/20"
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
                  </div>
                </div>
              ) : (
                <div className="relative flex flex-col flex-1 bg-white/10">
                  {/* Chat header with back button */}
                  <div className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-[#C1000F] to-[#5E000C] text-white">
                    <button 
                      onClick={() => setShowChatView(false)}
                      className="p-1 text-white rounded hover:bg-white/20"
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
                  </div>
                  
                  {/* Messages area */}
                  <div className="flex flex-col justify-end flex-1 p-4 space-y-2 overflow-y-auto">
                    {messages.map((msg) => (
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
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message input */}
                  <form onSubmit={handleSendMessage} className="flex items-center w-full px-3 py-2 mx-4 mt-4 mb-4 bg-white border rounded-full shadow-inner border-white/30">
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

            {/* Desktop View */}
            <div className="hidden w-full md:flex">
              {/* Groups list */}
              <div className="w-1/3 bg-gradient-to-b from-[#F32D17] to-[#C1000F] text-white flex flex-col py-4 rounded-l-lg">
                <div className="flex items-center justify-between px-4 mb-4">
                  <h3 className="text-sm font-medium text-white">Recent Chats</h3>
                  <button 
                    onClick={() => setGroupModalOpen(true)}
                    className="px-2 py-1 text-xs rounded bg-white/20 hover:bg-white/30"
                  >
                    New Group
                  </button>
                </div>
                <div className="flex flex-col gap-2 px-2 overflow-y-auto">
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
                </div>
              </div>

              {/* Chat area */}
              <div className="relative flex flex-col flex-1 p-4 bg-white/10">
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
                      {messages.map((msg) => (
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
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="flex items-center w-full max-w-sm px-4 py-2 mt-auto bg-white border rounded-full shadow-inner border-white/30">
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
                    <p className="text-center">Select a group to start chatting</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notifications Panel */}
          <div className="w-full lg:w-[28%]">
            <NotificationsPanel 
              notifications={notifications}
              onCreateGroup={() => setGroupModalOpen(true)}
              onMarkAsRead={markNotificationAsRead}
            />
          </div>
        </div>
      </div>

      {/* New Group Modal */}
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
            
            // Add notification to all group members
            members.forEach(async (memberId) => {
              if (memberId !== currentUser.uid) {
                await addDoc(collection(db, 'notifications'), {
                  type: 'group_invite',
                  groupId: docRef.id,
                  groupName,
                  userId: memberId,
                  senderId: currentUser.uid,
                  senderName: currentUser.displayName || currentUser.email,
                  read: false,
                  createdAt: serverTimestamp()
                });
              }
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