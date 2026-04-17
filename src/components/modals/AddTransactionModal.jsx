import React, { useState } from 'react';
import Modal from '../Modal';
import PRISMSelect from '../PRISMSelect';

const FormField = ({ label, type = 'text', placeholder, value, onChange }) => (
  <div className="space-y-2">
     <label className="text-xs font-semibold text-on-surface-variant block">{label}</label>
     <input 
       type={type}
       className="w-full h-10 bg-surface border border-white/10 rounded-md px-3 text-sm text-white placeholder:text-outline/30 focus:border-primary/50 outline-none transition-colors hover:border-white/20"
       placeholder={placeholder}
       value={value}
       onChange={onChange}
     />
  </div>
);

const AddTransactionModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [isExpense, setIsExpense] = useState(true);
  const [category, setCategory] = useState('Technology');
  const [isRecurring, setIsRecurring] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API Call logic would go here
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Add Transaction" 
      subtitle="Record a new inflow or outflow"
    >
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
         <div className="flex bg-surface-container rounded-md border border-white/5 p-1">
            <button 
              type="button"
              onClick={() => setIsExpense(true)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-sm transition-colors ${isExpense ? 'bg-surface-container-highest text-white shadow-sm' : 'text-on-surface-variant hover:text-white'}`}
            >
              Expense
            </button>
            <button 
              type="button"
              onClick={() => setIsExpense(false)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-sm transition-colors ${!isExpense ? 'bg-surface-container-highest text-white shadow-sm' : 'text-on-surface-variant hover:text-white'}`}
            >
              Income
            </button>
         </div>

         <div className="relative">
            <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold ${isExpense ? 'text-white' : 'text-primary'}`}>
               {isExpense ? '-' : '+'}
            </span>
            <input 
              className="w-full h-16 bg-background border border-white/10 rounded-lg pl-9 pr-4 text-2xl font-bold text-white focus:border-primary/50 outline-none transition-colors tnum"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-6">
            <FormField label="Merchant / Source" placeholder="e.g. Apple, Google..." />
            <PRISMSelect 
              label="Category" 
              options={['Technology', 'Investment', 'Dining', 'Fixed Assets', 'Travel', 'Lifestyle']} 
              value={category}
              onChange={setCategory}
            />
         </div>

         <div 
           onClick={() => setIsRecurring(!isRecurring)}
           className="flex items-center justify-between p-4 rounded-lg bg-surface-container border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
         >
            <div className="flex gap-3 items-center">
               <span className="material-symbols-outlined text-on-surface-variant">autorenew</span>
               <div>
                  <p className="text-sm font-semibold text-white">Monthly Recurring</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Automate this vault entry</p>
               </div>
            </div>
            <div className={`w-10 h-6 rounded-full relative p-1 transition-colors ${isRecurring ? 'bg-primary' : 'bg-surface-container-highest'}`}>
               <div className={`w-4 h-4 bg-white rounded-full transition-all ${isRecurring ? 'ml-auto' : ''}`}></div>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/10">
            <button 
              type="button"
              onClick={onClose}
              className="py-2.5 rounded-md border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/5 font-semibold text-xs transition-colors"
            >
               Cancel
            </button>
            <button 
              type="submit"
              className="py-2.5 rounded-md bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors"
            >
               Save Record
            </button>
         </div>
      </form>
    </Modal>
  );
};

export default AddTransactionModal;
