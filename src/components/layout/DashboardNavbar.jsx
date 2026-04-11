import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  X, 
  Command,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import authService from '@/services/authService/authService';

const DashboardNavbar = ({ onMenuClick }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/50 bg-background/30 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button 
          onClick={onMenuClick}
          className="p-2 rounded-xl text-muted-foreground hover:bg-white/5 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search Bar */}
        <div className="hidden items-center group md:flex">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="Search features, groups, transactions..." 
              className="h-10 w-[300px] lg:w-[400px] rounded-2xl bg-white/5 border border-border/50 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-border/50 bg-white/5 text-[10px] font-medium text-muted-foreground">
              <Command className="h-2.5 w-2.5" />
              <span>K</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Add Button */}
        <button className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
          <Plus className="h-4 w-4" />
          <span>New Transaction</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2.5 rounded-2xl bg-white/5 border border-border/50 text-muted-foreground hover:bg-white/10 hover:text-white transition-all">
            <Bell className="h-5 w-5" />
          </button>
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background ring-offset-2 ring-offset-background animate-pulse" />

        </div>

        {/* User Profile */}
        <div className="h-8 w-px bg-border/50 mx-2 hidden sm:block" />
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none">{user?.name || 'User'}</p>
            <p className="text-[10px] text-muted-foreground mt-1 capitalize">{user?.roles?.[0] || 'Premium Member'}</p>
          </div>
          <div className="h-10 w-10 rounded-2xl border-2 border-primary/20 p-0.5 shadow-xl">
             {user?.photoURL ? (
               <img src={user.photoURL} alt="Avatar" className="h-full w-full rounded-[14px] object-cover" />
             ) : (
               <div className="h-full w-full rounded-[14px] bg-linear-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                 {user?.name?.[0] || 'U'}
               </div>
             )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
