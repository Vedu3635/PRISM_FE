import React, { useState, useEffect, useRef, useCallback } from 'react';
import { authService } from '../shared/api';
import { STORAGE_KEYS } from '../config';
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
    localStorage.getItem(STORAGE_KEYS.TOKEN) || null,
  );
  const [loading, setLoading] = useState(true);

  // Track whether login() was called explicitly to skip the validation fetch
  const justLoggedIn = useRef(false);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      // If login() was just called, the user is already set — skip /me
      if (justLoggedIn.current) {
        justLoggedIn.current = false;
        setLoading(false);
        return;
      }

      if (token) {
        try {
          const data = await authService.getMe();
          setUser(data.user || data);
        } catch (error) {
          // Only clear storage for real auth failures. For network timeouts
          // or temporary backend outages, preserve local session data.
          const status = error?.status || error?.response?.status;
          if (status === 401 || status === 403) {
            logout();
          }
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token, logout]);

  /**
   * Persist auth state after a successful login or social-login.
   * @param {object}  userData   – user profile from API
   * @param {string}  idToken    – Firebase ID token (Bearer)
   * @param {string}  [refreshTk] – optional refresh token
   */
  const login = (userData, idToken, refreshTk) => {
    justLoggedIn.current = true; // prevent useEffect from re-fetching /me
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

