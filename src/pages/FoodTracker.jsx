import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MobileNavbar from '../components/MobileNavbar'
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import AddFoodItemModal from '../components/AddFoodItemModal';
import { addDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

const DISH_RECIPES = [
  {
    name: 'Fruit Salad 🥗',
    ingredients: ['Apple', 'Banana', 'Fresh Cream']
  },
  {
    name: 'Smoothie 🥤',
    ingredients: ['Banana', 'Fresh Cream']
  },
  {
    name: 'Apple Cream Dessert 🍎🍨',
    ingredients: ['Apple', 'Banana']
  }
];

function FoodTracker() {
  const [items, setItems] = useState([]);
  const { currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [suggestedDishes, setSuggestedDishes] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      if (!currentUser) return;

      try {
        const foodRef = collection(db, 'users', currentUser.uid, 'foodItems');
        const q = query(foodRef, orderBy('expiryDate', 'asc'));
        const snapshot = await getDocs(q);
        const foodList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(foodList);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchItems();
  }, [currentUser]);

  useEffect(() => {
    const ingredientNames = items.map(item => item.name.toLowerCase());
    const suggestions = DISH_RECIPES.filter(dish =>
      dish.ingredients.every(ingredient =>
        ingredientNames.includes(ingredient.toLowerCase())
      )
    );
    setSuggestedDishes(suggestions);
  }, [items]);

  // Get expiring soon items (top 3 closest to expiry)
  const expiringSoonItems = items
    .filter(item => item.expiryDate)
    .sort((a, b) => a.expiryDate.seconds - b.expiryDate.seconds)
    .slice(0, 3);
    
  const handleAddItem = async (item) => {
    if (!currentUser) return;

    try {
      const foodRef = collection(db, 'users', currentUser.uid, 'foodItems');
      await addDoc(foodRef, {
        name: item.name,
        expiryDate: item.expiryDate,
        addedOn: serverTimestamp()
      });
      setShowModal(false);
      
      // Refresh the items list
      const q = query(foodRef, orderBy('expiryDate', 'asc'));
      const snapshot = await getDocs(q);
      const foodList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(foodList);
    } catch (error) {
      console.error('Error adding food item:', error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#ffffff] flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full p-4 pb-20 md:pb-4">
        <Navbar />
        
        <h1 className="text-2xl md:text-3xl font-light text-[#424495] mt-6 mb-4 ml-2 animate-fadeInUp">FOOD TRACKER</h1>

        <div className="flex flex-col justify-between mt-4 gap-7 lg:flex-row">
          {/* Storage Table */}
          <div className="flex-1 min-h-[500px] bg-[#EEEEFF] p-4 md:p-6 rounded-2xl shadow-lg w-full lg:w-2/3 h-full flex flex-col animate-fadeInUp"
            style={{ boxShadow: '-9px 10px 30px #524CC7' }}>
            <div className="flex items-center gap-3 mb-4">
              <svg width="60" height="60" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[80px] md:h-[80px]">
                <path d="M28.125 65.625V68.75H21.875V65.625C20.2174 65.625 18.6277 64.9665 17.4556 63.7944C16.2835 62.6223 15.625 61.0326 15.625 59.375V12.5C15.625 10.8424 16.2835 9.25268 17.4556 8.08058C18.6277 6.90848 20.2174 6.25 21.875 6.25H53.125C54.7826 6.25 56.3723 6.90848 57.5444 8.08058C58.7165 9.25268 59.375 10.8424 59.375 12.5V59.375C59.375 61.0326 58.7165 62.6223 57.5444 63.7944C56.3723 64.9665 54.7826 65.625 53.125 65.625V68.75H46.875V65.625H28.125ZM21.875 12.5V28.125H53.125V12.5H21.875ZM21.875 59.375H53.125V34.375H21.875V59.375ZM25 37.5H31.25V46.875H25V37.5ZM25 18.75H31.25V25H25V18.75Z" fill="#4A5FE1" />
              </svg>
              <h2 className="text-2xl md:text-3xl font-bold text-[#4D6CDA]">Your Storage</h2>
            </div>
            
            {/* Mobile-friendly table */}
            <div className="overflow-x-auto">
              <table className="w-full text-center min-w-[500px]">
                <thead>
                  <tr className="text-[#424495] text-lg md:text-2xl font-normal">
                    <th className="py-2">Items</th>
                    <th className="py-2">|</th>
                    <th className="py-2">Added On</th>
                    <th className="py-2">|</th>
                    <th className="py-2">Expiring On</th>
                    <th className="py-2">|</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[#423535]">
                  {items.map(item => {
                    const added = item.addedOn?.seconds ? new Date(item.addedOn.seconds * 1000).toLocaleDateString() : 'N/A';
                    const expires = item.expiryDate?.seconds ? new Date(item.expiryDate.seconds * 1000) : null;
                    const today = new Date();
                    const diff = expires ? Math.ceil((expires - today) / (1000 * 60 * 60 * 24)) : 0;

                    let label = '';
                    let color = '';
                    if (diff <= 2) { label = '2 days'; color = 'bg-red-500'; }
                    else if (diff <= 7) { label = '1 week'; color = 'bg-yellow-400'; }
                    else { label = '1 month'; color = 'bg-green-500'; }

                    return (
                      <tr key={item.id} className="h-12">
                        <td>{item.name}</td>
                        <td>|</td>
                        <td>{added}</td>
                        <td>|</td>
                        <td>{expires ? expires.toLocaleDateString() : 'N/A'}</td>
                        <td>|</td>
                        <td>
                          <span className={`px-2 py-1 rounded-full text-white ${color}`}>
                            {label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(true)}
                className="w-10 h-10 rounded-full bg-white text-[#4A5FE1] shadow-md hover:bg-[#e0e0ff] text-xl transform transition-all duration-200 hover:scale-110 active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col w-full gap-5 lg:w-1/3">
            {/* Suggested Dishes */}
            <div className="bg-[#EEEEFF] p-4 rounded-xl shadow-md flex-1  animate-fadeInUp"
              style={{ boxShadow: '-5px 10px 30px #524CC7', animationDelay: '0.3s' }}>
              <h3 className="text-xl text-[#6366F1] font-semibold mb-2">Suggested Dishes :</h3>
              {suggestedDishes.length > 0 ? (
                <ul className="list-disc pl-6 pt-3 text-[#3C3E87]">
                  {suggestedDishes.map((dish, index) => (
                    <li key={index} className="transition-all duration-200 transform ">
                      {dish.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600">No dishes found with current ingredients.</p>
              )}
            </div>

            {/* Reminders */}
            <div className="bg-[#EEEEFF] p-4 rounded-xl shadow-md flex-1 min-h-[250px] animate-fadeInUp"
              style={{ boxShadow: '-5px 10px 30px #524CC7', animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[40px] md:h-[40px]">
                  <path d="M6 2V6H4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V6H18V2H6ZM6 8H18V20H6V8ZM8 10V12H10V10H8ZM14 10V12H16V10H14Z" fill="#4A5FE1" />
                </svg>
                <h3 className="text-[#6366F1] font-medium text-base md:text-lg">Reminders</h3>
              </div>
              
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-xs md:text-sm min-w-[200px]">
                  <thead className="text-[#424495] font-200">
                    <tr>
                      <th className="pb-2 text-center">Items</th>
                      <th className="pb-2 text-center">Expiring In</th>
                    </tr>
                  </thead>
                  <tbody className="text-center text-zinc-700">
                    {expiringSoonItems.map((item, index) => {
                      const expires = item.expiryDate?.seconds ? new Date(item.expiryDate.seconds * 1000) : null;
                      const today = new Date();
                      const diff = expires ? Math.ceil((expires - today) / (1000 * 60 * 60 * 24)) : 0;
                      
                      let color = '';
                      if (diff <= 2) { color = 'bg-red-500'; }
                      else if (diff <= 7) { color = 'bg-yellow-400'; }
                      else { color = 'bg-green-500'; }

                      return (
                        <tr key={index} className="h-10 animate-slideInRight" style={{ animationDelay: `${0.1 * index}s` }}>
                          <td>{item.name}</td>
                          <td>
                            <span className={`px-2 py-1 text-xs text-white rounded-full ${color} animate-pulse`}>
                              {diff <= 0 ? 'Expired' : `${diff} days`}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {expiringSoonItems.length === 0 && (
                      <tr>
                        <td colSpan="2" className="py-4 text-gray-500">No items expiring soon</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddFoodItemModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddItem}
      />
    </div>
  )
}

export default FoodTracker