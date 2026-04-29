import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bus, Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getRoleConfig } from '../config/roleConfig';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, isAuthenticated, profile, profileError, debugLog, signOut } = useAuth();

  // Already logged in → redirect to role home
  if (isAuthenticated && profile) {
    const config = getRoleConfig(profile.role);
    return <Navigate to={config.home} replace />;
  }

  // If authenticated but no profile loaded yet, show loading or error
  if (isAuthenticated && !profile && !isLoading) {
    return (
      <div className="login-page">
        <div className="login-card" style={{ maxWidth: '500px', width: '100%' }}>
          {profileError ? (
            <>
              <h2 className="login-card__title" style={{color: '#ff4d4f'}}>Profile Error</h2>
              <p className="login-card__subtitle" style={{color: '#ff4d4f'}}>{profileError}</p>
              <button 
                className="btn btn-primary" 
                style={{marginTop: '20px', width: '100%'}}
                onClick={() => signOut()}
              >
                Sign Out & Try Again
              </button>
            </>
          ) : (
            <>
              <h2 className="login-card__title">Almost there...</h2>
              <p className="login-card__subtitle">Loading your profile data.</p>
              <div className="login-form__spinner" style={{margin: '20px auto'}} />
              <div style={{ marginTop: '20px', textAlign: 'left', background: '#111', padding: '10px', borderRadius: '4px', fontSize: '12px', color: '#0f0', maxHeight: '200px', overflowY: 'auto', fontFamily: 'monospace' }}>
                <strong>Debug Trace:</strong>
                {debugLog && debugLog.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
      // We don't navigate manually here.
      // AuthContext's onAuthStateChange will detect the login,
      // fetch the profile, update state, and trigger a re-render.
      // The if (isAuthenticated && profile) block above will then redirect.
      
      // We just keep the spinner spinning. If it takes longer than 10s, something is wrong.
      setTimeout(() => {
        setIsLoading(false);
        setError('Login took too long. Please refresh the page and try again.');
      }, 10000);
      
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  }

  return (
    <div className="login-page">
      {/* Animated background */}
      <div className="login-bg">
        <div className="login-bg__gradient login-bg__gradient--1" />
        <div className="login-bg__gradient login-bg__gradient--2" />
        <div className="login-bg__gradient login-bg__gradient--3" />
        <div className="login-bg__grid" />
      </div>

      {/* Floating bus particles */}
      <div className="login-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`login-particle login-particle--${i + 1}`}>
            <Bus size={16 + i * 4} />
          </div>
        ))}
      </div>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <div className="login-card__logo">
          <motion.div
            className="login-card__logo-icon"
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Bus size={32} />
          </motion.div>
          <h1 className="login-card__logo-text">SARV</h1>
        </div>

        <h2 className="login-card__title">Welcome Back</h2>
        <p className="login-card__subtitle">Sign in to your transportation dashboard</p>

        {/* Error message */}
        {error && (
          <motion.div
            className="login-card__error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form__group">
            <div className="login-form__icon">
              <Mail size={18} />
            </div>
            <input
              id="login-email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="login-form__input"
            />
          </div>

          <div className="login-form__group">
            <div className="login-form__icon">
              <Lock size={18} />
            </div>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="login-form__input"
            />
            <button
              type="button"
              className="login-form__toggle-pw"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <motion.button
            type="submit"
            className="login-form__submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="login-form__spinner" />
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In</span>
              </>
            )}
          </motion.button>
        </form>

        <div className="login-card__footer">
          <p>Smart School Transportation System</p>
          <span className="login-card__version">v1.0 Prototype</span>
        </div>
      </motion.div>
    </div>
  );
}
