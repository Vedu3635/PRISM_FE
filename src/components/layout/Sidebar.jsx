import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  PieChart, 
  Target, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Brain
} from 'lucide-react';
import authService from '@/services/authService/authService';
import { cn } from '@/utils/cn';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Receipt, label: 'Transactions', path: '/transactions' },
  { icon: PieChart, label: 'Budgets', path: '/budgets' },
  { icon: Target, label: 'Goals', path: '/goals' },
  { icon: Users, label: 'Groups', path: '/groups' },
  { icon: PieChart, label: 'Analytics', path: '/analytics' },
  { icon: Brain, label: 'PRISM AI', path: '/ai-assistant' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="fixed left-0 top-0 z-40 h-screen border-r border-border/50 bg-card/30 backdrop-blur-xl flex flex-col transition-all duration-300 ease-in-out"
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 mb-8 mt-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-2 bg-primary rounded-xl shrink-0 shadow-lg shadow-primary/20">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xl font-black tracking-tighter whitespace-nowrap"
              >
                PRISM
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-semibold text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle & Logout */}
      <div className="px-4 py-6 border-t border-border/50 space-y-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full h-12 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 text-muted-foreground transition-all"
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : (
            <div className="flex items-center gap-2 px-4 w-full">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Collapse Sidebar</span>
            </div>
          )}
        </button>

        <button
          onClick={handleLogout}
          className={cn(
            "w-full h-12 flex items-center rounded-2xl bg-destructive/5 hover:bg-destructive/10 text-destructive border border-destructive/20 transition-all",
            isCollapsed ? "justify-center" : "px-4"
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 font-semibold text-sm whitespace-nowrap"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
