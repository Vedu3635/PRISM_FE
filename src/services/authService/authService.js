import {
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase/firebase';

import api from '../api';
import Cookies from '../../utils/cookieUtils';

/**
 * Standardizes the user object from the backend response.
 */
const mapUser = (backendData) => {
  const user = backendData.user || backendData.User || backendData;
  return {
    id: user.id || user.uid || user.ID || user.UID,
    email: user.email || user.Email,
    name:
      user.name ||
      user.displayName ||
      user.username ||
      user.DisplayName ||
      user.Name ||
      user.Username,
    photoURL:
      user.photoURL ||
      user.avatarUrl ||
      user.PhotoURL ||
      user.AvatarUrl,
    roles: user.roles || user.Roles || [],
  };
};

/**
 * Sets authentication data in cookies.
 */
const setAuthSession = (token, user) => {
  const cookieOptions = { expires: 7, secure: true, sameSite: 'strict' };
  Cookies.set('auth_token', token, cookieOptions);
  Cookies.set('user_data', JSON.stringify(mapUser(user)), cookieOptions);
};

const authService = {
  /**
   * Login with email and password
   */
  signIn: async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { token, user, Token, User, id_token, idToken } = response.data;
      const authToken = token || Token || id_token || idToken;
      const userData = user || User;

      setAuthSession(authToken, userData);
      return mapUser(userData);
    } catch (error) {
      console.error("Error signing in:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Signup with email, password, and name
   */
  signUp: async (email, password, name) => {
    try {
      const response = await api.post('/auth/signup', {
        email,
        password,
        username: name,
        full_name: name,
      });

      const { token, user, Token, User, id_token, idToken } = response.data;
      const authToken = token || Token || id_token || idToken;
      const userData = user || User;

      setAuthSession(authToken, userData);
      return mapUser(userData);
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Social Login with Google
   */
  signInWithGoogle: async () => {
    try {
      // ✅ Step 1: Google popup login
      const result = await signInWithPopup(auth, googleProvider);

      // ✅ Step 2: Extract user properly
      const user = result.user;

      // ✅ Step 3: Get Firebase ID token (THIS is what backend needs)
      const idToken = await user.getIdToken();

      console.log("Firebase ID Token:", idToken);

      // ✅ Step 4: Send token to backend
      const response = await api.post('/auth/social', {
        id_token: idToken,
      });

      const {
        token,
        user: backendUser,
        Token,
        User,
        id_token,
        idToken: backendIdToken,
      } = response.data;

      const authToken =
        token || Token || id_token || backendIdToken || response.data.backendToken;

      const userData = backendUser || User;

      // ✅ Step 5: Store session
      setAuthSession(authToken, userData);

      return mapUser(userData);
    } catch (error) {
      console.error(
        "Error with Google sign-in:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  /**
   * Get current auth token
   */
  getToken: () => Cookies.get('auth_token'),

  /**
   * Get current user data
   */
  getCurrentUser: () => {
    const userData = Cookies.get('user_data');
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Logout
   */
  logout: async () => {
    try {
      await signOut(auth);
      Cookies.remove('auth_token');
      Cookies.remove('user_data');
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  },
};

export default authService;