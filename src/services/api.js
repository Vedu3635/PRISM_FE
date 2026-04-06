/**
 * Unified API Service Layer
 * ──────────────────────────
 * Centralised gateway for all project services:
 *  • Auth (Login, Signup, Social)
 *  • Groups (CRUD, Balances, Members)
 *  • User (Profile, Updates)
 *  • Transactions (Personal records)
 * ──────────────────────────
 */
import apiClient from './apiClient';
import { request } from '../shared/api/request';
import { 
  AUTH_ENDPOINTS, 
  GROUP_ENDPOINTS, 
  USER_ENDPOINTS 
} from '../config';

const api = {
  // ── Authentication ──────────────────────────
  auth: {
    /**
     * Exchange email + password for a Firebase ID token.
     */
    getToken: async (email, password) => {
      return request(() =>
        apiClient.post(AUTH_ENDPOINTS.TOKEN, { email, password })
      );
    },

    /**
     * Register a new account.
     */
    signup: async (fullName, username, email, password) => {
      const payload = {
        fullName,
        full_name: fullName,
        username,
        email,
        password,
      };
      return request(() => apiClient.post(AUTH_ENDPOINTS.SIGNUP, payload));
    },

    /**
     * Social login verify.
     */
    socialLogin: async (idToken) => {
      return request(() =>
        apiClient.post(AUTH_ENDPOINTS.SOCIAL_LOGIN, { id_token: idToken })
      );
    },

    /**
     * Fetch authenticated user's profile.
     */
    getMe: async () => {
      return request(() => apiClient.get(AUTH_ENDPOINTS.ME));
    },
  },

  // ── User Profile ────────────────────────────
  user: {
    getProfile: async () => {
      return request(() => apiClient.get(USER_ENDPOINTS.PROFILE));
    },
    updateProfile: async (payload) => {
      return request(() => apiClient.put(USER_ENDPOINTS.UPDATE_PROFILE, payload));
    },
    deleteAccount: async () => {
      return request(() => apiClient.delete(USER_ENDPOINTS.DELETE_ACCOUNT));
    },
  },

  // ── Groups ──────────────────────────────────
  groups: {
    list: async () => {
      return request(() => apiClient.get(GROUP_ENDPOINTS.LIST));
    },
    getUserGroups: async () => {
      return request(() => apiClient.get(GROUP_ENDPOINTS.USER_GROUPS));
    },
    getById: async (id) => {
      return request(() => apiClient.get(GROUP_ENDPOINTS.BY_ID(id)));
    },
    create: async (payload) => {
      return request(() => apiClient.post(GROUP_ENDPOINTS.CREATE, payload));
    },
    update: async (id, payload) => {
      return request(() => apiClient.put(GROUP_ENDPOINTS.UPDATE(id), payload));
    },
    delete: async (id) => {
      return request(() => apiClient.delete(GROUP_ENDPOINTS.DELETE(id)));
    },
    getMembers: async (groupId) => {
      return request(() => apiClient.get(GROUP_ENDPOINTS.MEMBERS(groupId)));
    },
    addMember: async (groupId, payload) => {
      return request(() =>
        apiClient.post(GROUP_ENDPOINTS.MEMBERS(groupId), payload)
      );
    },
    removeMember: async (groupId, memberId) => {
      return request(() =>
         apiClient.delete(GROUP_ENDPOINTS.REMOVE_MEMBER(groupId, memberId))
      );
    },
    getBalances: async (groupId) => {
      return request(() => apiClient.get(GROUP_ENDPOINTS.BALANCES(groupId)));
    },
    getTransactions: async (groupId) => {
      return request(() => apiClient.get(GROUP_ENDPOINTS.TRANSACTIONS(groupId)));
    },
    leave: async (groupId) => {
      return request(() => apiClient.post(GROUP_ENDPOINTS.LEAVE(groupId)));
    },
  },

  // ── Personal Transactions ───────────────────
  personal: {
    getCategories: async () => request(() => apiClient.get('/personal/categories/')),
    getSummary: async () => request(() => apiClient.get('/personal/summary/')),
    getTransactions: async ({ category, from, to } = {}) =>
      request(() =>
        apiClient.get('/personal/transactions/', {
          params: { category, from, to },
        })
      ),
    addTransaction: async (payload) =>
      request(() => apiClient.post('/personal/transactions/', payload)),
    deleteTransaction: async (id) =>
      request(() => apiClient.delete(`/personal/transactions/${id}/`)),
  },
};

export default api;
