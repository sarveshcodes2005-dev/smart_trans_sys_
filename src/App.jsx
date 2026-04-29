import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './context/AuthContext';
import { getRoleConfig } from './config/roleConfig';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tracking from './pages/Tracking';
import RoutesPage from './pages/Routes';
import Parent from './pages/Parent';
import About from './pages/About';
import AdminPanel from './pages/AdminPanel';
import DriverDashboard from './pages/DriverDashboard';
import UserManagement from './pages/UserManagement';

function App() {
  const location = useLocation();
  const { isAuthenticated, profile, loading } = useAuth();
  
  // Don't show navbar/footer on login page
  const isLoginPage = location.pathname === '/login';
  // Don't show footer on tracking page (full-screen map) or login page
  const hideFooter = location.pathname === '/tracking' || isLoginPage;

  return (
    <>
      {!isLoginPage && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />

          {/* Protected: Super Admin */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <UserManagement />
            </ProtectedRoute>
          } />

          {/* Protected: School Admin, Transport Coordinator, Super Admin */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['super_admin', 'school_admin', 'transport_coordinator']}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/tracking" element={
            <ProtectedRoute allowedRoles={['super_admin', 'school_admin', 'transport_coordinator']}>
              <Tracking />
            </ProtectedRoute>
          } />
          <Route path="/routes" element={
            <ProtectedRoute allowedRoles={['super_admin', 'school_admin', 'transport_coordinator']}>
              <RoutesPage />
            </ProtectedRoute>
          } />

          {/* Protected: Parent + Super Admin */}
          <Route path="/parent" element={
            <ProtectedRoute allowedRoles={['super_admin', 'parent']}>
              <Parent />
            </ProtectedRoute>
          } />

          {/* Protected: Driver + Super Admin */}
          <Route path="/driver" element={
            <ProtectedRoute allowedRoles={['super_admin', 'driver']}>
              <DriverDashboard />
            </ProtectedRoute>
          } />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
