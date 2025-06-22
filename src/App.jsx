import Dashboard from './pages/Dashboard'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import FoodTracker from './pages/FoodTracker'
import ExpenseTracker from './pages/ExpenseTracker'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/food-tracker" element={<FoodTracker />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  )
}
export default App
