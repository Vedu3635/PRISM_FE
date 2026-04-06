/**
 * Application Constants
 * ──────────────────────
 * Centralized configuration values used across the app.
 * All environment-specific values are read from .env via import.meta.env.
 */

// ── API ─────────────────────────────────────
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://prism-backend-0mrt.onrender.com/api';

// ── Storage Keys ────────────────────────────
export const STORAGE_KEYS = {
  TOKEN: 'prism_token',
  REFRESH_TOKEN: 'prism_refresh_token',
  USER: 'prism_user',
};

// ── Auth Endpoints ──────────────────────────
export const AUTH_ENDPOINTS = {
  TOKEN: '/auth/token/',
  SIGNUP: '/auth/signup/',
  SOCIAL_LOGIN: '/auth/social/',
  ME: '/me/',
};

// ── User / Profile Endpoints ────────────────
export const USER_ENDPOINTS = {
  PROFILE: '/me/',
  UPDATE_PROFILE: '/users/me/',
  DELETE_ACCOUNT: '/users/me/',
};

// ── Group Endpoints ─────────────────────────
export const GROUP_ENDPOINTS = {
  LIST: '/groups/',
  CREATE: '/groups/',
  BY_ID: (id) => `/groups/${id}/`,
  UPDATE: (id) => `/groups/${id}/`,
  DELETE: (id) => `/groups/${id}/`,
  BALANCES: (id) => `/groups/${id}/balances/`,
  LEAVE: (id) => `/groups/${id}/leave/`,
  TRANSACTIONS: (id) => `/groups/${id}/transactions/`,
  MEMBERS: (id) => `/groups/${id}/members/`,
  REMOVE_MEMBER: (id, memberId) => `/groups/${id}/members/${memberId}/`,
  USER_GROUPS: '/users/groups/',
};
