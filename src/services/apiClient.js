/**
 * Axios API Client
 * ──────────────────
 * Shared Axios instance with base URL and auth interceptor.
 * All service modules import this instead of creating their own.
 */
import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '../config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 s
  // Follow redirects and preserve method (prevents 307 issues)
  maxRedirects: 5,
});

// ── Request interceptor: attach Bearer token ──
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor: handle token errors + normalise ──
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 1. Handle 401/403 - usually means token expired or invalid
    if (error.response?.status === 401 || error.response?.status === 403) {
       // Clear local session — context will pick this up or redirect to login
       localStorage.removeItem(STORAGE_KEYS.TOKEN);
       localStorage.removeItem(STORAGE_KEYS.USER);
       
       // Force reload if not on login/signup/landing
       const { pathname } = window.location;
       if (!['/login', '/signup', '/onboarding', '/'].includes(pathname)) {
          window.location.href = '/login?expired=true';
       }
    }

    // 2. Handle 307 Temporary Redirect — follow the redirect with same method & body
    if (error.response?.status === 307 && error.response.headers?.location) {
      const redirectUrl = error.response.headers.location;
      const originalConfig = error.config;

      // Prevent infinite redirect loops
      originalConfig._redirectCount = (originalConfig._redirectCount || 0) + 1;
      if (originalConfig._redirectCount > 3) {
        return Promise.reject(error);
      }

      // Re-issue the request to the redirect target
      return apiClient.request({
        ...originalConfig,
        url: redirectUrl,
        baseURL: '', // location header is usually absolute
      });
    }

    // 3. Normalise error message for UI consumption
    const serverMsg = error.response?.data?.error || error.response?.data?.message;
    if (serverMsg) {
      error.message = serverMsg;
    }
    
    return Promise.reject(error);
  },
);

export default apiClient;
