import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { personalTransactionsApi } from '../api/personalTransactions';

const qk = {
  personalList: (filters) => ['transactions', 'personal', 'list', filters],
};

export const usePersonalTransactions = (filters) => {
  return useQuery({
    queryKey: qk.personalList(filters),
    queryFn: () => personalTransactionsApi.list(filters),
  });
};

export const useCreatePersonalTransaction = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => personalTransactionsApi.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['transactions', 'personal', 'list'] });
    },
  });
};

