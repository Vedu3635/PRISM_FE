import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import Loader from '@/components/commonUI/Loader';
import TransactionTable from '@/components/transactions/TransactionTable';
import TransactionModal from '@/components/transactions/TransactionModal';
import transactionService from '@/services/transactionService';
import { Plus, RefreshCcw, Download, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'add',
    activeTransaction: null
  });

  // Fetch transactions on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const data = await transactionService.getTransactions();
      setTransactions(data || []);
    } catch (error) {
      console.error("Failed to fetch transactions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    setIsLoading(true);
    try {
      await transactionService.createTransaction(formData);
      await fetchTransactions();
      closeModal();
    } catch (error) {
      console.error("Failed to create transaction");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    if (!modalState.activeTransaction?.id) return;
    setIsLoading(true);
    try {
      await transactionService.updateTransaction(modalState.activeTransaction.id, formData);
      await fetchTransactions();
      closeModal();
    } catch (error) {
      console.error("Failed to update transaction");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const targetId = id || modalState.activeTransaction?.id;
    if (!targetId) return;
    
    if (window.confirm("Are you sure you want to delete this transaction record?")) {
      setIsLoading(true);
      try {
        await transactionService.deleteTransaction(targetId);
        await fetchTransactions();
        closeModal();
      } catch (error) {
        console.error("Failed to delete transaction");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const openAddModal = () => setModalState({ isOpen: true, mode: 'add', activeTransaction: null });
  const openViewModal = (tx) => setModalState({ isOpen: true, mode: 'view', activeTransaction: tx });
  const openEditModal = (tx) => setModalState({ isOpen: true, mode: 'edit', activeTransaction: tx });
  const closeModal = () => setModalState({ ...modalState, isOpen: false });

  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-black tracking-tighter text-foreground">Transaction Log</h1>
            <p className="text-muted-foreground mt-1 text-sm">Detailed history of your financial movements</p>
          </motion.div>

          <div className="flex items-center gap-3">
            <button 
              onClick={fetchTransactions}
              className="p-3 rounded-2xl bg-white/5 border border-border/50 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all"
              title="Refresh Data"
            >
              <RefreshCcw className={cn("h-5 w-5", isLoading && "animate-spin")} />
            </button>
            <button className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-border/50 font-bold text-sm hover:bg-white/10 transition-all">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button 
              onClick={openAddModal}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Plus className="h-5 w-5" />
              Add Record
            </button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        {!isLoading && transactions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="p-4 rounded-3xl bg-card border border-border/50 flex flex-col items-center justify-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Logged</span>
              <span className="text-lg font-black mt-1 font-mono">{transactions.length}</span>
            </div>
            <div className="p-4 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col items-center justify-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Net Flow</span>
              <span className="text-lg font-black mt-1 text-emerald-500">
                ₹ {transactions.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="p-4 rounded-3xl bg-white/5 border border-border/50 hidden md:flex flex-col items-center justify-center opacity-40">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1"><Filter className="h-3 w-3" /> Type Filter</span>
              <span className="text-xs font-bold mt-1 uppercase">Not active</span>
            </div>
             <div className="p-4 rounded-3xl bg-white/5 border border-border/50 hidden md:flex flex-col items-center justify-center opacity-40">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1"><Filter className="h-3 w-3" /> Cat Filter</span>
              <span className="text-xs font-bold mt-1 uppercase">Not active</span>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        {isLoading ? (
          <div className="h-100 flex items-center justify-center">
            <Loader text="Syncing Records..." />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <TransactionTable 
              transactions={transactions} 
              onView={openViewModal}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          </motion.div>
        )}
      </div>

      {/* Modal Integration */}
      <TransactionModal 
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        initialData={modalState.activeTransaction}
        onClose={closeModal}
        onSave={modalState.mode === 'add' ? handleCreate : handleUpdate}
        onDelete={handleDelete}
      />
    </AppLayout>
  );
};

export default TransactionPage;
