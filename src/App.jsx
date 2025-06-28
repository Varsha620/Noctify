// src/App.jsx
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ExamTracker from './pages/ExamTracker'
import ExpenseTracker from './pages/ExpenseTracker'
import NotifyFriends from './pages/NotifyFriends'
import BatBot from './pages/BatBot'
import Login from './pages/Login'
import Settings from './pages/Settings'
import MobileNavbar from './components/MobileNavbar'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="relative">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/exam-tracker" element={<ExamTracker />} />
            <Route path="/expense-tracker" element={<ExpenseTracker />} />
            <Route path="/notify-friends" element={<NotifyFriends />} />
            <Route path="/bat-bot" element={<BatBot />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          
          {/* Mobile Navigation - Show on all pages except login */}
          <Routes>
            <Route path="/login" element={null} />
            <Route path="*" element={<MobileNavbar />} />
          </Routes>

          {/* PWA Install Prompt */}
          <PWAInstallPrompt />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App