import axios from 'axios';

// const API_URL = 'http://localhost:8080/api';
const API_URL = 'https://prism-backend-0mrt.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  signup: async (fullName, username, email, password) => {
    // Supplying multiple casing variations to guarantee the Go json unmarshaler grabs it regardless of struct tags
    const payload = {
      fullName,
      full_name: fullName,
      fullname: fullName,
      FullName: fullName,
      username,
      email,
      password
    };
    const response = await api.post('/auth/signup', payload);
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/me');
    return response.data;
  }
};

export default api;
