import apiClient from '../../../services/apiClient';
import { request } from '../../../shared/api/request';

const normalizePersonalListResponse = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.transactions)) return data.transactions;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.data)) return data.data;
  return [];
};

export const personalTransactionsApi = {
  list: async ({ category, from, to } = {}) => {
    const params = {};
    if (category) params.category = category;
    if (from) params.from = from;
    if (to) params.to = to;

    const data = await request(() => apiClient.get('/personal/transactions', { params }));
    return normalizePersonalListResponse(data);
  },

  create: async (payload) => {
    return request(() => apiClient.post('/personal/transactions', payload));
  },
};

