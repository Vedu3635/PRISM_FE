/**
 * User Service
 * ─────────────
 * Handles user profile operations:
 *  • GET  /me – Fetch authenticated user's profile
 *  • PUT  /me – Update profile fields
 */
import apiClient from './apiClient';
import { USER_ENDPOINTS } from '../config';
import { request } from '../shared/api/request';

const userService = {
  /**
   * Fetch the authenticated user's full profile.
   */
  getProfile: async () => {
    return request(() => apiClient.get(USER_ENDPOINTS.PROFILE));
  },

  /**
   * Update the authenticated user's profile.
   * @param {object} payload – fields to update (full_name, username, phone, etc.)
   */
  updateProfile: async (payload) => {
    try {
      return await request(() => apiClient.put(USER_ENDPOINTS.UPDATE_PROFILE, payload));
    } catch (err) {
      // Backward compatibility if server still exposes legacy /me updates.
      if (err?.status === 404) {
        return request(() => apiClient.put('/me', payload));
      }
      throw err;
    }
  },

  /**
   * Delete / deactivate the authenticated user's account.
   */
  deleteAccount: async () => {
    try {
      return await request(() => apiClient.delete(USER_ENDPOINTS.DELETE_ACCOUNT));
    } catch (err) {
      // Backward compatibility if server still exposes legacy /me deletes.
      if (err?.status === 404) {
        return request(() => apiClient.delete('/me'));
      }
      throw err;
    }
  },
};

export default userService;
