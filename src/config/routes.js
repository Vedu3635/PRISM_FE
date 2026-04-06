/**
 * Route Paths
 * ────────────
 * Single source of truth for all navigation paths.
 * Import ROUTES anywhere you use <Link to={}> or navigate().
 */

export const ROUTES = {
  // ── Public ────────────────────────────────
  LANDING: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ONBOARDING: '/onboarding',
  FORGOT_PASSWORD: '/forgot',

  // ── Authenticated / Dashboard ─────────────
  DASHBOARD: '/dashboard',
  TRANSACTIONS: '/transactions',
  ANALYTICS: '/analytics',
  AI_INSIGHTS: '/ai-insights',
  GOALS: '/goals',
  BUDGETS: '/budgets',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
  GROUPS: '/groups',
  VAULT: '/vault',
};
