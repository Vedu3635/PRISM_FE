import React, { useState } from 'react';
import Modal from '../Modal';

const CategoryOption = ({ icon, label, selected, onClick }) => (
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

const CreateBudgetModal = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('Dining');
  const [amount, setAmount] = useState('');
  const [isAiShieldActive, setIsAiShieldActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Create Budget" 
      subtitle="Set monthly spending limits by category"
    >
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
         <div className="grid grid-cols-3 gap-3">
            <CategoryOption icon="restaurant" label="Dining" selected={selectedCategory === 'Dining'} onClick={() => setSelectedCategory('Dining')} />
            <CategoryOption icon="devices" label="Tech" selected={selectedCategory === 'Tech'} onClick={() => setSelectedCategory('Tech')} />
            <CategoryOption icon="flight" label="Travel" selected={selectedCategory === 'Travel'} onClick={() => setSelectedCategory('Travel')} />
         </div>

         <div className="space-y-2 pt-2">
            <div className="flex justify-between items-end mb-1">
               <label className="prism-label">Monthly Target</label>
               <div className="text-right">
                  <p className="text-[10px] text-on-surface-variant font-medium">Current Average</p>
                  <p className="text-xs font-semibold text-white tnum">$842.50 / mo</p>
               </div>
            </div>
            
            <div className="relative">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-white">$</span>
               <input 
                 className="prism-input-lg pl-8 pr-24"
                 placeholder="1,500.00"
                 value={amount}
                 onChange={(e) => setAmount(e.target.value)}
               />
               <div className="absolute right-4 top-1/2 -translate-y-1/2 prism-chip">
                 +12% vs avg
               </div>
            </div>
         </div>

         <div 
           className="p-4 rounded-lg bg-surface-container border border-white/5 hover:border-white/10 transition-colors flex gap-4 items-center cursor-pointer"
           onClick={() => setIsAiShieldActive(!isAiShieldActive)}
         >
            <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 transition-colors ${isAiShieldActive ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
               <span className="material-symbols-outlined text-[20px]">security</span>
            </div>
            <div className="flex-1">
               <h4 className="text-sm font-semibold text-white mb-0.5">AI Spending Shield</h4>
               <p className="text-xs text-on-surface-variant">Active monitoring and alerts when nearing limits.</p>
            </div>
            <div className={`w-10 h-6 shrink-0 rounded-full relative p-1 transition-colors ${isAiShieldActive ? 'bg-primary' : 'bg-surface-container-highest'}`}>
               <div className={`w-4 h-4 bg-white rounded-full transition-all ${isAiShieldActive ? 'ml-auto' : ''}`}></div>
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
               Save Budget
            </button>
         </div>
      </form>
    </Modal>
  );
};

export default CreateBudgetModal;
