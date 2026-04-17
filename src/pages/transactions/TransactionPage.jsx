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
        {!isLoading && transactions.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div className="p-6 rounded-[32px] bg-card border border-border/50 flex flex-col hover:bg-white/5 transition-colors group">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Total Logged</span>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-black font-mono leading-none">{transactions.length}</span>
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Filter className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[32px] bg-emerald-500/5 border border-emerald-500/10 flex flex-col hover:bg-emerald-500/10 transition-colors">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-4">Volume</span>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-black font-mono leading-none text-emerald-500">
                  ₹{transactions.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('en-IN')}
                </span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <RefreshCcw className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[32px] bg-card border border-border/50 flex flex-col hover:bg-white/5 transition-colors">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Top Category</span>
              <div className="flex items-end justify-between">
                <span className="text-xl font-black uppercase truncate max-w-[150px]">
                  {Object.entries(transactions.reduce((acc, curr) => {
                    acc[curr.category] = (acc[curr.category] || 0) + 1;
                    return acc;
                  }, {})).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
                </span>
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Download className="h-4 w-4" />
                </div>
              </div>
            </div>

             <div className="p-6 rounded-[32px] bg-card border border-border/50 flex flex-col hover:bg-white/5 transition-colors">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Most Recent</span>
              <div className="flex items-end justify-between">
                <span className="text-sm font-bold opacity-80">
                  {transactions[0]?.transactedAt ? new Date(transactions[0].transactedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'Today'}
                </span>
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Plus className="h-4 w-4" />
                </div>
              </div>
            </div>
          </motion.div>
        ) : !isLoading && (
          <div className="p-12 rounded-[32px] bg-card/50 border border-dashed border-border/50 flex flex-col items-center justify-center text-center">
            <p className="text-muted-foreground text-sm font-medium">No transaction activity recorded yet.</p>
          </div>
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
