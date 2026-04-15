import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Tracking from './pages/Tracking';
import RoutesPage from './pages/Routes';
import Parent from './pages/Parent';
import About from './pages/About';

function App() {
  const location = useLocation();
  
  // Don't show footer on tracking page (full-screen map)
  const hideFooter = location.pathname === '/tracking';

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/parent" element={<Parent />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AnimatePresence>
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
