/**
 * Auth Service
 * ─────────────
 * Handles all authentication-related API calls:
 *  • POST /auth/token       – Exchange email/password for Firebase ID token
 *  • POST /auth/signup      – Register a new user
 *  • POST /auth/social-login – Verify Firebase ID token (Google sign-in)
 *  • GET  /me               – Get current user profile
 */
import apiClient from './apiClient';
import { AUTH_ENDPOINTS } from '../config';
import { request } from '../shared/api/request';

const authService = {
  /**
   * Exchange email + password for a Firebase ID token.
   * The returned `id_token` is used as the Bearer token for all protected
   * endpoints.
   *
   * @returns {{ email, id_token, refresh_token, expires_in }}
   */
  getToken: async (email, password) => {
    return request(() =>
      apiClient.post(AUTH_ENDPOINTS.TOKEN, {
        email,
        password,
      }),
    );
  },

  /**
   * Register a new account.
   * Sends multiple casing variations of fullName to guarantee the
   * Go JSON unmarshaler picks it up regardless of struct tags.
   */
  signup: async (fullName, username, email, password) => {
    const payload = {
      fullName,
      full_name: fullName,
      fullname: fullName,
      FullName: fullName,
      username,
      email,
      password,
    };
    return request(() => apiClient.post(AUTH_ENDPOINTS.SIGNUP, payload));
  },

  /**
   * Exchange a Firebase ID token (from Google popup) for a backend session.
   * Creates a DB user if it's the first time.
   *
   * @param {string} idToken – Firebase ID token from client SDK
   */
  socialLogin: async (idToken) => {
    try {
      return await request(() =>
        apiClient.post(AUTH_ENDPOINTS.SOCIAL_LOGIN, {
          id_token: idToken,
        }),
      );
    } catch (err) {
      // Backward compatibility if server still exposes the legacy path.
      if (err?.status === 404) {
        return request(() =>
          apiClient.post('/auth/social-login', {
            id_token: idToken,
          }),
        );
      }
      throw err;
    }
  },

  /**
   * Get the authenticated user's profile.
   */
  getMe: async () => {
    return request(() => apiClient.get(AUTH_ENDPOINTS.ME));
  },
};

export default authService;
