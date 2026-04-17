import React, { useState } from 'react';
import CreateBudgetModal from '../components/modals/CreateBudgetModal';

const OperationalBudget = ({ title, status, percent, colorClass, spent, limit }) => {
  return (
    <div className="p-6 bg-surface-container border border-white/5 rounded-xl flex flex-col gap-6 hover:bg-surface-container-high transition-colors">
       <div className="flex justify-between items-start">
          <div>
            <p className="text-base font-semibold text-white tracking-tight leading-tight">{title}</p>
            <p className={`text-[10px] font-semibold uppercase tracking-wider mt-1 ${colorClass}`}>
               {status}
            </p>
          </div>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass.replace('text-', 'bg-')}/10`}>
             <span className={`material-symbols-outlined text-[20px] ${colorClass}`}>shield</span>
          </div>
       </div>
       
       <div className="space-y-3">
          <div className="flex justify-between items-end tnum">
             <div>
                <span className="text-xl font-bold text-white">${spent.toLocaleString()}</span>
                <span className="text-[10px] text-on-surface-variant font-medium ml-1.5 uppercase tracking-wider">of ${limit.toLocaleString()}</span>
             </div>
             <span className="text-xs font-semibold text-on-surface-variant">{percent}%</span>
          </div>
          
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden shrink-0">
             <div 
               className={`h-full rounded-full transition-all duration-500 ${
                 status.includes('Alert') ? 'bg-error' : 
                 status.includes('Warning') ? 'bg-primary/80' : 'bg-primary'
               }`} 
               style={{ width: `${Math.min(percent, 100)}%` }}
             ></div>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 mt-auto">
          <button className="py-2.5 bg-surface-container-high hover:bg-surface-container-highest text-white font-semibold text-xs rounded-md transition-colors border border-white/5">
             Analyze
          </button>
          <button className="py-2.5 bg-white text-black font-semibold text-xs rounded-md hover:bg-neutral-200 transition-colors">
             Adjust
          </button>
       </div>
    </div>
  );
};

const Budgets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Operational Budgets</h1>
           <p className="text-sm text-on-surface-variant max-w-xl leading-relaxed">
             Tactical category management with AI Spending Shields and real-time velocity monitoring.
           </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-primary text-black font-semibold rounded-lg text-sm hover:bg-white transition-colors flex items-center gap-2"
        >
           <span className="material-symbols-outlined text-[18px]">add_circle</span> New Allocation
        </button>
      </div>

      {/* AI Context Card */}
      <div className="bg-surface-container border border-white/5 p-5 rounded-xl flex items-start sm:items-center gap-5 flex-col sm:flex-row">
         <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[24px]">insights</span>
         </div>
         <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-1">Architecture Shift Detected</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl">
              Prism has identified a <span className="text-white font-medium">12% decrease</span> in recurring infrastructure costs. Reallocating the resulting <span className="text-white font-medium">$842.50</span> to Travel is suggested.
            </p>
         </div>
         <button className="px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest text-white font-semibold text-xs rounded-md transition-colors border border-white/10 shrink-0 w-full sm:w-auto">
            Auto-Reallocate
         </button>
      </div>

      {/* Budget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <OperationalBudget 
            title="Dining & Lifestyle" 
            status="Warning: 84% Expended" 
            spent={1260} 
            limit={1500} 
            percent={84} 
            colorClass="text-primary" 
         />
         <OperationalBudget 
            title="Tech Subscriptions" 
            status="Healthy: 42% Expended" 
            spent={420} 
            limit={1000} 
            percent={42} 
            colorClass="text-primary" 
         />
         <OperationalBudget 
            title="Business Travel" 
            status="Alert: Limit Exceeded" 
            spent={4600} 
            limit={4000} 
            percent={115} 
            colorClass="text-error" 
         />
         <OperationalBudget 
            title="Fixed Luxuries" 
            status="Safe: 12% Expended" 
            spent={1200} 
            limit={10000} 
            percent={12} 
            colorClass="text-on-surface-variant" 
         />
      </div>

      {/* Modal */}
      <CreateBudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
};

export default Budgets;
