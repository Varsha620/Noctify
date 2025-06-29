import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

function NewGroupModal({ isOpen, onClose, onCreate }) {
  const [groupName, setGroupName] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState('👥');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  const avatarOptions = ['👥', '🎉', '🚀', '💼', '🎓', '🏠', '🎮', '🍕', '📚', '💪', '🎵', '🌟', '🔥', '⚡', '🎯', '🏆'];

  useEffect(() => {
    const fetchUsers = async () => {
      if (!currentUser) return;
      
      const snapshot = await getDocs(collection(db, 'users'));
      const usersList = snapshot.docs
        .map(doc => ({ uid: doc.id, ...doc.data() }))
        .filter(user => user.uid !== currentUser.uid); // exclude self
      setAllUsers(usersList);
    };
    if (isOpen && currentUser) fetchUsers();
  }, [isOpen, currentUser]);

  const handleAddMember = (e) => {
    const uid = e.target.value;
    if (uid && !selectedUserIds.includes(uid)) {
      setSelectedUserIds(prev => [...prev, uid]);
      e.target.value = ''; // Reset the dropdown
    }
  };

  const handleRemoveMember = (uid) => {
    setSelectedUserIds(prev => prev.filter(id => id !== uid));
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      setError('Group name is required');
      return;
    }

    if (selectedUserIds.length === 0) {
      setError('Please add at least one member');
      return;
    }

    if (!currentUser) {
      setError('User not authenticated');
      return;
    }

    onCreate({
      groupName,
      members: [currentUser.uid, ...selectedUserIds],
      avatar: selectedAvatar
    });
    setGroupName('');
    setSelectedUserIds([]);
    setSelectedAvatar('👥');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-[#5E000C]">Create New Group</h2>

        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full p-2 mb-4 border border-[#FD8839] rounded-lg focus:ring-2 focus:ring-[#F32D17] focus:border-transparent"
        />

        {/* Avatar Selection */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-[#5E000C] mb-2">Choose Group Avatar</h3>
          <div className="grid grid-cols-8 gap-2">
            {avatarOptions.map((avatar, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedAvatar(avatar)}
                className={`w-8 h-8 rounded-full text-lg hover:bg-gradient-to-r hover:from-[#FD8839]/20 hover:to-[#F32D17]/20 transition-all duration-200 ${
                  selectedAvatar === avatar ? 'bg-gradient-to-r from-[#FD8839] to-[#F32D17] text-white' : 'bg-gray-100'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-[#5E000C] mb-2">Add Members</h3>
          <select
            onChange={handleAddMember}
            className="w-full p-2 mb-2 border border-[#FD8839] rounded-lg focus:ring-2 focus:ring-[#F32D17] focus:border-transparent"
            defaultValue=""
          >
            <option value="" disabled>Select a user to add</option>
            {allUsers
              .filter(user => !selectedUserIds.includes(user.uid))
              .map(user => (
                <option key={user.uid} value={user.uid}>
                  {user.displayName || user.email}
                </option>
              ))}
          </select>

          {selectedUserIds.length > 0 && (
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600">Selected members:</p>
              <ul className="overflow-y-auto max-h-32">
                {selectedUserIds.map(uid => {
                  const user = allUsers.find(u => u.uid === uid);
                  return (
                    <li key={uid} className="flex items-center justify-between p-1 pl-2 rounded bg-gradient-to-r from-[#FD8839]/10 to-[#F32D17]/10">
                      <span>{user?.displayName || user?.email}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(uid)}
                        className="text-[#F32D17] hover:text-[#C1000F]"
                      >
                        ×
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateGroup}
            className="px-4 py-2 bg-gradient-to-r from-[#FD8839] to-[#F32D17] text-white rounded-lg hover:from-[#F32D17] hover:to-[#C1000F]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewGroupModal;