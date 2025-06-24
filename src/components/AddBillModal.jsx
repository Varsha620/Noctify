import { useState } from 'react';



function AddBillModal({ isOpen, onClose, onSubmit }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [shouldSplit, setShouldSplit] = useState(false);
  const [recipients, setRecipients] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      amount: Number(amount),
      description,
      shouldSplit,
      recipients: recipients.split(',').map(name => name.trim()),
      timestamp: new Date()
    });
    // Reset form
    setAmount('');
    setDescription('');
    setShouldSplit(false);
    setRecipients('');
    onClose(); // close modal
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <h3 className="text-xl font-semibold mb-4 text-[#3C3E87]">Add New Bill</h3>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="p-2 border rounded"
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
            <input
              type="text"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              placeholder="Enter names separated by commas"
              className="p-2 border rounded"
              required
            />
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
              className="bg-[#3C3E87] hover:bg-[#2a2b65] text-white px-4 py-2 rounded"
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
