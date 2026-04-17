import React, { useState } from 'react';
import CreateGoalModal from '../components/modals/CreateGoalModal';

const MilestoneCard = ({ title, sub, target, current, percent }) => {
  return (
    <div className="bg-surface-container p-6 rounded-xl border border-white/5 relative overflow-hidden group transition-colors hover:bg-surface-container-high cursor-default">
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

const Goals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Strategic Goals</h1>
           <p className="text-sm text-on-surface-variant max-w-xl leading-relaxed">
             Long-term milestone tracking and capital allocation for your wealth architecture.
           </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-5 py-2.5 bg-primary text-black font-semibold rounded-lg text-sm hover:bg-white transition-colors flex items-center gap-2"
           >
              <span className="material-symbols-outlined text-[18px]">add_circle</span> New Milestone
           </button>
           <div className="flex items-center gap-4 p-4 bg-surface-container rounded-xl border border-white/5 border-l-2 border-l-primary">
              <div className="sm:text-right">
                 <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider mb-0.5">Portfolio Velocity</p>
                 <p className="text-xl font-bold text-white leading-none tnum">1.42x</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 hidden sm:flex">
                 <span className="material-symbols-outlined text-[20px] text-primary">automation</span>
              </div>
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

      {/* Prism Intelligence Card */}
      <div className="bg-surface-container border border-primary/20 p-6 rounded-xl relative overflow-hidden mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
         <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px] text-primary">psychology</span>
         </div>
         <div className="flex-1">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Maturity Analysis</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Based on historical trends, your <span className="text-white font-medium">Kyoto Residence</span> fund is outperforming targets. Prism suggests shifting <span className="text-white font-medium">$1,200/mo</span> to the Retirement Fund to maximize compound yield.
            </p>
         </div>
         <button className="w-full md:w-auto px-6 py-2.5 bg-primary text-black font-semibold text-xs rounded-md hover:bg-white transition-colors whitespace-nowrap">
            Optimize Portfolio
         </button>
      </div>

      {/* Modal */}
      <CreateGoalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
};

export default Goals;
