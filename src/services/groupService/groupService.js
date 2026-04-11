import api from '../api';

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
  },

  /**
   * Helper to find the user's "Personal" group.
   */
  getPersonalGroup: async () => {
    const groups = await groupService.getGroups();
    return groups[0]; // For static dev, return first
  },

  /**
   * Create a new group.
   */
  createGroup: async (groupData) => {
    console.log('Creating Group:', groupData);
    return new Promise(resolve => setTimeout(() => resolve({ id: Date.now().toString(), ...groupData }), 500));
  },

  /**
   * Join a group using an invitation code.
   */
  joinGroup: async (code) => {
    console.log('Joining Group with Code:', code);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (code === 'ERROR') reject(new Error('Invalid Invitation Code'));
        else resolve({ id: 'g_new', name: 'Joint Venture', status: 'active' });
      }, 800);
    });
  },

  /**
   * Invite person to group.
   */
  invitePeople: async (groupId, email) => {
    console.log(`Inviting ${email} to Group ${groupId}`);
    return new Promise(resolve => setTimeout(resolve, 500));
  },

  /**
   * Get transactions for a specific group.
   */
  getGroupTransactions: async (groupId) => {
    const mockGroupTxs = [
      { id: 'gt1', title: 'Groceries (Rent)', amount: 2500, date: '2026-04-10', category: 'Food', paidBy: 'Rahul' },
      { id: 'gt2', title: 'Electricity Bill', amount: 4500, date: '2026-04-05', category: 'Utilities', paidBy: 'You' },
      { id: 'gt3', title: 'Weekend Party', amount: 12000, date: '2026-04-02', category: 'Fun', paidBy: 'Jay' },
    ];
    return new Promise(resolve => setTimeout(() => resolve(mockGroupTxs), 500));
  }
};

export default groupService;
