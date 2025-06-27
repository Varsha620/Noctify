import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

function NewGroupModal({ isOpen, onClose, onCreate }) {
  const [groupName, setGroupName] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, 'users'));
      const usersList = snapshot.docs
        .map(doc => ({ uid: doc.id, ...doc.data() }))
        .filter(user => user.uid !== currentUser.uid); // exclude self
      setAllUsers(usersList);
    };
    if (isOpen) fetchUsers();
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

    onCreate({
      groupName,
      members: [currentUser.uid, ...selectedUserIds]
    });
    setGroupName('');
    setSelectedUserIds([]);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-[#3C3E87]">Create New Group</h2>

        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <div className="mb-4">
          <h3 className="text-sm font-medium text-[#3C3E87] mb-2">Add Members</h3>
          <select
            onChange={handleAddMember}
            className="w-full p-2 mb-2 border rounded"
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
                    <li key={uid} className="flex items-center justify-between p-1 pl-2 rounded bg-gray-50">
                      <span>{user?.displayName || user?.email}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(uid)}
                        className="text-red-500 hover:text-red-700"
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
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateGroup}
            className="px-4 py-2 bg-[#3C3E87] text-white rounded hover:bg-[#2a2b65]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewGroupModal;