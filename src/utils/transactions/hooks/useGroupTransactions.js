import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { groupService, transactionsService } from '../../../services';

export const useGroupTransactions = (groupId) => {
  return useQuery({
    queryKey: ['transactions', 'group', groupId],
    queryFn: () => groupService.getTransactions(groupId),
    enabled: !!groupId,
  });
};

export const useCreateGroupTransaction = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => transactionsService.create(payload),
    onSuccess: (_, variables) => {
      // Invalidate both general group list and specific group transactions
      qc.invalidateQueries({ queryKey: ['transactions', 'group'] });
      if (variables.group_id) {
         qc.invalidateQueries({ queryKey: ['transactions', 'group', variables.group_id] });
      }
      // Also invalidate all transactions (ledger)
      qc.invalidateQueries({ queryKey: ['transactions', 'all'] });
    },
  });
};
