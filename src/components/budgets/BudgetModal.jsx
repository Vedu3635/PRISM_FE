import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Save, 
  Tag, 
  Target, 
  Calendar as CalendarIcon, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/utils/cn';

const categories = [
  'Food', 'Travel', 'Shopping', 'Entertainment', 'Utilities', 'Health', 'Subscription', 'Income', 'General'
];

const periods = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'yearly', label: 'Yearly' }
];

const BudgetModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = null 
}) => {
  const [formData, setFormData] = useState({
    category: 'General',
    limit: '',
    period: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    groupId: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category || 'General',
        limit: initialData.limit || '',
        period: initialData.period || 'monthly',
        startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        groupId: initialData.groupId || ''
      });
    } else {
      setFormData({
        category: 'General',
        limit: '',
        period: 'monthly',
        startDate: new Date().toISOString().split('T')[0],
        groupId: ''
      });
    }
  }, [initialData, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.limit || formData.limit <= 0) newErrors.limit = "Valid limit is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        {/* Backdrop */}
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
                {initialData ? 'Update Budget Limit' : 'Set New Budget Limit'}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Define your spending boundaries for better financial health
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Limit Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Spending Limit</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black text-muted-foreground group-focus-within:text-emerald-500 transition-colors">₹</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={cn(
                    "w-full h-12 bg-white/5 border border-border/50 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold",
                    errors.limit && "border-rose-500/50 bg-rose-500/5"
                  )}
                  value={formData.limit}
                  onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                />
              </div>
              {errors.limit && <span className="text-[10px] text-rose-500 font-bold ml-1">{errors.limit}</span>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Category Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category</label>
                <div className="relative group">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-purple-500 transition-colors" />
                  <select
                    className="w-full h-12 bg-white/5 border border-border/50 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map(cat => <option key={cat} value={cat} className="bg-card">{cat}</option>)}
                  </select>
                </div>
              </div>

              {/* Period Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Period</label>
                <div className="relative group">
                  <Target className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <select
                    className="w-full h-12 bg-white/5 border border-border/50 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  >
                    {periods.map(p => <option key={p.value} value={p.value} className="bg-card">{p.label}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Start Date</label>
              <div className="relative group">
                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="date"
                  className={cn(
                    "w-full h-12 bg-white/5 border border-border/50 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all",
                    errors.startDate && "border-rose-500/50 bg-rose-500/5"
                  )}
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              {errors.startDate && <span className="text-[10px] text-rose-500 font-bold ml-1">{errors.startDate}</span>}
            </div>

            {/* Notification/Tip */}
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex gap-3">
              <AlertCircle className="h-5 w-5 text-blue-500 shrink-0" />
              <p className="text-[10px] text-blue-200 leading-relaxed font-medium capitalize">
                Your budget will automatically reset at the start of each {formData.period}. 
                You'll receive notifications when you reach 80% and 100% of your limit.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
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
                {initialData ? 'Update Budget' : 'Establish Budget'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BudgetModal;
