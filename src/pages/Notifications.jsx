import React from 'react';

const NotificationCard = ({ type, title, text, date, icon, colorClass }) => {
  // Map our old colorClasses to modern minimalist ones
  let dotColor = 'bg-primary';
  let iconColor = 'text-primary';
  let bgColor = 'bg-primary/10';
  
  if (type === 'security') {
     dotColor = 'bg-error';
     iconColor = 'text-error';
     bgColor = 'bg-error/10';
  } else if (type === 'budget') {
     dotColor = 'bg-warning';
     iconColor = 'text-warning';
     bgColor = 'bg-warning/10';
  } else if (type === 'system') {
     dotColor = 'bg-white';
     iconColor = 'text-white';
     bgColor = 'bg-white/10';
  }

  return (
    <div className="bg-surface-container border border-white/5 p-6 rounded-xl flex gap-5 items-start transition-colors hover:bg-surface-container-high group relative overflow-hidden">
       {/* Small left accent bar */}
       <div className={`absolute top-0 left-0 w-1 h-full ${dotColor} opacity-50`}></div>
       
       <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${bgColor}`}>
          <span className={`material-symbols-outlined text-[20px] ${iconColor}`}>{icon}</span>
       </div>
       <div className="flex-1">
          <div className="flex justify-between items-start mb-1.5">
             <h4 className="text-sm font-semibold text-white">{title}</h4>
             <span className="text-[11px] font-medium text-on-surface-variant whitespace-nowrap ml-4">{date}</span>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed mb-4">{text}</p>
          <div className="flex gap-4">
             <button className="text-xs font-semibold text-primary hover:text-white transition-colors">Acknowledge</button>
             {type === 'ai' && <button className="text-xs font-semibold text-black px-3 py-1.5 bg-primary rounded-md hover:bg-white transition-all">Optimize Now</button>}
          </div>
       </div>
    </div>
  );
};

const Notifications = () => {
  const alerts = [
    { 
      type: 'ai', 
      title: 'AI Insight: Subscription Optimization', 
      text: 'Our Prism AI detected overlapping services. You could save $140/mo by consolidating tech subscriptions and removing inactive licenses.',
      date: '2H AGO', 
      icon: 'psychology'
    },
    { 
      type: 'security', 
      title: 'Security: New Login Detected', 
      text: 'A new login was recorded from a Chrome browser on Windows in Seattle, WA. If this wasn\'t you, please secure your vault immediately.',
      date: '5H AGO', 
      icon: 'shield_person'
    },
    { 
      type: 'budget', 
      title: 'Budget: Dining Out Limit', 
      text: 'You\'ve reached 92% of your monthly dining budget. Prism suggests adjusting your limits or reducing non-essential spending for the next 4 days.',
      date: '1D AGO', 
      icon: 'account_balance_wallet'
    },
    { 
      type: 'system', 
      title: 'System: New Integration Available', 
      text: 'Prism now supports direct synchronization with over 20 new crypto exchanges including Kraken and Gemini.',
      date: '2D AGO', 
      icon: 'dynamic_feed'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-white/5 pb-6">
         <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Notifications</h1>
            <p className="text-on-surface-variant text-sm">Monitor your architecture for system shifts and yield opportunities.</p>
         </div>
         <button className="text-[11px] font-semibold text-on-surface-variant hover:text-white uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-white/10 px-3 py-1.5 rounded-md hover:bg-surface-container">
            <span className="material-symbols-outlined text-[16px]">done_all</span> Mark all read
         </button>
      </div>

      <div className="space-y-4">
         {alerts.map((alert, i) => (
           <NotificationCard key={i} {...alert} />
         ))}
      </div>

      <div className="pt-12 flex flex-col items-center justify-center text-center px-6">
         <div className="w-12 h-12 rounded-xl bg-surface-container border border-white/5 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-on-surface-variant text-[24px]">quiet_times</span>
         </div>
         <h3 className="text-base font-semibold text-white mb-1 tracking-tight">Silence is Golden</h3>
         <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm">
            Your vault is operating efficiently. No new critical system movements to report in the last 48 hours.
         </p>
      </div>

    </div>
  );
};

export default Notifications;
