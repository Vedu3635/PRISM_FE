import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen w-full bg-background font-body text-white antialiased flex flex-col">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
