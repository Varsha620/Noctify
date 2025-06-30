import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

function NewGroupModal({ isOpen, onClose, onCreate, friends = [] }) {
  const [groupName, setGroupName] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState('👥');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  const avatarOptions = ['👥', '🎉', '🚀', '💼', '🎓', '🏠', '🎮', '🍕', '📚', '💪', '🎵', '🌟', '🔥', '⚡', '🎯', '🏆'];

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
          <h3 className="text-sm font-medium text-[#5E000C] mb-2">Add Friends</h3>
          {friends.length === 0 ? (
            <p className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">
              You need to add friends first to create a group. Use the search bar to find and add friends!
            </p>
          ) : (
            <>
              <select
                onChange={handleAddMember}
                className="w-full p-2 mb-2 border border-[#FD8839] rounded-lg focus:ring-2 focus:ring-[#F32D17] focus:border-transparent"
                defaultValue=""
              >
                <option value="" disabled>Select a friend to add</option>
                {friends
                  .filter(friend => !selectedUserIds.includes(friend.uid))
                  .map(friend => (
                    <option key={friend.uid} value={friend.uid}>
                      {friend.name}
                    </option>
                  ))}
              </select>

              {selectedUserIds.length > 0 && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">Selected friends:</p>
                  <ul className="overflow-y-auto max-h-32">
                    {selectedUserIds.map(uid => {
                      const friend = friends.find(f => f.uid === uid);
                      return (
                        <li key={uid} className="flex items-center justify-between p-1 pl-2 rounded bg-gradient-to-r from-[#FD8839]/10 to-[#F32D17]/10">
                          <span>{friend?.name}</span>
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
            </>
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
            disabled={friends.length === 0}
            className="px-4 py-2 bg-gradient-to-r from-[#FD8839] to-[#F32D17] text-white rounded-lg hover:from-[#F32D17] hover:to-[#C1000F] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewGroupModal;