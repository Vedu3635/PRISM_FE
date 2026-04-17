import api from '../api';
import groupService from '../groupService/groupService';

/**
 * Service to handle Budget-related operations.
 * Aligned with backend snake_case for payloads and camelCase for UI.
 */
const budgetService = {
  /**
   * Fetch all budgets.
   * Maps PascalCase/snake_case (Backend) -> camelCase (UI)
   */
  getBudgets: async () => {
    try {
      const response = await api.get('/budgets');
      const data = response.data || [];

      return data.map(b => ({
        id: b.id || b.ID,
        category: b.category || b.Category || "General",
        limit: parseFloat(b.limit || b.Limit || 0),
        spent: parseFloat(b.spent || b.Spent || 0), // Assuming backend provides this, or fetch from analytics
        period: b.period || b.Period || "monthly",
        startDate: b.start_date || b.startDate || b.StartDate,
        groupId: b.group_id || b.groupID || b.GroupID,
        createdAt: b.created_at || b.createdAt || b.CreatedAt,
        // Added for UI compatibility with existing dashboard
        name: b.category || "Untitled Budget",
        color: 'bg-primary' // Default color for new budgets
      }));
    } catch (error) {
      console.error("Error fetching budgets:", error.response?.data || error.message);
      return [];
    }
  },

  /**
   * Create a new budget limit.
   * Payload aligns with backend requirements: category, group_id, limit, period, start_date.
   */
  createBudget: async (budgetData) => {
    try {
      // 1. Resolve Group ID if not provided
      let groupId = budgetData.group_id || budgetData.groupId;
      if (!groupId) {
        const personalGroup = await groupService.getPersonalGroup();
        groupId = personalGroup?.id;
      }

      const payload = {
        category: budgetData.category,
        group_id: groupId,
        limit: parseFloat(budgetData.limit),
        period: budgetData.period || "monthly",
        start_date: new Date(budgetData.startDate || budgetData.start_date || new Date()).toISOString()
      };

      console.log("[budgetService] POST Payload:", payload);
      const response = await api.post('/budgets/', payload);
      return response.data;
    } catch (error) {
      console.error("Error creating budget:", error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Mock analytics for dashboard until backend supports it.
   */
  getBudgetAnalytics: async () => {
    const mockDistribution = [
      { name: 'Housing', value: 42000 },
      { name: 'Food', value: 12500 },
      { name: 'Transport', value: 9200 },
      { name: 'Entertainment', value: 1500 },
      { name: 'Others', value: 8700 },
    ];

    const mockTrend = [
      { week: 'Week 1', spent: 15000, budget: 20000 },
      { week: 'Week 2', spent: 22000, budget: 20000 },
      { week: 'Week 3', spent: 18000, budget: 20000 },
      { week: 'Week 4', spent: 25000, budget: 20000 },
    ];

    return new Promise(resolve => setTimeout(() => resolve({ distribution: mockDistribution, trend: mockTrend }), 500));
  }
};

export default budgetService;
