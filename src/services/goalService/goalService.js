import api from '../api';

/**
 * Service to handle Goal-related operations.
 * Designed to be easily switchable between mock and real API.
 */
const goalService = {
  /**
   * Fetch all goals.
   */
  getGoals: async () => {
    // Mock data for initial development
    const mockGoals = [
      { id: '1', name: 'New Car', target: 1500000, current: 450000, deadline: '2026-12-31', color: 'bg-blue-500' },
      { id: '2', name: 'Emergency Fund', target: 500000, current: 200000, deadline: '2026-06-30', color: 'bg-emerald-500' },
      { id: '3', name: 'Europe Trip', target: 800000, current: 150000, deadline: '2027-04-15', color: 'bg-primary' },
    ];
    
    // Simulate API delay
    return new Promise(resolve => setTimeout(() => resolve(mockGoals), 500));
    
    // Real implementation (uncomment when ready):
    // const response = await api.get('/goals/');
    // return response.data;
  },

  /**
   * Create a new goal.
   */
  createGoal: async (goalData) => {
    console.log('Creating Goal:', goalData);
    return new Promise(resolve => setTimeout(() => resolve({ id: Date.now().toString(), ...goalData }), 500));
    
    // Real implementation:
    // const response = await api.post('/goals/', goalData);
    // return response.data;
  },

  /**
   * Get analytical data for goals.
   */
  getGoalAnalytics: async () => {
    const mockAnalytics = [
      { month: 'Jan', savings: 45000, target: 50000 },
      { month: 'Feb', savings: 52000, target: 50000 },
      { month: 'Mar', savings: 48000, target: 50000 },
      { month: 'Apr', savings: 61000, target: 50000 },
      { month: 'May', savings: 55000, target: 50000 },
      { month: 'Jun', savings: 67000, target: 50000 },
    ];
    return new Promise(resolve => setTimeout(() => resolve(mockAnalytics), 500));
  },

  /**
   * Get transactions specifically for goals.
   */
  getGoalTransactions: async () => {
    const mockTransactions = [
      { id: 'tx1', title: 'Monthly Car Fund', amount: 15000, date: '2026-04-10', category: 'Car', status: 'completed' },
      { id: 'tx2', title: 'Emergency Savings', amount: 10000, date: '2026-04-05', category: 'Emergency', status: 'completed' },
      { id: 'tx3', title: 'Europe Fund Deposit', amount: 5000, date: '2026-03-28', category: 'Travel', status: 'completed' },
    ];
    return new Promise(resolve => setTimeout(() => resolve(mockTransactions), 500));
  }
};

export default goalService;
