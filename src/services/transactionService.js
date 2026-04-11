import api from './api';
import authService from './authService/authService';
import groupService from './groupService/groupService';

/**
 * Service to handle all transaction-related API operations.
 * Strictly aligned with Backend PascalCase conventions, with snake_case fallbacks for safety.
 */
const transactionService = {
  /**
   * Fetch all transactions for the current user.
   * Maps PascalCase backend keys to camelCase UI fields.
   */
  getTransactions: async () => {
    try {
      const response = await api.get('/transactions/');
      const data = response.data || [];
      
      // Map PascalCase (Backend) -> camelCase (UI)
      return data.map(tx => ({
        id: tx.ID || tx.id,
        title: tx.Title || tx.title || "Untitled",
        amount: parseFloat(tx.Amount || tx.amount || 0),
        category: tx.Category || tx.category || "General",
        date: tx.TransactedAt || tx.transactedAt || tx.createdAt || new Date().toISOString(),
        currency: tx.Currency || tx.currency || "INR",
        type: tx.Type || tx.type || "expense",
        notes: tx.Notes || tx.notes || ""
      }));
    } catch (error) {
      console.error("Error fetching transactions:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Create a new transaction with Dual-Casing payload (PascalCase + snake_case fallback).
   */
  createTransaction: async (data) => {
    try {
      const user = authService.getCurrentUser();
      console.log("[transactionService] Current Auth User:", user);
      
      if (!user?.id) throw new Error("User not authenticated");

      // 1. Identify or Create a Group
      let groupId = data.GroupID || data.groupId || data.group_id;
      
      if (!groupId) {
        const groups = await groupService.getGroups();
        let personalGroup = groups.find(g => 
          g.IsPersonal === true || 
          g.isPersonal === true || 
          g.Name?.toLowerCase().includes('personal') ||
          g.name?.toLowerCase().includes('personal')
        );
        
        if (!personalGroup && groups.length > 0) {
          personalGroup = groups[0];
        }

        if (!personalGroup) {
          personalGroup = await groupService.createGroup({
            Name: "Personal",
            Type: "personal",
            Currency: data.Currency || data.currency || "INR"
          });
        }
        
        groupId = personalGroup?.ID || personalGroup?.id;
      }

      if (!groupId) throw new Error("Failed to assign a valid GroupID");

      const amount = parseFloat(data.amount || data.Amount);

      // 2. Prepare Payload (Dual-Casing for maximum compatibility)
      const payload = {
        // PascalCase (Internal Observed)
        Title: data.title || data.Title,
        Amount: amount,
        Category: data.category || data.Category,
        Currency: data.currency || data.Currency || "INR",
        GroupID: groupId,
        PaidBy: user.id,
        TransactedAt: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        Notes: data.notes || data.Notes || "",
        SplitType: "equal",
        Participants: [
          {
            UserID: user.id,
            OwedAmount: amount
          }
        ],
        // snake_case (Swagger doc aliases)
        group_id: groupId,
        paid_by: user.id,
        transacted_at: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        notes: data.notes || data.Notes || "",
        split_type: "equal",
        participants: [
          {
            user_id: user.id,
            owed_amount: amount
          }
        ]
      };

      console.log("[transactionService] Sending Payload:", JSON.stringify(payload, null, 2));
      const response = await api.post('/transactions/', payload);
      return response.data;
    } catch (error) {
      console.error("Error creating transaction:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Update an existing transaction.
   */
  updateTransaction: async (id, data) => {
    try {
      const payload = {
        Title: data.title || data.Title,
        Category: data.category || data.Category,
        Notes: data.notes || data.Notes,
      };

      const response = await api.put(`/transactions/${id}/`, payload);
      return response.data;
    } catch (error) {
      console.error("Error updating transaction:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Soft-delete a transaction.
   */
  deleteTransaction: async (id) => {
    try {
      const response = await api.delete(`/transactions/${id}/`);
      return response.data;
    } catch (error) {
      console.error("Error deleting transaction:", error.response?.data || error.message);
      throw error;
    }
  }
};

export default transactionService;
