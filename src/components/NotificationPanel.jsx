import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, collectionGroup, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

function NotificationsPanel({ onCreateGroup }) {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateMessage, setUpdateMessage] = useState('');
  const [friendsList, setFriendsList] = useState([]);

  // Fetch friends list
  // useEffect(() => {
  //   if (!currentUser) return;

  //   const unsubscribeFriends = onSnapshot(
  //     doc(db, 'users', currentUser.uid),
  //     (doc) => {
  //       if (doc.exists()) {
  //         setFriendsList(doc.data().friends || []);
  //       }
  //     }
  //   );

  //   return () => unsubscribeFriends();
  // }, [currentUser]);

  // // Fetch notifications
  // useEffect(() => {
  //   if (!currentUser || friendsList.length === 0) return;

  //   const q = query(
  //     collectionGroup(db, 'updates'),
  //     orderBy('timestamp', 'desc'),
  //     limit(10)
  //   );

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const recentUpdates = snapshot.docs
  //       .map(doc => {
  //         const data = doc.data();
  //         return {
  //           id: doc.id,
  //           message: data.message,
  //           senderId: data.senderId,
  //           senderName: data.senderName || 'Anonymous',
  //           timestamp: data.timestamp?.toDate() || new Date(),
  //         };
  //       })
  //       .filter(update => 
  //         // Show updates from friends or from current user's groups
  //         friendsList.includes(update.senderId) || 
  //         update.senderId === currentUser.uid
  //       );

  //     setNotifications(recentUpdates);
  //     setLoading(false);
  //   }, (error) => {
  //     console.error("Error fetching notifications:", error);
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, [currentUser, friendsList]);

  // const formatTime = (date) => {
  //   return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // };

  const handlePostUpdate = async (e) => {
    e.preventDefault();
    if (!updateMessage.trim() || !currentUser) return;

    try {
      await addDoc(collection(db, 'users', currentUser.uid, 'updates'), {
        message: updateMessage,
        senderId: currentUser.uid,
        senderName: currentUser.displayName || currentUser.email.split('@')[0],
        timestamp: serverTimestamp(),
      });
      setUpdateMessage('');
    } catch (error) {
      console.error("Error posting update:", error);
    }
  };
  
  useEffect(() => {
  if (!currentUser) return;

  const q = query(
    collectionGroup(db, 'updates'),
    orderBy('timestamp', 'desc'),
    limit(10)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const recentUpdates = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        message: data.message,
        senderId: data.senderId,
        senderName: data.senderName || 'Anonymous',
        timestamp: data.timestamp?.toDate() || new Date(),
      };
    });

    // Temporarily show all updates regardless of sender
    // .filter(update => friendsList.includes(update.senderId) || update.senderId === currentUser.uid)

    setNotifications(recentUpdates);
    setLoading(false);
  }, (error) => {
    console.error("Error fetching notifications:", error);
    setLoading(false);
  });

  return () => unsubscribe();
}, [currentUser]);


  return (
    <div className="space-y-4">
      {/* Notifications Panel */}
      <div className="bg-[#EEEEFF] p-4 rounded-2xl shadow-lg min-h-[350px] relative"
           style={{ boxShadow: '0px 4px 15px 5px rgba(97, 99, 168, 0.3)' }}>
        <h4 className="text-[#6366F1] font-medium mb-3 text-lg">Recent Activity</h4>
        
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <p>Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <p className="py-8 text-center text-gray-500">No recent activity</p>
        ) : (
          <ul className="space-y-3 max-h-[250px] overflow-y-auto">
            {notifications.map((notification) => (
              <li 
                key={notification.id} 
                className="flex items-start gap-3 px-3 py-2 text-sm transition-colors bg-white rounded-lg shadow-sm hover:bg-gray-50"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E0E0FF] flex items-center justify-center text-[#3C3E87] font-bold text-xs">
                  {notification.senderName.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#3C3E87] truncate">
                    {notification.senderId === currentUser?.uid ? 'You' : notification.senderName}
                  </p>
                  <p className="text-gray-600 truncate">{notification.message}</p>
                </div>
                <div className="self-center text-xs text-gray-400">
                  {formatTime(notification.timestamp)}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Post Update Form */}
        <form onSubmit={handlePostUpdate} className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="Notify something emergency..."
            value={updateMessage}
            onChange={(e) => setUpdateMessage(e.target.value)}
            className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6163A8]"
          />
          <button 
            type="submit"
            className="px-4 py-2 text-sm text-white bg-[#6163A8] rounded-lg hover:bg-[#4a4c8a] transition-colors"
          >
            POST
          </button>
        </form>
      </div>

      {/* CTA Box */}
      <div className="flex items-center justify-between p-4 bg-[#EEEEFF] rounded-2xl shadow-lg">
        <p className="text-sm text-[#757575]">
          Join your Roomies,<br />dare your friends!
        </p>
        <button 
          onClick={onCreateGroup}
          className="text-sm px-4 py-2 rounded-xl text-white bg-gradient-to-r from-[#5C3CFF] to-[#E44B88] shadow-md hover:shadow-lg transition-all"
        >
          New Group
        </button>
      </div>
    </div>
  );
}

export default NotificationsPanel;