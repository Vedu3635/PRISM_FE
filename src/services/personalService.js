import apiClient from './apiClient';
import { request } from '../shared/api/request';

const personalService = {
  getCategories: async () => request(() => apiClient.get('/personal/categories')),
  getSummary: async () => request(() => apiClient.get('/personal/summary')),
  getTransactions: async ({ category, from, to } = {}) =>
    request(() =>
      apiClient.get('/personal/transactions', {
        params: { category, from, to },
      }),
    ),
  addTransaction: async (payload) =>
    request(() => apiClient.post('/personal/transactions', payload)),
  deleteTransaction: async (id) =>
    request(() => apiClient.delete(`/personal/transactions/${id}`)),
};

export default personalService;

