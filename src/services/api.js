import axios from 'axios';
<<<<<<< HEAD
import Cookies from '../utils/cookieUtils';


const API_BASE_URL = 'https://prism-backend-0mrt.onrender.com/api';
// const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
=======

// const API_URL = 'http://localhost:8080/api';
const API_URL = 'https://prism-backend-0mrt.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
>>>>>>> main
  headers: {
    'Content-Type': 'application/json',
  },
});

<<<<<<< HEAD
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
=======
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
>>>>>>> main

export default api;
