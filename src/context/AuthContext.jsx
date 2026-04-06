import React, { useState, useEffect, useRef, useCallback } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { api } from '../services';
import { auth, STORAGE_KEYS } from '../config';
import { AuthContext } from './AuthContextBase';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const rawUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (!rawUser) return null;
    try {
      return JSON.parse(rawUser);
    } catch {
      return null;
    }
  });
  
  const [token, setToken] = useState(
    localStorage.getItem(STORAGE_KEYS.TOKEN) || null
  );
  
  const [loading, setLoading] = useState(true);
  const justLoggedIn = useRef(false);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    // Also sign out from Firebase to be thorough
    auth.signOut().catch(() => {});
  }, []);

  /**
   * Sync with Firebase ID Token Lifecycle
   * ─────────────────────────────────────
   * This is the "proper" way to handle Firebase sessions.
   * It fires on initial load, token refresh, and sign-in/out.
   */
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        setToken(idToken);
        localStorage.setItem(STORAGE_KEYS.TOKEN, idToken);

        // If we don't have user display data yet, fetch from backend /me
        if (!user || justLoggedIn.current) {
          try {
            const data = await api.auth.getMe();
            const profile = data.user || data;
            setUser(profile);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(profile));
          } catch (err) {
            console.error('Failed to sync profile with PRISM backend:', err);
            // If /me fails with 401, logout
            if (err.status === 401) logout();
          } finally {
            justLoggedIn.current = false;
          }
        }
      } else {
        // No Firebase user — clear session
        if (token) logout();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [token, user, logout]);

  /**
   * Manual login entry point.
   */
  const login = (userData, idToken, refreshTk) => {
    justLoggedIn.current = true;
    setUser(userData);
    setToken(idToken);
    localStorage.setItem(STORAGE_KEYS.TOKEN, idToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    if (refreshTk) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshTk);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

