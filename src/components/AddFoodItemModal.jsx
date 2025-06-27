import { useState } from 'react';

function AddFoodItemModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = () => {
    if (!name || !expiryDate) return alert('All fields required!');

    const addedOn = new Date();
    const expiry = new Date(expiryDate);

    onSubmit({ name, addedOn, expiryDate: expiry });
    setName('');
    setExpiryDate('');
    onClose();
    alert('✅ Item added successfully');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="p-6 bg-white shadow-lg rounded-xl w-80">
        <h2 className="text-lg font-semibold text-[#3C3E87] mb-4">Add New Item</h2>
        
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-[#EEEEFF] text-[#3C3E87] rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#3C3E87] text-white rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default AddFoodItemModal;
