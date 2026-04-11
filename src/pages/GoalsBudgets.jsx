import React from 'react';

const MilestoneCard = ({ title, sub, target, current, percent }) => {
  return (
    <div className="bg-surface-container border border-white/5 p-6 rounded-xl relative overflow-hidden group transition-colors hover:bg-surface-container-high cursor-default">
      <div className="flex justify-between items-start mb-8">
         <div>
            <h3 className="text-xl font-bold text-white tracking-tight leading-tight mb-1">{title}</h3>
            <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">{sub}</p>
         </div>
         <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-primary">flag</span>
         </div>
      </div>
      
      <div className="space-y-3">
         <div className="flex justify-between items-end">
            <div className="tnum">
               <span className="text-2xl font-bold text-white">${current.toLocaleString()}</span>
               <span className="text-[10px] text-on-surface-variant font-medium ml-1.5 uppercase tracking-wider">of ${target.toLocaleString()}</span>
            </div>
            <span className="text-sm font-bold text-primary tnum">{percent}%</span>
         </div>
         
         <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden relative shrink-0">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500" 
              style={{ width: `${percent}%` }}
            ></div>
         </div>
      </div>

      <button className="w-full mt-6 py-2.5 bg-surface-container-high hover:bg-surface-container-highest text-white font-semibold text-xs rounded-md transition-colors border border-white/5">
         View Strategy
      </button>
    </div>
  );
};

const OperationalBudget = ({ title, status, percent, colorClass }) => {
  return (
    <div className="bg-surface-container p-5 rounded-xl border border-white/5 flex flex-col gap-4 hover:bg-surface-container-high transition-colors">
       <div>
          <p className="text-sm font-semibold text-white mb-1.5">{title}</p>
          <span className={`text-[10px] font-semibold uppercase tracking-wider ${colorClass}`}>
             {status}
          </span>
       </div>
       <div className="space-y-2 mt-auto">
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden shrink-0">
             <div 
               className={`h-full rounded-full transition-all duration-500 ${
                 status === 'Alert: Limit Exceeded' ? 'bg-error' : 
                 status === 'Warning: 84% Expended' ? 'bg-primary/80' : 'bg-primary'
               }`} 
               style={{ width: `${Math.min(percent, 100)}%` }}
             ></div>
          </div>
          <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">{percent}% Expended</p>
       </div>
    </div>
  );
};

const GoalsBudgets = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Wealth Objectives</h1>
           <p className="text-sm text-on-surface-variant max-w-xl leading-relaxed">
             Strategic allocation and milestone tracking for the Obsidian portfolio architecture.
           </p>
        </div>
        <div className="flex items-center gap-4 p-4 bg-surface-container rounded-xl border border-white/5 border-l-2 border-l-primary w-full md:w-auto mt-4 md:mt-0">
           <div className="md:text-right flex-1 md:flex-initial">
              <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider mb-0.5">Portfolio Velocity</p>
              <p className="text-xl font-bold text-white leading-none tnum">1.42x</p>
           </div>
           <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px] text-primary">automation</span>
           </div>
        </div>
      </div>

      {/* Strategic Milestones */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <MilestoneCard 
           title="Retirement Fund"
           sub="Aggressive Growth Strategy"
           target={2500000}
           current={1625000}
           percent={65}
         />
         <MilestoneCard 
           title="Kyoto Residence"
           sub="Real Estate Objective"
           target={450000}
           current={351000}
           percent={78}
         />
      </section>

      {/* Budgets & Intelligence Panel */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Operational Tracker */}
         <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between px-1">
               <h3 className="text-lg font-semibold text-white tracking-tight">Operational Budgets</h3>
               <button className="text-xs font-semibold text-primary flex items-center gap-1.5 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[16px]">add_circle</span> New Allocation
               </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <OperationalBudget title="Dining & Lifestyle" status="Warning: 84% Expended" percent={84} colorClass="text-primary" />
               <OperationalBudget title="Tech Subscriptions" status="Healthy: 42% Expended" percent={42} colorClass="text-primary" />
               <OperationalBudget title="Business Travel" status="Alert: Limit Exceeded" percent={115} colorClass="text-error" />
            </div>
         </div>

         {/* PRISM Intelligence Panel */}
         <div className="bg-surface-container border border-primary/20 p-6 rounded-xl flex flex-col justify-between">
            <div className="mb-8">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                     <span className="material-symbols-outlined text-[20px] text-primary">psychology</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">PRISM AI Optimizer</h4>
               </div>
               <p className="text-sm text-on-surface-variant leading-relaxed">
                 Based on current velocity, you'll reach your <span className="text-white font-medium">House Fund goal</span> 2 months early by reallocating <span className="text-white font-medium">$150</span> from Dining.
               </p>
            </div>

            <div className="space-y-3">
               <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface border border-white/5">
                  <div className="flex gap-3 items-center">
                     <span className="material-symbols-outlined text-on-surface-variant text-[18px]">notifications_active</span>
                     <p className="text-[10px] font-semibold text-white uppercase tracking-wider">Smart Alerts</p>
                  </div>
                  <div className="w-10 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                     <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                  </div>
               </div>
               <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                   <div className="flex gap-3 items-center">
                     <span className="material-symbols-outlined text-on-surface-variant text-[18px]">cached</span>
                     <p className="text-[10px] font-semibold text-white uppercase tracking-wider">Auto-Contribute</p>
                  </div>
                  <div className="w-10 h-6 bg-surface-container-highest rounded-full relative p-1">
                     <div className="w-4 h-4 bg-on-surface-variant rounded-full"></div>
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default GoalsBudgets;
