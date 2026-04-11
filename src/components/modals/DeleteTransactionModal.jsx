import React from 'react';
import Modal from '../Modal';

const DeleteTransactionModal = ({ isOpen, onClose, transaction }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Delete Transaction" 
      subtitle="This action cannot be undone"
    >
      <div className="space-y-6 mt-4">
         <div className="p-4 rounded-lg bg-error/10 border border-error/20 flex gap-4">
            <div className="w-10 h-10 rounded-md bg-error/20 flex items-center justify-center shrink-0">
               <span className="material-symbols-outlined text-error text-[20px]">warning</span>
            </div>
            <div>
               <h4 className="text-sm font-semibold text-white mb-1">Confirm Deletion</h4>
               <p className="text-xs text-on-surface-variant leading-relaxed">
                  Deleting this entry will permanently update your historical records and net worth calculations.
               </p>
            </div>
         </div>

         <div className="p-4 rounded-lg bg-surface-container border border-white/5 space-y-3">
            <div className="flex justify-between items-start">
               <div>
                  <h5 className="text-sm font-semibold text-white">{transaction?.merchant || 'Premium Subscription'}</h5>
                  <p className="text-xs text-on-surface-variant mt-0.5">{transaction?.date || 'Oct 24, 2023'} • {transaction?.sub || 'Recurring'}</p>
               </div>
               <span className="text-sm font-semibold text-white tnum">${Math.abs(transaction?.amount || 149.00).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="pt-3 border-t border-white/5 flex items-center gap-2">
               <span className="material-symbols-outlined text-on-surface-variant text-[16px]">fingerprint</span>
               <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-wider">ID: PX-992-DELTA</p>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
            <button 
              onClick={onClose}
              className="py-2.5 rounded-md border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/5 font-semibold text-xs transition-colors"
            >
               Cancel
            </button>
            <button className="py-2.5 rounded-md bg-error text-white font-semibold text-xs hover:bg-error/90 transition-colors">
               Delete Entry
            </button>
         </div>
      </div>
    </Modal>
  );
};

export default DeleteTransactionModal;
