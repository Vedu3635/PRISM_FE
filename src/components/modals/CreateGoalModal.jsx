import React, { useState } from 'react';
import Modal from '../Modal';

const GoalTypeCard = ({ icon, label, selected, onClick }) => (
  <button 
    type="button"
    onClick={onClick}
    className={`p-4 rounded-xl border transition-colors flex flex-col items-center gap-2 group ${
      selected ? 'bg-primary/10 border-primary text-primary shadow-[0_0_0_1px_rgba(75,77,216,0.3)]' : 'bg-surface border-white/10 hover:border-white/20 text-on-surface-variant hover:text-white'
    }`}
  >
     <span className="material-symbols-outlined text-[24px]">{icon}</span>
     <span className="text-xs font-semibold">{label}</span>
  </button>
);

const CreateGoalModal = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState('Real Estate');

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Create Milestone" 
      subtitle="Define your next wealth objective"
    >
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
         <div className="grid grid-cols-3 gap-3">
            <GoalTypeCard icon="home" label="Real Estate" selected={selectedType === 'Real Estate'} onClick={() => setSelectedType('Real Estate')} />
            <GoalTypeCard icon="elderly" label="Retirement" selected={selectedType === 'Retirement'} onClick={() => setSelectedType('Retirement')} />
            <GoalTypeCard icon="school" label="Education" selected={selectedType === 'Education'} onClick={() => setSelectedType('Education')} />
         </div>

         <div className="space-y-4 pt-2">
            <div className="space-y-2">
               <label className="prism-label">Milestone Name</label>
               <input 
                 className="prism-input"
                 placeholder="e.g. Kyoto Estate, Series A Exit..."
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="prism-label">Target Capital</label>
                  <div className="relative">
                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                     <input 
                        className="prism-input pl-7 tnum" 
                        placeholder="500,000" 
                     />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="prism-label">Horizon Year</label>
                  <input 
                    className="prism-input tnum" 
                    placeholder="2032" 
                  />
               </div>
            </div>
         </div>

         <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center shrink-0">
               <span className="material-symbols-outlined text-primary text-[20px]">auto_graph</span>
            </div>
            <div>
               <h4 className="text-sm font-semibold text-white mb-1">Yield Forecasting Alpha</h4>
               <p className="text-xs text-on-surface-variant leading-relaxed">Prism will automatically simulate compound interest and dividend re-investment against this milestone.</p>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/10">
            <button 
              type="button"
              onClick={onClose}
              className="prism-btn-secondary w-full"
            >
               Cancel
            </button>
            <button 
              type="submit"
              className="prism-btn-primary w-full"
            >
               Commit Strategy
            </button>
         </div>
      </form>
    </Modal>
  );
};

export default CreateGoalModal;
