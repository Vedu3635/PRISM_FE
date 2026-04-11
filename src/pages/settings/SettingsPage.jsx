import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import FeatureHeader from '@/components/commonUI/FeatureHeader';
import Loader from '@/components/commonUI/Loader';
import ConfirmationModal from '@/components/commonUI/ConfirmationModal';
import PaymentModal from '@/components/commonUI/PaymentModal';

import settingsService from '@/services/settingsService/settingsService';
import notificationService from '@/services/notificationService/notificationService';
import authService from '@/services/authService/authService';

import { 
  User, Bell, Database, Crown, Settings as SettingsIcon,
  Shield, Key, Trash2, Mail, Smartphone, Monitor,
  Upload, Download, FileText, CheckCircle2, Clock, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

const tabs = [
  { id: 'profile', label: 'User Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'data', label: 'Data Management', icon: Database },
  { id: 'subscription', label: 'Subscription', icon: Crown },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [pref, setPref] = useState({});
  const [subInfo, setSubInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modal States
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        const [notifs, preferences, subscription] = await Promise.all([
          notificationService.getNotifications(),
          notificationService.getPreferences(),
          settingsService.getSubscriptionInfo()
        ]);
        setUser(currentUser);
        setNotifications(notifs);
        setPref(preferences);
        setSubInfo(subscription);
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAction = (type) => {
    switch (type) {
      case 'reset-password':
        setConfirmConfig({
          title: 'Reset Password?',
          message: 'We will send a password reset link to your registered email address.',
          confirmText: 'Send Reset Link',
          isDestructive: false,
          onConfirm: () => settingsService.resetPassword(user.email)
        });
        setIsConfirmOpen(true);
        break;
      case 'delete-logs':
        setConfirmConfig({
          title: 'Delete Transaction Logs?',
          message: 'This action will permanently remove all transaction history. This cannot be undone.',
          confirmText: 'Delete Logs',
          isDestructive: true,
          onConfirm: () => alert('Logs Deleted (Mock)')
        });
        setIsConfirmOpen(true);
        break;
      case 'delete-db':
        setConfirmConfig({
          title: 'Delete Database?',
          message: 'DANGER: This will purge every single piece of data associated with your account. You will start with a fresh slate.',
          confirmText: 'Delete Everything',
          isDestructive: true,
          onConfirm: () => alert('Database Wiped (Mock)')
        });
        setIsConfirmOpen(true);
        break;
      case 'delete-user':
        setConfirmConfig({
          title: 'Terminate Account?',
          message: 'We are sad to see you go. Deleting your account is permanent and will remove all your financial records, groups, and settings.',
          confirmText: 'Delete Permanent',
          isDestructive: true,
          onConfirm: () => settingsService.deleteUser(user.id)
        });
        setIsConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  if (isLoading) return <AppLayout><div className="h-[80vh] flex items-center justify-center"><Loader text="Initializing your workspace..." /></div></AppLayout>;

  return (
    <AppLayout>
      <div className="space-y-10 pb-20">
        <FeatureHeader 
          title="Account Settings" 
          description="Manage your preferences, security, and digital workspace."
        />

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Navigation (Tabs) */}
          <aside className="w-full lg:w-72 shrink-0">
            <nav className="flex lg:flex-col gap-2 p-2 rounded-[32px] bg-card border border-border/50 overflow-x-auto lg:overflow-visible no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative whitespace-nowrap lg:whitespace-normal",
                    activeTab === tab.id 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  <tab.icon className={cn("h-5 w-5 shrink-0", activeTab === tab.id ? "text-primary-foreground" : "group-hover:text-primary transition-colors")} />
                  <span className="font-bold text-sm">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div layoutId="active-pill" className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-full hidden lg:block" />
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* Settings Section Content */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {activeTab === 'profile' && (
                  <ProfileSection user={user} onAction={handleAction} />
                )}
                {activeTab === 'notifications' && (
                  <NotificationSection notifications={notifications} pref={pref} onUpdate={notificationService.updatePreference} />
                )}
                {activeTab === 'data' && (
                  <DataSection onAction={handleAction} onExport={settingsService.exportData} />
                )}
                {activeTab === 'subscription' && (
                  <SubscriptionSection 
                    subInfo={subInfo} 
                    onAction={handleAction} 
                    onSelectPlan={(plan) => {
                      setSelectedPlan(plan);
                      setIsPaymentOpen(true);
                    }} 
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        {...confirmConfig}
      />

      <PaymentModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        planName={selectedPlan?.name}
        planPrice={selectedPlan?.price}
        onConfirm={() => alert('Subscription Updated!')}
      />
    </AppLayout>
  );
};

/* --- Sub-Sections Components --- */

const ProfileSection = ({ user, onAction }) => (
  <div className="space-y-6">
    <div className="p-8 rounded-[32px] bg-card border border-border/50">
      <div className="flex items-center gap-6 mb-10">
        <div className="relative">
          <div className="h-24 w-24 rounded-[32px] bg-primary/10 flex items-center justify-center text-4xl font-black text-primary border-4 border-background">
            {user?.name?.[0] || user?.email?.[0] || 'U'}
          </div>
          <button className="absolute -bottom-2 -right-2 p-3 rounded-2xl bg-primary text-primary-foreground shadow-xl border-4 border-background hover:scale-110 transition-transform">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight">{user?.name || 'User Profile'}</h2>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{user?.email || 'Guest User'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Display Name</label>
          <input defaultValue={user?.name} placeholder="Your Name" className="w-full h-14 px-6 rounded-2xl bg-white/5 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email Address</label>
          <input value={user?.email || ''} disabled className="w-full h-14 px-6 rounded-2xl bg-white/5 border border-border/50 text-muted-foreground font-mono text-xs cursor-not-allowed" />
        </div>
      </div>

      <button className="mt-8 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
        Save Profile
      </button>
    </div>

    <div className="p-8 rounded-[32px] bg-card border border-border/50">
      <h3 className="text-lg font-black tracking-tighter mb-6 flex items-center gap-2">
        <Shield className="h-5 w-5 text-emerald-500" /> Security & Privacy
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-4">
            <Key className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-black">Reset Password</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Update your security key</p>
            </div>
          </div>
          <button onClick={() => onAction('reset-password')} className="px-5 py-2 rounded-xl bg-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">Actions</button>
        </div>
        <div className="flex items-center justify-between p-4 rounded-2xl bg-destructive/5 border border-destructive/10 hover:bg-destructive/10 transition-colors">
          <div className="flex items-center gap-4">
            <Trash2 className="h-5 w-5 text-destructive" />
            <div>
              <p className="text-sm font-black text-destructive">Terminate Account</p>
              <p className="text-[10px] text-destructive/60 font-bold uppercase tracking-widest">This action is permanent</p>
            </div>
          </div>
          <button onClick={() => onAction('delete-user')} className="px-5 py-2 rounded-xl bg-destructive text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-destructive/20 hover:scale-105 transition-all">Delete</button>
        </div>
      </div>
    </div>
  </div>
);

const NotificationSection = ({ notifications, pref, onUpdate }) => {
  const [localPref, setLocalPref] = useState(pref);

  const toggle = (key) => {
    const newVal = !localPref[key];
    setLocalPref({ ...localPref, [key]: newVal });
    onUpdate(key, newVal);
  };

  const prefItems = [
    { key: 'inApp', label: 'Push Notifications', sub: 'Receive alerts in the app', icon: Smartphone },
    { key: 'email', label: 'Email Alerts', sub: 'Summaries and transaction reports', icon: Mail },
    { key: 'sms', label: 'SMS / Text Messages', sub: 'Immediate spend notifications', icon: Monitor },
  ];

  return (
    <div className="space-y-6">
      <div className="p-8 rounded-[32px] bg-card border border-border/50">
        <h3 className="text-lg font-black tracking-tighter mb-8">Recent Alerts</h3>
        <div className="space-y-4">
          {notifications.map(notif => (
            <div key={notif.id} className="flex gap-4 p-5 rounded-[24px] bg-white/5 border border-border/30 hover:bg-white/10 transition-all group">
              <div className={cn(
                "p-3 rounded-2xl h-fit transition-transform group-hover:scale-110",
                notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 
                notif.type === 'warning' ? 'bg-rose-500/10 text-rose-500' : 'bg-primary/10 text-primary'
              )}>
                <Bell className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-black text-sm">{notif.title}</p>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{notif.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{notif.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-[32px] bg-card border border-border/50">
        <h3 className="text-lg font-black tracking-tighter mb-8">Delivery Preferences</h3>
        <div className="space-y-4">
          {prefItems.map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 text-muted-foreground">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{item.sub}</p>
                </div>
              </div>
              <button 
                onClick={() => toggle(item.key)}
                className={cn(
                  "w-12 h-6 rounded-full p-1 transition-all duration-300 relative",
                  localPref[item.key] ? "bg-primary" : "bg-white/10"
                )}
              >
                <div className={cn(
                  "w-4 h-4 bg-white rounded-full transition-transform duration-300",
                  localPref[item.key] ? "translate-x-6" : "translate-x-0"
                )} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DataSection = ({ onAction, onExport }) => (
  <div className="space-y-6">
    <div className="p-8 rounded-[32px] bg-card border border-border/50">
      <h3 className="text-lg font-black tracking-tighter mb-8 flex items-center gap-2">
        <Upload className="h-5 w-5 text-primary" /> Data Operations
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="flex items-center gap-4 p-5 rounded-[24px] bg-white/5 border border-border/30 hover:bg-white/10 transition-all text-left">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500"><FileText className="h-5 w-5" /></div>
          <div>
            <p className="text-sm font-black uppercase tracking-tighter">Bulk Upload</p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">CSV / XLSX statements</p>
          </div>
        </button>
        <button className="flex items-center gap-4 p-5 rounded-[24px] bg-white/5 border border-border/30 hover:bg-white/10 transition-all text-left">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500"><Download className="h-5 w-5" /></div>
          <div>
            <p className="text-sm font-black uppercase tracking-tighter text-cyan-500">Export Ledger</p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Download full history</p>
          </div>
        </button>
      </div>

      <div className="mt-8 space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Export As</p>
        <div className="flex flex-wrap gap-2">
          {['csv', 'json', 'pdf'].map(fmt => (
            <button 
              key={fmt} 
              onClick={() => onExport(fmt)}
              className="px-6 py-2 rounded-xl bg-white/5 border border-border/50 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground hover:border-transparent transition-all"
            >
              .{fmt}
            </button>
          ))}
        </div>
      </div>
    </div>

    <div className="p-8 rounded-[32px] bg-destructive/5 border border-destructive/10">
      <div className="flex items-center gap-3 mb-8">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <h3 className="text-lg font-black tracking-tighter text-destructive">Administrative Operations</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button onClick={() => onAction('delete-logs')} className="p-5 rounded-[24px] border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 text-left transition-all">
          <p className="text-sm font-black text-destructive uppercase tracking-tighter">Wipe Transaction Logs</p>
          <p className="text-[10px] text-destructive/60 font-bold uppercase tracking-widest mt-1">Clears history only</p>
        </button>
        <button onClick={() => onAction('delete-db')} className="p-5 rounded-[24px] bg-destructive text-white shadow-xl shadow-destructive/20 hover:scale-[1.02] active:scale-95 text-left transition-all">
          <p className="text-sm font-black uppercase tracking-tighter">Nuke Database</p>
          <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest mt-1">Full reset (Careful!)</p>
        </button>
      </div>
    </div>
  </div>
);

const SubscriptionSection = ({ subInfo, onSelectPlan, onAction }) => {
  const plans = [
    { name: 'Basic', price: 'Free', features: ['Unlimited Transactions', 'Manual Categories', 'Personal Goals'] },
    { name: 'Pro', price: '₹ 499/mo', features: ['AI Analytics', 'Smart Budgets', 'Group Splitting', 'Priority Support'], highlighted: true },
    { name: 'Ultimate', price: '₹ 999/mo', features: ['Family Manager', 'Multi-device Sync', 'Advanced OCR', 'Early Access'] },
  ];

  return (
    <div className="space-y-6">
      {/* Current Subscription Status */}
      <div className="p-8 rounded-[40px] bg-card border border-primary/30 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-[28px] bg-primary text-primary-foreground shadow-2xl shadow-primary/40">
              <Crown className="h-8 w-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-black tracking-tighter">PRISM {subInfo?.current || 'Basic'}</h2>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Active</span>
              </div>
              <p className="text-sm font-black text-muted-foreground mt-1 uppercase tracking-widest flex items-center gap-2">
                <Clock className="h-3 w-3" /> {subInfo?.expiresAt ? `Ends in ${subInfo.expiresAt}` : 'Subscription active'}
              </p>
            </div>
          </div>
          <button onClick={() => onAction('cancel-subscription')} className="px-8 py-3 rounded-2xl bg-white/5 border border-border/50 text-[10px] font-black hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all uppercase tracking-widest">Cancel Plan</button>
        </div>
      </div>

      {/* Available Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <motion.div 
            key={plan.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "p-8 rounded-[32px] border flex flex-col transition-all duration-500",
              plan.highlighted ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 border-transparent scale-105 z-10" : "bg-card border-border/50 hover:border-primary/50"
            )}
          >
            <h4 className="text-lg font-black tracking-tighter mb-2">{plan.name}</h4>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-black font-mono tracking-tighter">{plan.price.split(' ')[0]}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{plan.price.split(' ')[1]}</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-xs font-bold tracking-tight">
                  <CheckCircle2 className={cn("h-4 w-4 shrink-0", plan.highlighted ? "text-primary-foreground" : "text-primary")} />
                  {f}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => onSelectPlan(plan)}
              className={cn(
                "w-full py-4 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] active:scale-95",
                plan.highlighted ? "bg-white text-primary shadow-xl" : "bg-white/5 border border-border/50 text-foreground"
              )}
            >
              {plan.name === subInfo?.current ? 'Current Plan' : 'Apply Now'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
