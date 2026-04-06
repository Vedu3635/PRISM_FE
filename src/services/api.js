/**
 * Legacy API compatibility shim
 * ──────────────────────────────
 * Maintained for backward compatibility.
 * New code should import from '../services' or '../services/authService' directly.
 */
import apiClient from './apiClient';
import authService from './authService';

export { authService };
export default apiClient;
