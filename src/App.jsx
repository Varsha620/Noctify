import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ExamTracker from './pages/ExamTracker'
import ExpenseTracker from './pages/ExpenseTracker'
import NotifyFriends from './pages/NotifyFriends'
import BatBot from './pages/BatBot'
import Login from './pages/Login'
import Settings from './pages/Settings'
import MobileNavbar from './components/MobileNavbar'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import { AuthProvider, useAuth } from './context/AuthContext'
import Sidebar from './components/Sidebar';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#072D44]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#5790AB]"></div>
          <p className="mt-4 text-[#D0D7E1]">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function AppContent() {
  const { currentUser } = useAuth();

  return (
    <div className="relative flex">
      {/* Sidebar - always visible if logged in */}
      {currentUser && <Sidebar />}

      {/* Main content */}
      <div className="flex-1 ml-20 transition-all duration-300">
        <Routes>
          <Route 
            path="/login" 
            element={currentUser ? <Navigate to="/" replace /> : <Login />} 
          />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/exam-tracker" 
            element={
              <ProtectedRoute>
                <ExamTracker />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/expense-tracker" 
            element={
              <ProtectedRoute>
                <ExpenseTracker />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notify-friends" 
            element={
              <ProtectedRoute>
                <NotifyFriends />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bat-bot" 
            element={
              <ProtectedRoute>
                <BatBot />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>

      {/* Mobile Navigation */}
      {currentUser && (
        <Routes>
          <Route path="/login" element={null} />
          <Route path="*" element={<MobileNavbar />} />
        </Routes>
      )}

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}


function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App