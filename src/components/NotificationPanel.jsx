import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, collectionGroup, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

function NotificationsPanel({ onCreateGroup }) {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateMessage, setUpdateMessage] = useState('');
  const [friends, setFriends] = useState([]);

  // Fetch user's friends
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

  const handlePostUpdate = async (e) => {
    e.preventDefault();
    if (!updateMessage.trim() || !currentUser) return;

    try {
      // Post to all friends' updates collections
      const promises = friends.map(friend => 
        addDoc(collection(db, 'users', friend.uid, 'updates'), {
          message: updateMessage,
          senderId: currentUser.uid,
          senderName: currentUser.displayName || currentUser.email.split('@')[0],
          timestamp: serverTimestamp(),
        })
      );

      // Also post to current user's updates
      promises.push(
        addDoc(collection(db, 'users', currentUser.uid, 'updates'), {
          message: updateMessage,
          senderId: currentUser.uid,
          senderName: currentUser.displayName || currentUser.email.split('@')[0],
          timestamp: serverTimestamp(),
        })
      );

      await Promise.all(promises);
      setUpdateMessage('');
    } catch (error) {
      console.error("Error posting update:", error);
    }
  };
  
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'users', currentUser.uid, 'updates'),
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

      setNotifications(recentUpdates);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      {/* Notifications Panel */}
      <div className="bg-gradient-to-br from-[#FD8839] to-[#F32D17] p-4 rounded-2xl shadow-lg min-h-[350px] relative text-white"
           style={{ boxShadow: '0px 4px 15px 5px rgba(193, 0, 15, 0.3)' }}>
        <h4 className="text-white font-medium mb-3 text-lg">Recent Activity</h4>
        
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-white/80">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <p className="py-8 text-center text-white/70">No recent activity</p>
        ) : (
          <ul className="space-y-3 max-h-[250px] overflow-y-auto">
            {notifications.map((notification) => (
              <li 
                key={notification.id} 
                className="flex items-start gap-3 px-3 py-2 text-sm transition-colors bg-white/20 rounded-lg shadow-sm hover:bg-white/30"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white font-bold text-xs">
                  {notification.senderName.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">
                    {notification.senderId === currentUser?.uid ? 'You' : notification.senderName}
                  </p>
                  <p className="text-white/80 truncate">{notification.message}</p>
                </div>
                <div className="self-center text-xs text-white/60">
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
            placeholder="Notify all friends..."
            value={updateMessage}
            onChange={(e) => setUpdateMessage(e.target.value)}
            className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/20 text-white placeholder-white/70"
          />
          <button 
            type="submit"
            className="px-4 py-2 text-sm text-white bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            POST
          </button>
        </form>
      </div>

      {/* CTA Box */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-br from-[#F32D17] to-[#C1000F] rounded-2xl shadow-lg text-white">
        <p className="text-sm">
          Join your Roomies,<br />dare your friends!
        </p>
        <button 
          onClick={onCreateGroup}
          className="text-sm px-4 py-2 rounded-xl text-white bg-white/20 shadow-md hover:bg-white/30 transition-all"
        >
          New Group
        </button>
      </div>
    </div>
  );
}

export default NotificationsPanel;