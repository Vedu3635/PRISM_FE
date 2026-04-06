import React, { useMemo, useState } from 'react';
import AddTransactionModal from '../components/modals/AddTransactionModal';
import DeleteTransactionModal from '../components/modals/DeleteTransactionModal';
import PRISMSelect from '../components/PRISMSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeAddModal,
  openAddModal,
  setFilterCategory,
} from '../utils/transactions/store/transactionsUiSlice';
import { useAllTransactions } from '../utils/transactions/hooks/useAllTransactions';

const TransactionRow = ({ merchant, sub, amount, date, category, source, type, onDelete }) => {
  const isNegative = amount < 0;
  return (
    <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer border border-transparent">
      <div className="w-10 h-10 rounded-md bg-surface-container-highest flex items-center justify-center font-bold text-xs text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-colors uppercase">
        {merchant.substring(0, 1)}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white truncate">{merchant}</h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-tighter ${
            type === 'group' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface-container-highest text-on-surface-variant border border-white/5'
          }`}>
            {source}
          </span>
          <p className="text-[10px] text-on-surface-variant truncate">{sub}</p>
        </div>
      </div>

      <div className="hidden md:block w-32 shrink-0">
        <span className="px-2 py-1 bg-surface-container-high rounded border border-white/5 text-[10px] font-medium text-on-surface-variant">
          {category}
        </span>
      </div>

      <div className="hidden lg:block w-24 shrink-0 text-xs font-medium text-on-surface-variant">
        {date}
      </div>

      <div className={`w-32 shrink-0 text-right font-semibold text-sm tnum ${isNegative ? 'text-white' : 'text-primary'}`}>
        {isNegative ? '-' : '+'}${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
         <button 
           onClick={(e) => { e.stopPropagation(); onDelete(); }}
           className="p-1.5 rounded-md hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors"
         >
            <span className="material-symbols-outlined text-[18px]">delete</span>
         </button>
         <span className="material-symbols-outlined text-on-surface-variant/50 text-[20px]">chevron_right</span>
      </div>
    </div>
  );
};

const Transactions = () => {
  const dispatch = useDispatch();
  const isAddOpen = useSelector((s) => s.transactionsUi.isAddModalOpen);
  const filterCategory = useSelector((s) => s.transactionsUi.filterCategory);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);

  const { data, isLoading, isError, error } = useAllTransactions({
    category: filterCategory || undefined,
  });

  const transactions = useMemo(() => {
    const list = Array.isArray(data) ? data : [];
    return list.map((tx) => {
      const title = tx?.title || tx?.merchant || 'Untitled';
      const category = tx?.category || 'Uncategorized';
      const amount = Number(tx?.amount || 0);
      const when = tx?.transacted_at || tx?.transactedAt || tx?.created_at || tx?.date;
      const date = when ? new Date(when).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }) : '—';
      return {
        id: tx?.id,
        merchant: title,
        sub: tx?.notes || tx?.description || 'Merged Record',
        category,
        date,
        amount,
        source: tx?.source || 'Personal',
        type: tx?.type || 'personal',
      };
    });
  }, [data]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Ledger Intelligence Alert */}
      <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center shrink-0">
           <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
        </div>
        <div className="flex-1">
           <h3 className="text-sm font-semibold text-white mb-1">Unified Ledger Active</h3>
           <p className="text-xs text-on-surface-variant">
             Personal and group-level transactions are now synchronized. Any expense added to a group will automatically reflect in this ledger for a comprehensive financial overview.
           </p>
        </div>
        <button className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-md hover:bg-neutral-200 transition-colors shrink-0">
          Learn More
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
         <h1 className="text-2xl font-bold text-white tracking-tight">System Ledger</h1>
         <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => dispatch(openAddModal())}
              className="px-4 py-2 bg-primary text-on-primary font-semibold rounded-md text-xs hover:brightness-110 transition-colors flex items-center gap-1.5"
            >
               <span className="material-symbols-outlined text-[18px]">add</span> New Record
            </button>
            
            <div className="w-48">
               <PRISMSelect 
                  options={['All', 'Technology', 'Investment', 'Dining', 'Fixed Assets', 'Travel', 'Lifestyle']} 
                  value={filterCategory || 'All'}
                  onChange={(v) => dispatch(setFilterCategory(v === 'All' ? null : v))}
               />
            </div>
         </div>
      </div>

      {/* Ledger Container */}
      <div className="bg-surface-container border border-white/5 rounded-xl overflow-hidden">
         <div className="p-5 border-b border-white/5 flex items-center justify-between bg-surface-container-low">
            <div>
               <p className="text-sm font-semibold text-white">{transactions.length} Total Records Synced</p>
            </div>
            <div className="flex items-center gap-3 text-on-surface-variant text-xs font-medium">
               <button className="flex items-center gap-1 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[18px]">filter_alt</span> Filter
               </button>
               <div className="w-[1px] h-4 bg-white/10"></div>
               <button className="flex items-center gap-1 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[18px]">download</span> Export
               </button>
            </div>
         </div>
         
         <div className="p-2 space-y-0.5">
            <div className="flex items-center gap-4 px-3 py-2 border-b border-white/5 mx-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
               <div className="w-10"></div>
               <div className="flex-1">Source & Title</div>
               <div className="hidden md:block w-32 shrink-0">Category</div>
               <div className="hidden lg:block w-24 shrink-0">Date</div>
               <div className="w-32 shrink-0 text-right">Value</div>
               <div className="w-10 shrink-0"></div>
            </div>

            {isLoading ? (
              <div className="p-6 text-sm text-on-surface-variant">Syncing with blockchain ledger...</div>
            ) : isError ? (
              <div className="p-6 text-sm text-error">
                Failed to load ledger records. {error?.message ? `(${error.message})` : null}
              </div>
            ) : transactions.length === 0 ? (
              <div className="p-12 text-center">
                <span className="material-symbols-outlined text-[48px] text-on-surface-variant/20 mb-4">inventory_2</span>
                <p className="text-sm text-on-surface-variant">No records found for the selected timeframe.</p>
              </div>
            ) : null}
            
            {transactions.map((tx, i) => (
              <TransactionRow 
                key={tx.id || i} 
                {...tx} 
                onDelete={() => {
                  setSelectedTx(tx);
                  setIsDeleteOpen(true);
                }}
              />
            ))}
         </div>

         <div className="bg-surface-container-low p-4 flex justify-between items-center sm:px-6 border-t border-white/5">
            <p className="text-xs text-on-surface-variant font-medium">Showing {transactions.length} synced records</p>
            <div className="flex gap-1.5">
                 <button className="w-8 h-8 rounded-md bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-surface-container-high transition-colors border border-white/5">
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                 </button>
                 <button className="w-8 h-8 rounded-md bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-surface-container-high transition-colors border border-white/5">
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                 </button>
            </div>
         </div>
      </div>

      {/* Modals */}
      <AddTransactionModal isOpen={isAddOpen} onClose={() => dispatch(closeAddModal())} />
      <DeleteTransactionModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        transaction={selectedTx}
      />

    </div>
  );
};

export default Transactions;
