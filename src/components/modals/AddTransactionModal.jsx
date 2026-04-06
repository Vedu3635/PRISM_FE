import React, { useMemo, useState, useEffect } from 'react';
import Modal from '../Modal';
import PRISMSelect from '../PRISMSelect';
import { useCreatePersonalTransaction } from '../../utils/transactions/hooks/usePersonalTransactions';
import { useCreateGroupTransaction } from '../../utils/transactions/hooks/useGroupTransactions';
import { useGroups } from '../../utils/groups/hooks/useGroups';

const FormField = ({ label, type = 'text', placeholder, value, onChange }) => (
  <div className="space-y-2">
     <label className="prism-label">{label}</label>
     <input 
       type={type}
       className="prism-input"
       placeholder={placeholder}
       value={value}
       onChange={onChange}
     />
  </div>
);

const AddTransactionModal = ({ isOpen, onClose, initialGroupId = null }) => {
  const [amount, setAmount] = useState('');
  const [isExpense, setIsExpense] = useState(true);
  const [category, setCategory] = useState('Technology');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [receiptUrl, setReceiptUrl] = useState('');
  const [transactedAt, setTransactedAt] = useState('');
  
  // New states for transaction separation
  const [transactionType, setTransactionType] = useState('personal'); // 'personal' | 'group'
  const [selectedGroupId, setSelectedGroupId] = useState('');

  const { data: groups, isLoading: loadingGroups } = useGroups();
  const createPersonalTx = useCreatePersonalTransaction();
  const createGroupTx = useCreateGroupTransaction();

  useEffect(() => {
    if (initialGroupId) {
      setTransactionType('group');
      setSelectedGroupId(initialGroupId);
    } else {
      setTransactionType('personal');
      setSelectedGroupId('');
    }
  }, [initialGroupId, isOpen]);

  const nowLocal = useMemo(() => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
      d.getHours(),
    )}:${pad(d.getMinutes())}`;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = Number(amount);
    if (!Number.isFinite(parsed)) return;

    const signedAmount = isExpense ? -Math.abs(parsed) : Math.abs(parsed);
    const effectiveTitle = title?.trim() || 'Untitled';
    
    const payload = {
      amount: signedAmount,
      category,
      title: effectiveTitle,
      transacted_at: new Date(transactedAt || nowLocal).toISOString(),
      notes: notes?.trim() || '',
      receipt_url: receiptUrl?.trim() || '',
    };

    if (transactionType === 'group' && selectedGroupId) {
      createGroupTx.mutate(
        { ...payload, group_id: selectedGroupId },
        { onSuccess: () => onClose() }
      );
    } else {
      createPersonalTx.mutate(
        payload,
        { onSuccess: () => onClose() }
      );
    }
  };

  const groupOptions = useMemo(() => {
    if (!groups) return [];
    return groups.map(g => ({ value: g.id, label: g.name }));
  }, [groups]);

  const isPending = createPersonalTx.isPending || createGroupTx.isPending;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Add Transaction" 
      subtitle="Record a new inflow or outflow"
    >
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
         {/* Transaction Type Toggle */}
         <div className="flex bg-surface-container rounded-lg border border-white/10 p-1.5 mb-2">
            <button 
              type="button"
              onClick={() => setTransactionType('personal')}
              className={`prism-btn !py-2 !rounded-md !text-xs !font-semibold !px-2 flex-1 ${transactionType === 'personal' ? 'bg-surface-container-highest text-white shadow-sm' : 'text-on-surface-variant hover:text-white hover:bg-white/5'}`}
            >
              Personal
            </button>
            <button 
              type="button"
              onClick={() => setTransactionType('group')}
              className={`prism-btn !py-2 !rounded-md !text-xs !font-semibold !px-2 flex-1 ${transactionType === 'group' ? 'bg-surface-container-highest text-white shadow-sm' : 'text-on-surface-variant hover:text-white hover:bg-white/5'}`}
            >
              Group
            </button>
         </div>

         {/* Group Selection Dropdown */}
         {transactionType === 'group' && (
           <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
             <PRISMSelect 
                label="Assign to Group" 
                options={groupOptions.length > 0 ? groupOptions.map(o => o.label) : ['No groups available']} 
                value={groupOptions.find(o => o.value === selectedGroupId)?.label || 'Select Group'}
                onChange={(label) => {
                  const opt = groupOptions.find(o => o.label === label);
                  if (opt) setSelectedGroupId(opt.value);
                }}
             />
             {loadingGroups && <p className="text-[10px] text-primary animate-pulse">Loading your groups...</p>}
           </div>
         )}

         <div className="flex bg-surface-container rounded-lg border border-white/10 p-1.5">
            <button 
              type="button"
              onClick={() => setIsExpense(true)}
              className={`prism-btn !py-2 !rounded-md !text-xs !font-semibold !px-2 flex-1 ${isExpense ? 'bg-surface-container-highest text-white shadow-sm' : 'text-on-surface-variant hover:text-white hover:bg-white/5'}`}
            >
              Expense
            </button>
            <button 
              type="button"
              onClick={() => setIsExpense(false)}
              className={`prism-btn !py-2 !rounded-md !text-xs !font-semibold !px-2 flex-1 ${!isExpense ? 'bg-surface-container-highest text-white shadow-sm' : 'text-on-surface-variant hover:text-white hover:bg-white/5'}`}
            >
              Income
            </button>
         </div>

         <div className="relative">
            <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold ${isExpense ? 'text-white' : 'text-primary'}`}>
               {isExpense ? '-' : '+'}
            </span>
            <input 
              className="prism-input-lg pl-9"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-6">
            <FormField
              label="Title (required)"
              placeholder="e.g. Apple, Salary, Rent..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <PRISMSelect 
              label="Category" 
              options={['Technology', 'Investment', 'Dining', 'Fixed Assets', 'Travel', 'Lifestyle']} 
              value={category}
              onChange={setCategory}
            />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Transacted at (required)"
              type="datetime-local"
              value={transactedAt || nowLocal}
              onChange={(e) => setTransactedAt(e.target.value)}
            />
            <FormField
              label="Receipt URL (optional)"
              placeholder="https://..."
              value={receiptUrl}
              onChange={(e) => setReceiptUrl(e.target.value)}
            />
         </div>

         <div className="space-y-2">
            <label className="prism-label">Notes (optional)</label>
            <textarea
              className="w-full min-h-[96px] rounded-lg border border-white/15 bg-surface px-3 py-2.5 text-sm text-white placeholder:text-on-surface-variant/60 outline-none transition-all duration-200 hover:border-white/30 focus:border-primary/70 focus:ring-2 focus:ring-primary/25"
              placeholder="Add context for this record..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
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
              disabled={isPending || (transactionType === 'group' && !selectedGroupId)}
            >
               {isPending ? 'Saving...' : 'Save Record'}
            </button>
         </div>
      </form>
    </Modal>
  );
};

export default AddTransactionModal;
