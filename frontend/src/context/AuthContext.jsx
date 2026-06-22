import React, { createContext, useContext, useState, useEffect } from 'react';
import { registerUser, loginUser, logoutUser, getMe } from '../api/authApi';
import { supabase } from '../api/supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage for persistent sessions
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // If we already have a persistent user in localStorage, don't show the initial loading page
  const [loading, setLoading] = useState(() => {
    const saved = localStorage.getItem('user');
    return !saved;
  });

  const bridgeSupabaseToBackend = async (sbUser) => {
    const email = sbUser.email;
    const password = `oauth_google_${sbUser.id}`;
    try {
      const res = await loginUser(email, password);
      return res.user;
    } catch (loginErr) {
      try {
        await registerUser(email, password);
        const res = await loginUser(email, password);
        return res.user;
      } catch (regErr) {
        console.error('Silent Google backend registration failed:', regErr);
        throw regErr;
      }
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          try {
            const backendRes = await getMe();
            setUser(backendRes.user);
            localStorage.setItem('user', JSON.stringify(backendRes.user));
          } catch (err) {
            const bUser = await bridgeSupabaseToBackend(session.user);
            setUser(bUser);
            localStorage.setItem('user', JSON.stringify(bUser));
          }
        } else {
          try {
            const backendRes = await getMe();
            setUser(backendRes.user);
            localStorage.setItem('user', JSON.stringify(backendRes.user));
          } catch (err) {
            // Clean up localStorage session if backend cookie is invalid/expired
            setUser(null);
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Error during auth initialization:', error);
        setUser(null);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setLoading(true);
        try {
          const bUser = await bridgeSupabaseToBackend(session.user);
          setUser(bUser);
          localStorage.setItem('user', JSON.stringify(bUser));
        } catch (err) {
          console.error('Bridging after sign in state change failed:', err);
        } finally {
          setLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
        try {
          await logoutUser();
        } catch (err) {
          // Ignore backend logout failure
        }
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      setUser(res.user);
      localStorage.setItem('user', JSON.stringify(res.user));
      return res.user;
    } catch (error) {
      setUser(null);
      localStorage.removeItem('user');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    try {
      await registerUser(email, password);
      const res = await loginUser(email, password);
      setUser(res.user);
      localStorage.setItem('user', JSON.stringify(res.user));
      return res.user;
    } catch (error) {
      setUser(null);
      localStorage.removeItem('user');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase.auth.signOut();
      }
      await logoutUser();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
