import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRoleConfig, PUBLIC_ROUTES } from '../config/roleConfig';

/**
 * ProtectedRoute — wraps pages that require authentication and/or specific roles.
 * 
 * Usage:
 *   <Route path="/admin" element={
 *     <ProtectedRoute allowedRoles={['super_admin']}>
 *       <AdminPanel />
 *     </ProtectedRoute>
 *   } />
 */
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, profile, profileError, loading, signOut, debugLog } = useAuth();

  // Show loading spinner while auth state resolves
  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading__spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Profile error
  if (profileError) {
    return (
      <div className="auth-loading" style={{ padding: '20px', textAlign: 'center' }}>
        <h2 style={{color: '#ff4d4f', marginBottom: '10px'}}>Profile Error</h2>
        <p style={{color: '#ff4d4f', marginBottom: '20px'}}>{profileError}</p>
        <button className="btn btn-primary" onClick={() => signOut()}>Sign Out & Try Again</button>
      </div>
    );
  }

  // Profile not loaded yet (edge case)
  if (!profile) {
    return (
      <div className="auth-loading" style={{ flexDirection: 'column', padding: '20px' }}>
        <div className="auth-loading__spinner" style={{ marginBottom: '20px' }} />
        <p>Setting up your profile...</p>
        
        <div style={{ marginTop: '30px', textAlign: 'left', background: '#111', padding: '15px', borderRadius: '4px', fontSize: '12px', color: '#0f0', width: '100%', maxWidth: '600px', maxHeight: '300px', overflowY: 'auto', fontFamily: 'monospace' }}>
          <strong>Debug Trace:</strong>
          {debugLog && debugLog.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      </div>
    );
  }

  // Check role access
  if (allowedRoles.length > 0 && !allowedRoles.includes(profile.role)) {
    // Redirect to user's role-specific home
    const config = getRoleConfig(profile.role);
    return <Navigate to={config.home} replace />;
  }

  return children;
}
