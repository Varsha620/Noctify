// NotificationPanel.jsx
import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  updateDoc, 
  doc, 
  arrayUnion,
  getDocs,
  limit
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

function NotificationPanel() {
  const { currentUser } = useAuth();
  const [statusUpdates, setStatusUpdates] = useState([]);
  const [friends, setFriends] = useState([]);
  const [newStatus, setNewStatus] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isPosting, setIsPosting] = useState(false);

  // Fetch friends list
  useEffect(() => {
    if (!currentUser) return;

    const fetchFriends = async () => {
      try {
        // Query both directions of friendships
        const q1 = query(
          collection(db, 'friends'),
          where('user1', '==', currentUser.uid),
          limit(100)
        );
        const q2 = query(
          collection(db, 'friends'),
          where('user2', '==', currentUser.uid),
          limit(100)
        );
        
        const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);
        
        const friendsList = [
          ...snapshot1.docs.map(doc => doc.data().user2),
          ...snapshot2.docs.map(doc => doc.data().user1)
        ];
        
        setFriends(friendsList);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [currentUser]);

  // Fetch status updates
  useEffect(() => {
    if (!currentUser) return;

    let unsubscribeCallbacks = [];

    const fetchStatusUpdates = async () => {
      try {
        // Get all friend IDs including current user
        const friendIds = [...friends, currentUser.uid];
        
        // Split into chunks of 10 (Firestore 'in' query limit)
        const chunks = [];
        for (let i = 0; i < friendIds.length; i += 10) {
          chunks.push(friendIds.slice(i, i + 10));
        }

        // Set up listeners for each chunk
        unsubscribeCallbacks = chunks.map(chunk => {
          const q = query(
            collection(db, 'status_updates'),
            where('userId', 'in', chunk),
            where('expiresAt', '>', new Date()),
            orderBy('expiresAt', 'asc'),
            limit(50)
          );

          return onSnapshot(q, 
            (snapshot) => {
              const updates = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate(),
                expiresAt: doc.data().expiresAt?.toDate()
              }));
              
              setStatusUpdates(prev => [
                ...prev.filter(u => !chunk.includes(u.userId)),
                ...updates
              ]);
            },
            (error) => {
              console.error("Status updates error:", error);
            }
          );
        });
      } catch (error) {
        console.error("Error setting up status updates listener:", error);
      }
    };

    fetchStatusUpdates();

    return () => {
      unsubscribeCallbacks.forEach(unsubscribe => unsubscribe());
    };
  }, [currentUser, friends]);

  const postStatus = async () => {
    if (!newStatus.trim() || !currentUser) return;
    setIsPosting(true);

    try {
      await addDoc(collection(db, 'status_updates'), {
        userId: currentUser.uid,
        content: newStatus,
        createdAt: serverTimestamp(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        viewers: []
      });
      setNewStatus('');
    } catch (error) {
      console.error('Error posting status:', error);
    } finally {
      setIsPosting(false);
    }
  };

  const markAsViewed = async (statusId) => {
    if (!currentUser) return;
    
    try {
      await updateDoc(doc(db, 'status_updates', statusId), {
        viewers: arrayUnion(currentUser.uid)
      });
    } catch (error) {
      console.error('Error marking as viewed:', error);
    }
  };

  const filteredUpdates = statusUpdates.filter(update => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unseen') return !update.viewers?.includes(currentUser?.uid);
    return update.userId === currentUser?.uid;
  });

  // Sort updates by creation time (newest first)
  const sortedUpdates = [...filteredUpdates].sort((a, b) => 
    (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
  );

  return (
    <div className="bg-gradient-to-br from-[#F32D17] to-[#C1000F] p-4 rounded-2xl shadow-lg h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Status Updates</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 text-xs rounded-full ${
              activeTab === 'all' ? 'bg-white text-[#F32D17]' : 'bg-white/20 text-white'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab('unseen')}
            className={`px-3 py-1 text-xs rounded-full ${
              activeTab === 'unseen' ? 'bg-white text-[#F32D17]' : 'bg-white/20 text-white'
            }`}
          >
            Unseen
          </button>
          <button 
            onClick={() => setActiveTab('mine')}
            className={`px-3 py-1 text-xs rounded-full ${
              activeTab === 'mine' ? 'bg-white text-[#F32D17]' : 'bg-white/20 text-white'
            }`}
          >
            My Status
          </button>
        </div>
      </div>

      {/* Status Creation */}
      <div className="p-3 mb-4 rounded-lg bg-white/10">
        <textarea
          placeholder="What's on your mind?"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="w-full p-2 mb-2 text-white border rounded-lg bg-white/20 border-white/30 focus:outline-none focus:ring-1 focus:ring-white"
          rows={3}
        />
        <button
          onClick={postStatus}
          disabled={isPosting || !newStatus.trim()}
          className="w-full py-2 bg-white text-[#F32D17] rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPosting ? 'Posting...' : 'Post Status'}
        </button>
      </div>

      {/* Status Updates List */}
      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {filteredUpdates.length > 0 ? (
          filteredUpdates.map(update => (
            <div 
              key={update.id} 
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                update.viewers?.includes(currentUser?.uid) 
                  ? 'bg-white/10' 
                  : 'bg-white/20 border border-white/30'
              }`}
              onClick={() => !update.viewers?.includes(currentUser?.uid) && markAsViewed(update.id)}
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-white/20">
                  {update.userId === currentUser?.uid ? 'You' : update.userId.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    {update.userId === currentUser?.uid ? 'Your status' : "Friend's status"}
                  </p>
                  <p className="mt-1 text-white">{update.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-white/70">
                      {update.createdAt?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) || 'Just now'}
                    </p>
                    <p className="text-xs text-white/70">
                      {update.viewers?.length || 0} views
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-white/70">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="mt-2 text-center">
              {activeTab === 'mine' 
                ? "You haven't posted any status updates" 
                : "No status updates to show"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationPanel;