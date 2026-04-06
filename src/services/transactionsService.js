import apiClient from './apiClient';
import { request } from '../shared/api/request';

const transactionsService = {
  list: async () => request(() => apiClient.get('/transactions')),
  create: async (payload) => request(() => apiClient.post('/transactions', payload)),
  getById: async (id) => request(() => apiClient.get(`/transactions/${id}`)),
  update: async (id, payload) =>
    request(() => apiClient.put(`/transactions/${id}`, payload)),
  delete: async (id) => request(() => apiClient.delete(`/transactions/${id}`)),
};

export default transactionsService;

