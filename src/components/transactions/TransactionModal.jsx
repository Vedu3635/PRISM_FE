import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Save, 
  Trash2, 
  Tag, 
  IndianRupee, 
  Calendar as CalendarIcon, 
  StickyNote,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/utils/cn';
import groupService from '@/services/groupService/groupService';

const categories = [
  'Food', 'Travel', 'Shopping', 'Entertainment', 'Utilities', 'Health', 'Subscription', 'Income', 'General'
];

const TransactionModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  onDelete, 
  initialData = null, 
  mode = 'add' // 'add', 'edit', 'view'
}) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'General',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    currency: 'INR',
    group_id: '',
    receipt_url: ''
  });

  const [groups, setGroups] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await groupService.getGroups();
        setGroups(data || []);
        if (data && data.length > 0 && !formData.group_id) {
          setFormData(prev => ({ ...prev, group_id: data[0].id || data[0].ID }));
        }
      } catch (error) {
        console.error("Failed to fetch groups for modal");
      }
    };
    
    if (isOpen) {
      fetchGroups();
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        amount: initialData.amount || '',
        category: initialData.category || 'General',
        date: initialData.transactedAt ? new Date(initialData.transactedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        notes: initialData.notes || '',
        currency: initialData.currency || 'INR',
        group_id: initialData.group_id || initialData.groupId || '',
        receipt_url: initialData.receipt_url || ''
      });
    } else {
      setFormData({
        title: '',
        amount: '',
        category: 'General',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        currency: 'INR',
        group_id: groups.length > 0 ? (groups[0].id || groups[0].ID) : '',
        receipt_url: ''
      });
    }
  }, [initialData, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.amount || formData.amount <= 0) newErrors.amount = "Valid amount is required";
    if (!formData.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'view') return;
    if (validate()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  const isView = mode === 'view';
  const isEdit = mode === 'edit';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        {/* Backdrop with Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/60 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-card border border-border shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-border/50">
            <div>
              <h3 className="text-xl font-black tracking-tight">
                {isView ? 'Transaction Details' : isEdit ? 'Edit Transaction' : 'Add Transaction'}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isView ? 'Full history of this record' : 'Keep your finances in prism focus'}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Label</label>
              <div className="relative group">
                <StickyNote className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  disabled={isView}
                  type="text"
                  placeholder="e.g., Monthly Rent"
                  className={cn(
                    "w-full h-12 bg-white/5 border border-border/50 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                    errors.title && "border-rose-500/50 bg-rose-500/5",
                    isView && "opacity-80"
                  )}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              {errors.title && <span className="text-[10px] text-rose-500 font-bold ml-1">{errors.title}</span>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Amount */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Amount</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black text-muted-foreground group-focus-within:text-emerald-500 transition-colors">
                    {formData.currency === 'INR' ? '₹' : formData.currency === 'USD' ? '$' : formData.currency === 'EUR' ? '€' : '£'}
                  </span>
                  <input
                    disabled={isView}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={cn(
                      "w-full h-12 bg-white/5 border border-border/50 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold",
                      errors.amount && "border-rose-500/50 bg-rose-500/5",
                      isView && "opacity-80"
                    )}
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
                {errors.amount && <span className="text-[10px] text-rose-500 font-bold ml-1">{errors.amount}</span>}
              </div>

              {/* Currency */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Currency</label>
                <select
                  disabled={isView}
                  className={cn(
                    "w-full h-12 bg-white/5 border border-border/50 rounded-2xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none",
                    isView && "opacity-80"
                  )}
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Group Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Assign to Group</label>
                <select
                  disabled={isView}
                  className={cn(
                    "w-full h-12 bg-white/5 border border-border/50 rounded-2xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none",
                    isView && "opacity-80"
                  )}
                  value={formData.group_id}
                  onChange={(e) => setFormData({ ...formData, group_id: e.target.value })}
                >
                  {groups.map(g => (
                    <option key={g.id || g.ID} value={g.id || g.ID}>{g.name || g.Name}</option>
                  ))}
                  {!groups.length && <option value="">Personal</option>}
                </select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Date</label>
                <div className="relative group">
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                  <input
                    disabled={isView}
                    type="date"
                    className={cn(
                      "w-full h-12 bg-white/5 border border-border/50 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all",
                      isView && "opacity-80"
                    )}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Category & Receipt */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category</label>
                <div className="relative group">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-purple-500 transition-colors" />
                  <select
                    disabled={isView}
                    className={cn(
                      "w-full h-12 bg-white/5 border border-border/50 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none",
                      isView && "opacity-80"
                    )}
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map(cat => <option key={cat} value={cat} className="bg-card">{cat}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Receipt URL (Optional)</label>
                <input
                  disabled={isView}
                  type="text"
                  placeholder="https://..."
                  className={cn(
                    "w-full h-12 bg-white/5 border border-border/50 rounded-2xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                    isView && "opacity-80"
                  )}
                  value={formData.receipt_url}
                  onChange={(e) => setFormData({ ...formData, receipt_url: e.target.value })}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Notes (Optional)</label>
              <textarea
                disabled={isView}
                placeholder="Add any additional details..."
                className={cn(
                  "w-full bg-white/5 border border-border/50 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none h-24",
                  isView && "opacity-80"
                )}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              {!isView ? (
                <>
                  <button 
                    type="button"
                    onClick={onClose}
                    className="flex-1 h-12 rounded-2xl bg-white/5 border border-border/50 font-bold text-sm hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-2 h-12 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {isEdit ? 'Update Entry' : 'Create Record'}
                  </button>
                </>
              ) : (
                <>
                  <button 
                    type="button"
                    onClick={onDelete}
                    className="flex-1 h-12 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 font-black text-sm hover:bg-rose-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                  <button 
                    type="button"
                    onClick={onClose}
                    className="flex-2 h-12 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                  >
                    Close Log
                  </button>
                </>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TransactionModal;
