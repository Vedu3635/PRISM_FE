import axios from 'axios';

// const API_URL = 'http://localhost:8080/api';
const API_URL = 'https://prism-backend-0mrt.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Unauthorized
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear session on 401
      Cookies.remove('auth_token');
      Cookies.remove('user_data');
      // Optional: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
