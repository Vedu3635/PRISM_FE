/**
 * Service to handle notification lists and preferences.
 */
const notificationService = {
  /**
   * Fetch recent notifications.
   */
  getNotifications: async () => {
    const mockNotifications = [
      { id: 'n1', title: 'Payment Successful', message: 'Your payment of ₹ 1,500 for Rent was successful.', time: '2h ago', type: 'success' },
      { id: 'n2', title: 'Limit Warning', message: 'You have reached 90% of your Food budget.', time: '5h ago', type: 'warning' },
      { id: 'n3', title: 'Group Invite', message: 'Rahul invited you to Apartment 502 group.', time: 'Yesterday', type: 'info' },
    ];
    return new Promise(resolve => setTimeout(() => resolve(mockNotifications), 600));
  },

  /**
   * Get notification preferences.
   */
  getPreferences: async () => {
    return {
      inApp: true,
      email: true,
      sms: false,
      browser: true
    };
  },

  /**
   * Update preferences.
   */
  updatePreference: async (key, value) => {
    console.log(`Updating preference ${key} to ${value}`);
    return new Promise(resolve => setTimeout(resolve, 300));
  }
};

export default notificationService;
