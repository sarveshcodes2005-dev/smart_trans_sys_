import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getRoleConfig } from '../config/roleConfig';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  const [debugLog, setDebugLog] = useState([]);
  const addDebug = (msg) => setDebugLog(prev => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);

  // Fetch user profile from the profiles table
  async function fetchProfile(userId) {
    addDebug(`fetchProfile called for ${userId}`);
    try {
      // Create a timeout promise
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timed out after 8 seconds')), 8000)
      );

      // Try with raw fetch to bypass any Supabase JS client hanging issues
      const rawFetch = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error('No session for raw fetch');
        
        addDebug(`Executing raw fetch to Supabase API...`);
        const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}&select=*`, {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${session.access_token}`,
            'Accept': 'application/vnd.pgrst.object+json'
          }
        });
        
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }
        return await res.json();
      };

      const data = await Promise.race([rawFetch(), timeout]);
      
      addDebug(`fetchProfile success: ${data ? 'Profile found' : 'No data'}`);
      setProfileError(null);
      return data;
    } catch (err) {
      addDebug(`fetchProfile catch: ${err.message}`);
      console.error('Profile fetch failed:', err);
      setProfileError(err.message || 'Unknown error');
      return null;
    }
  }

  useEffect(() => {
    addDebug('AuthContext useEffect started');
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      addDebug(`getSession resolved. Session exists: ${!!currentSession}`);
      setSession(currentSession);
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id).then((p) => {
          addDebug(`getSession fetchProfile finished. p is ${p ? 'truthy' : 'falsy'}`);
          setProfile(p);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }).catch(err => addDebug(`getSession error: ${err.message}`));

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        addDebug(`onAuthStateChange fired: ${event}. Session: ${!!newSession}`);
        setSession(newSession);
        if (newSession?.user) {
          const p = await fetchProfile(newSession.user.id);
          addDebug(`onAuthStateChange fetchProfile finished. p is ${p ? 'truthy' : 'falsy'}`);
          setProfile(p);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Sign in with email & password
  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  // Sign out
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setSession(null);
    setProfile(null);
  }

  // Check if user has a specific role
  function hasRole(role) {
    return profile?.role === role;
  }

  // Check if user can access a route
  function canAccess(path) {
    if (!profile) return false;
    const config = getRoleConfig(profile.role);
    return config.routes.includes(path);
  }

  const value = {
    session,
    user: session?.user ?? null,
    profile,
    profileError,
    debugLog,
    loading,
    signIn,
    signOut,
    hasRole,
    canAccess,
    isAuthenticated: !!session,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
