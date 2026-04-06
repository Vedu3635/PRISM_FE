import { useQuery } from '@tanstack/react-query';
import { personalTransactionsApi } from '../api/personalTransactions';
import { transactionsService, groupService } from '../../../services';

export const useAllTransactions = (filters = {}) => {
  return useQuery({
    queryKey: ['transactions', 'all', filters],
    queryFn: async () => {
      // Fetch data in parallel
      const [personal, groupList, groups] = await Promise.all([
        personalTransactionsApi.list(filters).catch(() => []),
        transactionsService.list().catch(() => []),
        groupService.getUserGroups().catch(() => []),
      ]);

      const groupMap = (groups || []).reduce((acc, g) => {
        acc[g.id] = g.name;
        return acc;
      }, {});

      // Normalize personal transactions
      const normalizedPersonal = (personal || []).map(tx => ({
        ...tx,
        source: 'Personal',
        type: 'personal',
      }));

      // Normalize group transactions
      const normalizedGroup = (groupList || []).map(tx => ({
        ...tx,
        source: groupMap[tx.group_id] || 'Group Expense',
        type: 'group',
      }));

      // Combine and sort by date descending
      const combined = [...normalizedPersonal, ...normalizedGroup].sort((a, b) => {
        const dateA = new Date(a.transacted_at || a.transactedAt || a.created_at || a.date || 0);
        const dateB = new Date(b.transacted_at || b.transactedAt || b.created_at || b.date || 0);
        return dateB - dateA;
      });

      return combined;
    },
  });
};
