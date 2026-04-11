import api from '../api';

/**
 * Service to handle user settings, profile updates, and data management.
 */
const settingsService = {
  /**
   * Update user profile information.
   */
  updateProfile: async (profileData) => {
    console.log('Updating Profile:', profileData);
    return new Promise(resolve => setTimeout(() => resolve({ success: true, user: profileData }), 800));
  },

  /**
   * Request a password reset.
   */
  resetPassword: async (email) => {
    console.log('Resetting Password for:', email);
    return new Promise(resolve => setTimeout(resolve, 1000));
  },

  /**
   * Delete the entire user account.
   */
  deleteUser: async (userId) => {
    console.log('Deleting User Account:', userId);
    return new Promise(resolve => setTimeout(resolve, 1500));
  },

  /**
   * Export user data in different formats.
   */
  exportData: async (format = 'json') => {
    console.log('Exporting Data as:', format);
    return new Promise(resolve => setTimeout(() => {
      alert(`Data exported successfully as ${format.toUpperCase()}`);
      resolve(true);
    }, 1200));
  },

  /**
   * Manage user subscriptions.
   */
  getSubscriptionInfo: async () => {
    return {
      current: 'Pro',
      expiresAt: '2026-10-15',
      autoRenew: true,
      price: '₹ 499/mo'
    };
  },

  updateSubscription: async (plan, paymentData) => {
    console.log(`Updating to ${plan} plan with:`, paymentData);
    return new Promise(resolve => setTimeout(resolve, 2000));
  },

  cancelSubscription: async () => {
    console.log('Canceling Subscription');
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
};

export default settingsService;
