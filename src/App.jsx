import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, QueryProvider } from './app/providers';
import ReduxProvider from './utils/store/ReduxProvider';
import { ROUTES } from './config';
import PublicLayout from './layouts/PublicLayout';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import LandingPage from './features/landing/LandingPage';
import LoginPage from './features/auth/LoginPage';
import SignupPage from './features/auth/SignupPage';
import OnboardingPage from './features/auth/OnboardingPage';
import DashboardPage from './features/dashboard/DashboardPage';
import TransactionsPage from './features/transactions/TransactionsPage';
import GoalsPage from './features/goals/GoalsPage';
import BudgetsPage from './features/budgets/BudgetsPage';
import AnalyticsPage from './features/analytics/AnalyticsPage';
import AIAssistantPage from './features/ai-assistant/AIAssistantPage';
import NotificationsPage from './features/notifications/NotificationsPage';
import SettingsPage from './features/settings/SettingsPage';
import GroupsPage from './features/groups/GroupsPage';

function App() {
  return (
    <ReduxProvider>
      <QueryProvider>
        <AuthProvider>
          <BrowserRouter>
          <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.LANDING} element={<LandingPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
        </Route>

        {/* Protected Routes (Dashboard) */}
        <Route element={<AuthenticatedLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.TRANSACTIONS} element={<TransactionsPage />} />
          <Route path={ROUTES.GOALS} element={<GoalsPage />} />
          <Route path={ROUTES.BUDGETS} element={<BudgetsPage />} />
          <Route path={ROUTES.AI_INSIGHTS} element={<AIAssistantPage />} />
          <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
          <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
          <Route path={ROUTES.GROUPS} element={<GroupsPage />} />
          <Route path={ROUTES.VAULT} element={<DashboardPage />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
          </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}

export default App;
