import api from '../api';
import authService from '../authService/authService';

/**
 * Service to handle all group-related API operations.
 */
const groupService = {
  /**
   * List all groups the user belongs to.
   */
  getGroups: async () => {
    // Mock data for groups
    const mockGroups = [
      { id: 'g1', name: 'Apartment 402', members: 4, balance: 12500, status: 'active', code: 'APT402' },
      { id: 'g2', name: 'Goa Trip 2026', members: 8, balance: 45000, status: 'active', code: 'GOA26' },
      { id: 'g3', name: 'Family Weekend', members: 5, balance: -2000, status: 'warning', code: 'FAMWK' },
    ];
    
    // Simulate API delay
    return new Promise(resolve => setTimeout(() => resolve(mockGroups), 500));
    try {
      const response = await api.get('/groups/');
      const data = response.data || [];

      // Map PascalCase/snake_case -> camelCase (UI)
      return data.map(g => ({
        id: g.ID || g.id,
        name: g.Name || g.name || "Untitled Group",
        description: g.Description || g.description || "",
        type: g.Type || g.type || "personal",
        currency: g.Currency || g.currency || "INR",
        members: g.Members?.length || 0,
        balance: parseFloat(g.Balance || g.balance || 0),
        code: g.Code || g.code || "N/A",
        status: g.Status || g.status || "active",
        createdAt: g.CreatedAt || g.created_at
      }));
    } catch (error) {
      console.error("Error fetching groups:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Helper to find the user's "Personal" group.
   */
  getPersonalGroup: async () => {
    try {
      const groups = await groupService.getGroups();
      return groups.find(g => g.type === 'personal') || groups[0];
    } catch (error) {
      return null;
    }
  },

  /**
   * Create a new group.
   * Relies on backend to derive creator identity from the JWT.
   */
  createGroup: async (groupData) => {
    try {
      const user = authService.getCurrentUser();
      
      const payload = {
        name: groupData.name,
        description: groupData.description || "",
        type: groupData.type || "personal",
        currency: groupData.currency || "INR",
        created_by: user?.id
      };

      const response = await api.post('/groups/', payload);
      return response.data;
    } catch (error) {
      console.error("Error creating group:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Join a group using an invitation code.
   */
  joinGroup: async (code) => {
    try {
      const response = await api.post(`/groups/join/`, { code });
      return response.data;
    } catch (error) {
      console.error("Error joining group:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Update an existing group.
   */
  updateGroup: async (id, groupData) => {
    try {
      const payload = {
        name: groupData.name,
        description: groupData.description || "",
        type: groupData.type || "personal",
        currency: groupData.currency || "INR"
        // created_by removed to favor Token identification
      };

      const response = await api.put(`/groups/${id}/`, payload);
      return response.data;
    } catch (error) {
      console.error("Error updating group:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Delete a group.
   */
  deleteGroup: async (id) => {
    try {
      const response = await api.delete(`/groups/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting group:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Get transactions for a specific group.
   * Takes a group and optionally its name for enrichment.
   */
  getGroupTransactions: async (groupId, groupName = "External Group") => {
    try {
      const url = `/groups/${groupId}/transactions`;
      const response = await api.get(url);
      const data = response.data || [];

      return data.map(tx => ({
        id: tx.ID || tx.id,
        title: tx.Title || tx.title || "Untitled",
        amount: parseFloat(tx.Amount || tx.amount || 0),
        category: tx.Category || tx.category || "General",
        date: tx.TransactedAt || tx.transactedAt || tx.createdAt,
        paidBy: tx.PaidBy || tx.paid_by || tx.paidBy,
        groupId: groupId,
        groupName: groupName
      }));
    } catch (error) {
      console.error(`Error fetching transactions for group ${groupId}:`, error.response?.data || error.message);
      return [];
    }
  }
};

export default groupService;
