/**
 * Service to handle data aggregation for the Analytics dashboard.
 * Provides mock data for various visualization types.
 */
const analyticsService = {
  /**
   * Returns a list of available analysis widgets that a user can add.
   */
  getAvailableAnalyses: () => [
    { id: 'cat-01', title: 'Spending by Category', type: 'pie', description: 'Distribution of expenses across categories' },
    { id: 'trend-01', title: 'Monthly Burn Rate', type: 'line', description: 'Spending trend over the last 6 months' },
    { id: 'goal-01', title: 'Savings Momentum', type: 'area', description: 'Accumulated savings vs target goals' },
    { id: 'dist-01', title: 'Expense Distribution', type: 'histogram', description: 'Frequency distribution of transaction amounts' },
    { id: 'comp-01', title: 'Budget vs Actual', type: 'bar', description: 'Comparison of planned vs real spending' },
    { id: 'predict-01', title: 'Future Projection', type: 'line', description: 'AI-driven spending forecast for next month' },
  ],

  /**
   * Fetches data for a specific analysis type.
   */
  getAnalysisData: async (id, filters = {}) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    switch (id) {
      case 'cat-01':
        return [
          { name: 'Food', value: 4500, color: '#f87171' },
          { name: 'Rent', value: 15000, color: '#818cf8' },
          { name: 'Entertainment', value: 2000, color: '#fbbf24' },
          { name: 'Transport', value: 3200, color: '#34d399' },
          { name: 'Misc', value: 1200, color: '#94a3b8' },
        ];
      case 'trend-01':
        return [
          { month: 'Jan', amount: 22000 },
          { month: 'Feb', amount: 19000 },
          { month: 'Mar', amount: 25000 },
          { month: 'Apr', amount: 21000 },
          { month: 'May', amount: 28000 },
          { month: 'Jun', amount: 24000 },
        ];
      case 'predict-01':
        return [
          { month: 'Jun', amount: 24000, type: 'actual' },
          { month: 'Jul', amount: 26000, type: 'predicted' },
          { month: 'Aug', amount: 23500, type: 'predicted' },
        ];
      case 'comp-01':
        return [
          { category: 'Food', budget: 4000, actual: 4500 },
          { category: 'Rent', budget: 15000, actual: 15000 },
          { category: 'Ent', budget: 3000, actual: 2000 },
          { category: 'Shop', budget: 5000, actual: 1200 },
        ];
      default:
        return [];
    }
  }
};

export default analyticsService;
