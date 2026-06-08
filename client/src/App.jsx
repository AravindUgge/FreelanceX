import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import CreateProjectPage from './pages/CreateProjectPage';
import FreelancersPage from './pages/FreelancersPage';
import ProfilePage from './pages/ProfilePage';
import MessagesPage from './pages/MessagesPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-400">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center animate-pulse">
            <span className="text-white font-bold text-2xl">FX</span>
          </div>
          <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-400">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center animate-pulse">
            <span className="text-white font-bold text-2xl">FX</span>
          </div>
          <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  return (
    <div className="min-h-screen bg-dark-400 text-white flex flex-col">
      <Routes>
        <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Navbar /><DashboardPage /><Footer /></ProtectedRoute>} />
        <Route path="/projects" element={<><Navbar /><ProjectsPage /><Footer /></>} />
        <Route path="/projects/create" element={<ProtectedRoute><Navbar /><CreateProjectPage /><Footer /></ProtectedRoute>} />
        <Route path="/projects/:id" element={<><Navbar /><ProjectDetailPage /><Footer /></>} />
        <Route path="/freelancers" element={<><Navbar /><FreelancersPage /><Footer /></>} />
        <Route path="/profile" element={<ProtectedRoute><Navbar /><ProfilePage /><Footer /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Navbar /><MessagesPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Navbar /><SettingsPage /><Footer /></ProtectedRoute>} />
        <Route path="/about" element={<><Navbar /><AboutPage /><Footer /></>} />
        <Route path="/pricing" element={<><Navbar /><PricingPage /><Footer /></>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
