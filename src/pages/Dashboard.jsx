import React, { useState } from 'react';
import AddTransactionModal from '../components/modals/AddTransactionModal';
import CreateBudgetModal from '../components/modals/CreateBudgetModal';
import CreateGoalModal from '../components/modals/CreateGoalModal';

const Dashboard = () => {
  const [isTxOpen, setIsTxOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isGoalOpen, setIsGoalOpen] = useState(false);

  // Dynamic placeholders for future API binding
  const netWorth = 1245890.34;
  const inflows = 42500;
  const outflows = 18200;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex-1">
          <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Total Liquidity</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none tnum">
            ${netWorth.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h1>
          <div className="flex items-center gap-2 text-primary mt-3">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span className="text-sm font-medium">+$12,450.00 (1.2%) this month</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 w-full md:w-auto">
           <div className="flex gap-4">
              <div className="flex-1 md:w-32 bg-surface-container border border-white/5 p-4 rounded-xl">
                 <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Inflow</p>
                 <p className="text-xl font-semibold text-white tnum">${(inflows/1000).toFixed(1)}k</p>
              </div>
              <div className="flex-1 md:w-32 bg-surface-container border border-white/5 p-4 rounded-xl">
                 <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Outflow</p>
                 <p className="text-xl font-semibold text-white tnum">${(outflows/1000).toFixed(1)}k</p>
              </div>
           </div>
           
           {/* Quick Actions Hub */}
           <div className="flex gap-2">
              <button 
                onClick={() => setIsTxOpen(true)} 
                className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/5 text-white text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5"
              >
                 <span className="material-symbols-outlined text-[16px]">add</span> Entry
              </button>
              <button 
                onClick={() => setIsBudgetOpen(true)} 
                className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/5 text-white text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5"
              >
                 <span className="material-symbols-outlined text-[16px]">shield</span> Budget
              </button>
              <button 
                onClick={() => setIsGoalOpen(true)} 
                className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/5 text-white text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5"
              >
                 <span className="material-symbols-outlined text-[16px]">flag</span> Goal
              </button>
           </div>
        </div>
      </div>

      {/* Modals */}
      <AddTransactionModal isOpen={isTxOpen} onClose={() => setIsTxOpen(false)} />
      <CreateBudgetModal isOpen={isBudgetOpen} onClose={() => setIsBudgetOpen(false)} />
      <CreateGoalModal isOpen={isGoalOpen} onClose={() => setIsGoalOpen(false)} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Visualization Container */}
        <div className="lg:col-span-2 bg-surface-container border border-white/5 p-6 rounded-xl flex flex-col min-h-[360px]">
           <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-base font-semibold text-white">Net Worth Projector</h3>
                <p className="text-xs text-on-surface-variant mt-1">12-Month Performance</p>
              </div>
              <div className="flex bg-surface-container-high p-0.5 rounded-md border border-white/5">
                 <button className="px-2.5 py-1 text-xs text-on-surface-variant font-medium hover:text-white transition-colors">Daily</button>
                 <button className="px-2.5 py-1 bg-white/10 text-xs text-white shadow-sm font-medium rounded transition-colors">Monthly</button>
              </div>
           </div>

           {/* Chart Placeholder Structure */}
           <div className="flex-1 flex items-end gap-2 relative mt-4">
              <div className="absolute inset-0 flex flex-col justify-between py-1 border-l border-white/10">
                 {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full border-t border-white/5"></div>
                 ))}
              </div>
              
              {/* Minimalist Bar Chart */}
              {[35, 42, 38, 50, 65, 55, 72, 85, 80, 95, 88, 100].map((h, i) => (
                <div key={i} className="group relative flex-1 flex flex-col items-center justify-end h-full z-10">
                   <div 
                     className="w-full max-w-[32px] bg-primary/20 hover:bg-primary/40 rounded-t-[2px] border-t-2 border-primary transition-colors cursor-pointer" 
                     style={{ height: `${h}%` }}
                   ></div>
                   <span className="text-[9px] font-medium text-on-surface-variant mt-3 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6">M{i+1}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Intelligence Panel */}
        <div className="flex flex-col gap-6">
           <div className="p-5 rounded-xl bg-surface-container border border-white/5 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                 <div className="w-8 h-8 rounded border border-white/10 bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px] text-white">psychology</span>
                 </div>
                 <span className="text-[10px] px-2 py-0.5 bg-primary/20 text-primary font-semibold rounded uppercase tracking-wider">Opportunity</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">Automated Tax Strategy</h3>
              <p className="text-xs text-on-surface-variant mb-5 line-clamp-3">Your capital positions allow for an immediate tax-loss harvesting simulation of <span className="text-primary font-medium">+$3.4k</span>.</p>
              <button className="mt-auto w-full py-2 bg-white text-black font-semibold rounded-md hover:bg-neutral-200 transition-colors text-xs">Execute Strategy</button>
           </div>

           <div className="p-5 rounded-xl bg-surface-container border border-white/5 flex-1">
              <h4 className="text-xs font-semibold text-on-surface-variant mb-4 uppercase tracking-wider">System Alerts</h4>
              <div className="space-y-1">
                 <div className="flex items-start gap-3 p-2 -mx-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 shrink-0"></div>
                    <div>
                       <p className="text-xs text-white font-medium">Unexpected Withdrawal</p>
                       <p className="text-[10px] text-on-surface-variant mt-0.5">Bank of America • -$1,240</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3 p-2 -mx-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                    <div>
                       <p className="text-xs text-white font-medium">Vault Security Pulse</p>
                       <p className="text-[10px] text-on-surface-variant mt-0.5">Systems Active [SECURE]</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'Active Vaults', value: '4 Assets', icon: 'account_balance' },
           { label: 'System Efficiency', value: '98.4%', icon: 'bolt' },
           { label: 'Risk Profile', value: 'Low Core', icon: 'verified' },
           { label: 'Net Saving', value: '+$4.2k', icon: 'savings' }
         ].map((stat, i) => (
           <div key={i} className="bg-surface-container border border-white/5 p-4 rounded-xl flex items-center gap-4 transition-colors hover:bg-surface-container-high cursor-default">
              <div className="w-10 h-10 rounded border border-white/10 bg-surface-container-highest flex items-center justify-center">
                 <span className="material-symbols-outlined text-[18px] text-on-surface-variant">{stat.icon}</span>
              </div>
              <div>
                 <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">{stat.label}</p>
                 <p className="text-sm font-semibold text-white mt-0.5 tnum">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Dashboard;
