/**
 * Group Service
 * ──────────────
 * Handles all group-related API calls:
 *  • CRUD for groups
 *  • Member management (add / remove / list)
 *  • Balances, transactions, leave
 */
import apiClient from './apiClient';
import { GROUP_ENDPOINTS } from '../config';
import { request } from '../shared/api/request';

const groupService = {
  /* ── Groups CRUD ──────────────────────────── */
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

  deleteGroup: async (id) => {
    return request(() => apiClient.delete(GROUP_ENDPOINTS.DELETE(id)));
  },

  /* ── Members ──────────────────────────────── */
  getMembers: async (groupId) => {
    return request(() => apiClient.get(GROUP_ENDPOINTS.MEMBERS(groupId)));
  },

  addMember: async (groupId, payload) => {
    return request(() =>
      apiClient.post(GROUP_ENDPOINTS.MEMBERS(groupId), payload),
    );
  },

  removeMember: async (groupId, memberId) => {
    return request(() =>
      apiClient.delete(GROUP_ENDPOINTS.REMOVE_MEMBER(groupId, memberId)),
    );
  },

  /* ── Group data ───────────────────────────── */
  getBalances: async (groupId) => {
    return request(() => apiClient.get(GROUP_ENDPOINTS.BALANCES(groupId)));
  },

  getTransactions: async (groupId) => {
    return request(() => apiClient.get(GROUP_ENDPOINTS.TRANSACTIONS(groupId)));
  },

  leave: async (groupId) => {
    return request(() => apiClient.post(GROUP_ENDPOINTS.LEAVE(groupId)));
  },
};

export default groupService;
