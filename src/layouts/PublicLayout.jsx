import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicLayout = () => {
  const { token } = useAuth();
  const location = useLocation();

  // If already logged in, prevent them from accessing login/signup forms
  if (token && (location.pathname === '/login' || location.pathname === '/signup')) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-background font-body text-white antialiased flex flex-col">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
