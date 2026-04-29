import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, Menu, X, LogOut, LogIn, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getRoleConfig, PUBLIC_ROUTES } from '../config/roleConfig';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, profile, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Get nav items based on user's role, or show public-only items
  const navLinks = isAuthenticated && profile
    ? getRoleConfig(profile.role).navItems
    : [
        { path: '/', label: 'Home', icon: Bus },
        { path: '/about', label: 'About', icon: Bus },
      ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  async function handleLogout() {
    try {
      await signOut();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
    }
  }

  const roleConfig = profile ? getRoleConfig(profile.role) : null;

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-icon">
            <Bus size={24} />
          </div>
          <span className="navbar__logo-text">SARV</span>
        </Link>

        <div className="navbar__links">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`navbar__link ${location.pathname === path ? 'navbar__link--active' : ''}`}
            >
              <Icon size={16} />
              <span>{label}</span>
              {location.pathname === path && (
                <motion.div
                  className="navbar__link-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right side — auth info */}
        <div className="navbar__auth">
          {isAuthenticated && profile ? (
            <div className="navbar__user-section">
              <div className="navbar__user-info">
                <div className="navbar__user-avatar" style={{ borderColor: roleConfig?.color || 'var(--primary)' }}>
                  {profile.full_name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div className="navbar__user-details">
                  <span className="navbar__user-name">{profile.full_name}</span>
                  <span className="navbar__user-role" style={{ color: roleConfig?.color || 'var(--primary)' }}>
                    {roleConfig?.label || profile.role}
                  </span>
                </div>
              </div>
              <button className="navbar__logout-btn" onClick={handleLogout} title="Sign Out">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary navbar__login-btn">
              <LogIn size={16} />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`navbar__mobile-link ${location.pathname === path ? 'navbar__mobile-link--active' : ''}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}

            {/* Mobile auth */}
            <div className="navbar__mobile-auth">
              {isAuthenticated && profile ? (
                <>
                  <div className="navbar__mobile-user">
                    <div className="navbar__user-avatar" style={{ borderColor: roleConfig?.color || 'var(--primary)' }}>
                      {profile.full_name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <span className="navbar__user-name">{profile.full_name}</span>
                      <span className="navbar__user-role" style={{ color: roleConfig?.color }}>
                        {roleConfig?.label}
                      </span>
                    </div>
                  </div>
                  <button className="navbar__mobile-logout" onClick={handleLogout}>
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/login" className="navbar__mobile-link">
                  <LogIn size={18} />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
