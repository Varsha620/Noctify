import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function AddBillModal({ isOpen, onClose, onSubmit }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [shouldSplit, setShouldSplit] = useState(false);
  const [recipients, setRecipients] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [splitTo, setSplitTo] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, 'users'));
      const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllUsers(userList);
    };
    fetchUsers();
  }, []);

  const handleSplitChange = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const selectedValues = options.map(option => option.value);
    setSplitTo(selectedValues);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      amount: Number(amount),
      description,
      shouldSplit,
      recipients: shouldSplit ? splitTo : recipients.split(',').map(name => name.trim()),
      timestamp: new Date()
    });
    // Reset form
    setAmount('');
    setDescription('');
    setShouldSplit(false);
    setRecipients('');
    setSplitTo([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <h3 className="text-xl font-semibold mb-4 text-[#5E000C]">Add New Bill</h3>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="p-2 border border-[#FD8839] rounded-lg focus:ring-2 focus:ring-[#F32D17] focus:border-transparent"
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="p-2 border border-[#FD8839] rounded-lg focus:ring-2 focus:ring-[#F32D17] focus:border-transparent"
            required
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={shouldSplit}
              onChange={(e) => setShouldSplit(e.target.checked)}
            />
            Split with friends?
          </label>
          {shouldSplit && (
            <div className="flex flex-col gap-2">
              <label className="text-sm">Select friends to split with:</label>
              <select 
                multiple 
                value={splitTo} 
                onChange={handleSplitChange}
                className="h-32 p-2 border border-[#FD8839] rounded-lg focus:ring-2 focus:ring-[#F32D17] focus:border-transparent"
              >
                {allUsers.map(user => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
            </div>
          )}
  
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#FD8839] to-[#F32D17] hover:from-[#F32D17] hover:to-[#C1000F] text-white px-4 py-2 rounded"
            >
              Save Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBillModal;