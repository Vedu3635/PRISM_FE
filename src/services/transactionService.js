import api from './api';
import authService from './authService/authService';
import groupService from './groupService/groupService';

/**
 * Utility: Safe getter for mixed casing
 */
const pick = (obj, keys, defaultValue = null) => {
  for (const key of keys) {
    if (obj?.[key] !== undefined && obj?.[key] !== null) {
      return obj[key];
    }
  }
  return defaultValue;
};

/**
 * Utility: Safe number parsing
 */
const toNumber = (value, fallback = 0) => {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};

const transactionService = {

  // ========================
  // GET TRANSACTIONS
  // ========================
  getTransactions: async () => {
    try {
      const { data = [] } = await api.get('/transactions/');

      return data.map(tx => ({
        id: pick(tx, ['ID', 'id']),
        title: pick(tx, ['Title', 'title'], 'Untitled'),
        amount: toNumber(pick(tx, ['Amount', 'amount'], 0)),
        category: pick(tx, ['Category', 'category'], 'General'),
        transactedAt: pick(tx, ['TransactedAt', 'transactedAt', 'createdAt'], new Date().toISOString()),
        currency: pick(tx, ['Currency', 'currency'], 'INR'),
        type: pick(tx, ['Type', 'type'], 'expense'),
        status: pick(tx, ['Status', 'status'], 'active'),
        notes: pick(tx, ['Notes', 'notes'], '')
      }));

    } catch (error) {
      console.error("Error fetching transactions:", error.response?.data || error.message);
      throw error;
    }
  },

  // ========================
  // CREATE TRANSACTION
  // ========================
  createTransaction: async (data) => {
    try {
      const user = authService.getCurrentUser();
      if (!user?.id) throw new Error("User not authenticated");

      const amount = toNumber(data.amount || data.Amount);
      if (amount <= 0) throw new Error("Invalid transaction amount");

      // Resolve Group (delegated logic)
      let groupId = data.group_id || data.groupId || data.GroupID;

      if (!groupId) {
        let group = await groupService.getPersonalGroup();

        if (!group) {
          group = await groupService.createGroup({
            Name: "Personal",
            Type: "personal",
            Currency: data.currency || "INR"
          });
        }

        groupId = pick(group, ['ID', 'id']);
      }

      if (!groupId) throw new Error("Group resolution failed");

      const payload = {
        amount,
        type: data.type || "expense",
        category_id: data.category_id || null,
        currency: data.currency || "INR",
        goal_id: data.goal_id || null,
        group_id: groupId,
        notes: data.notes || "",
        paid_by: user.id,
        participants: data.participants?.length
          ? data.participants
          : [{
              user_id: user.id,
              owed_amount: amount
            }],
        receipt_url: data.receipt_url || null,
        split_type: data.split_type || "equal",
        title: data.title?.trim(),
        transacted_at: data.date
          ? new Date(data.date).toISOString()
          : new Date().toISOString()
      };

      const response = await api.post('/transactions/', payload);
      return response.data;

    } catch (error) {
      console.error("Error creating transaction:", error.response?.data || error.message);
      throw error;
    }
  },

  // ========================
  // UPDATE
  // ========================
  updateTransaction: async (id, data) => {
    try {
      if (!id) throw new Error("Transaction ID required");

      const payload = {
        Title: data.title,
        Category: data.category,
        Notes: data.notes
      };

      const { data: res } = await api.put(`/transactions/${id}/`, payload);
      return res;

    } catch (error) {
      console.error("Error updating transaction:", error.response?.data || error.message);
      throw error;
    }
  },

  // ========================
  // DELETE
  // ========================
  deleteTransaction: async (id) => {
    try {
      if (!id) throw new Error("Transaction ID required");

      const { data } = await api.delete(`/transactions/${id}/`);
      return data;

    } catch (error) {
      console.error("Error deleting transaction:", error.response?.data || error.message);
      throw error;
    }
  }
};

export default transactionService;