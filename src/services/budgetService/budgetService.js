import api from '../api';

/**
 * Service to handle Budget-related operations.
 */
const budgetService = {
  /**
   * Fetch all monthly budgets.
   */
  getBudgets: async () => {
    const mockBudgets = [
      { id: '1', name: 'Housing', limit: 45000, spent: 42000, color: 'bg-indigo-500' },
      { id: '2', name: 'Food & Dining', limit: 15000, spent: 12500, color: 'bg-orange-500' },
      { id: '3', name: 'Transportation', limit: 8000, spent: 9200, color: 'bg-rose-500' },
      { id: '4', name: 'Entertainment', limit: 5000, spent: 1500, color: 'bg-purple-500' },
      { id: '5', name: 'Utilities', limit: 10000, spent: 8700, color: 'bg-cyan-500' },
    ];
    return new Promise(resolve => setTimeout(() => resolve(mockBudgets), 500));
  },

  /**
   * Get budget analytics (Spend vs Limit distribution).
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
  },

  /**
   * Create a new budget limit.
   */
  createBudget: async (budgetData) => {
    console.log('Creating Budget:', budgetData);
    return new Promise(resolve => setTimeout(() => resolve({ id: Date.now().toString(), ...budgetData }), 500));
  }
};

export default budgetService;
