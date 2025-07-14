import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

function AddBillModal({ isOpen, onClose, onSubmit }) {
  const { currentUser } = useAuth();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [shouldSplit, setShouldSplit] = useState(false);
  const [friends, setFriends] = useState([]);
  const [splitTo, setSplitTo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!currentUser) return;
      
      try {
        // Get friends from both directions
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

    if (isOpen) {
      fetchFriends();
    }
  }, [currentUser, isOpen]);

  const handleSplitChange = (friendUid, friendName) => {
    setSplitTo(prev => {
      const exists = prev.find(f => f.uid === friendUid);
      if (exists) {
        return prev.filter(f => f.uid !== friendUid);
      } else {
        return [...prev, { uid: friendUid, name: friendName }];
      }
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit({
        amount: Number(amount),
        description,
        shouldSplit,
        splitTo: shouldSplit ? splitTo : [],
        timestamp: new Date()
      });
      
      // Reset form
      setAmount('');
      setDescription('');
      setShouldSplit(false);
      setSplitTo([]);
      onClose();
    } catch (error) {
      console.error('Error submitting bill:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 mx-4 bg-white shadow-2xl rounded-2xl animate-fadeInScale">
        <h3 className="text-2xl font-bold mb-6 text-[#5E000C] text-center">Add New Bill</h3>
        
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-3 border border-[#FD8839] rounded-xl focus:ring-2 focus:ring-[#F32D17] focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this bill for?"
              className="w-full p-3 border border-[#FD8839] rounded-xl focus:ring-2 focus:ring-[#F32D17] focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <input
              type="checkbox"
              id="shouldSplit"
              checked={shouldSplit}
              onChange={(e) => setShouldSplit(e.target.checked)}
              className="w-4 h-4 text-[#F32D17] border-gray-300 rounded focus:ring-[#F32D17]"
            />
            <label htmlFor="shouldSplit" className="text-sm font-medium text-gray-700">
              Split with friends
            </label>
          </div>
          
          {shouldSplit && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Select friends to split with:</label>
              {friends.length === 0 ? (
                <div className="p-4 text-center bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">No friends found. Add friends first!</p>
                </div>
              ) : (
                <div className="p-3 space-y-2 overflow-y-auto border border-gray-200 max-h-40 rounded-xl">
                  {friends.map(friend => (
                    <label key={friend.uid} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={splitTo.some(f => f.uid === friend.uid)}
                        onChange={() => handleSplitChange(friend.uid, friend.name)}
                        className="w-4 h-4 text-[#F32D17] border-gray-300 rounded focus:ring-[#F32D17]"
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#FD8839] to-[#F32D17] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {friend.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium">{friend.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              
              {splitTo.length > 0 && (
                <div className="p-3 bg-blue-50 rounded-xl">
                  <p className="mb-2 text-sm font-medium text-blue-700">Selected friends ({splitTo.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {splitTo.map(friend => (
                      <span key={friend.uid} className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                        {friend.name}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-blue-600">
                    Each person pays: ₹{(Number(amount) / (splitTo.length + 1)).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 font-medium text-gray-700 transition-colors bg-gray-200 rounded-xl hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#FD8839] to-[#F32D17] text-white rounded-xl hover:from-[#F32D17] hover:to-[#C1000F] transition-all font-medium disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Bill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBillModal;