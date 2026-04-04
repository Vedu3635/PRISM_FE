import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const AuthenticatedLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { label: 'Transactions', icon: 'receipt_long', path: '/transactions' },
    { label: 'Analytics', icon: 'insights', path: '/analytics' },
    { label: 'AI Assistant', icon: 'magic_button', path: '/ai-insights' },
    { label: 'Strategic Goals', icon: 'flag', path: '/goals' },
    { label: 'Operational Budgets', icon: 'event_repeat', path: '/budgets' },
    { label: 'Notifications', icon: 'notifications', path: '/notifications' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-background font-body text-on-surface overflow-hidden">
      {/* Sidebar sidebar-container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-[240px] bg-surface-container border-r border-white/5 transition-transform duration-300 transform lg:relative lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full border-none">
          {/* Logo Section */}
          <div className="h-14 flex items-center px-6 border-b border-white/5">
            <span className="text-xl font-bold tracking-tight text-white">PRISM</span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-surface-container-highest text-white'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-white'
                }`}
              >
                <span className={`material-symbols-outlined text-[18px] transition-colors ${
                  isActive(item.path) ? 'text-white' : 'text-on-surface-variant group-hover:text-white'
                }`}>
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Profile / Bottom Actions */}
          <div className="p-3 mt-auto border-t border-white/5">
            <Link 
              to="/settings"
              className={`flex items-center gap-3 px-3 py-2 rounded-md mb-2 transition-colors ${
                isActive('/settings') ? 'bg-surface-container-highest text-white' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
              <span className="font-medium text-sm">Settings</span>
            </Link>
            
            <div className="bg-surface-container-low p-2 rounded-md flex items-center gap-3 border border-white/5">
              <div className="w-8 h-8 rounded bg-surface-container-highest border border-white/10 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white uppercase">AM</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">Architect Mode</p>
                <p className="text-[10px] text-on-surface-variant truncate">Premium Tier</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-background relative overflow-hidden">
        {/* Top interaction rail */}
        <header className="h-14 flex items-center justify-between px-6 bg-background border-b border-white/5 z-40">
           <div className="flex items-center gap-4">
              <button className="lg:hidden material-symbols-outlined text-on-surface-variant hover:text-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>menu</button>
              <div className="relative group hidden sm:block">
                 <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
                 <input 
                    className="bg-surface-container h-8 w-64 rounded-md pl-9 pr-3 text-xs font-medium text-white outline-none border border-transparent focus:border-white/20 transition-all placeholder:text-on-surface-variant" 
                    placeholder="Search your vault..."
                 />
              </div>
           </div>

           <div className="flex items-center gap-3">
              <Link 
                to="/notifications"
                className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-surface-container-high text-on-surface-variant hover:text-white relative transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">notifications</span>
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-error rounded-full border-2 border-background"></div>
              </Link>
           </div>
        </header>

        {/* Dynamic Page Content */}
        <section className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-30">
           <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
