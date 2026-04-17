import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Save, 
  Users, 
  Tag, 
  DollarSign, 
  StickyNote,
  Layers,
  Globe
} from 'lucide-react';
import { cn } from '@/utils/cn';

const groupTypes = [
  { value: 'personal', label: 'Personal', description: 'Just for you' },
  { value: 'shared', label: 'Shared with Friends', description: 'Splits & shared logs' },
  { value: 'business', label: 'Business', description: 'Professional expenses' },
  { value: 'family', label: 'Family', description: 'Household management' }
];

const currencies = [
  { value: 'INR', label: 'Indian Rupee (₹)' },
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' }
];

const GroupModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = null 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'personal',
    currency: 'INR'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        type: initialData.type || 'personal',
        currency: initialData.currency || 'INR'
      });
    } else {
      setFormData({
        name: '',
        description: '',
        type: 'personal',
        currency: 'INR'
      });
    }
  }, [initialData, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Group name is required";
    if (formData.name.length < 3) newErrors.name = "Name must be at least 3 characters";
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
                {initialData ? 'Edit Group Details' : 'Create New Group'}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {initialData ? 'Update your shared financial circle' : 'Start a new shared financial circle'}
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
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Group Name</label>
              <div className="relative group">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="e.g., Flatmates 2024"
                  className={cn(
                    "w-full h-12 bg-white/5 border border-border/50 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                    errors.name && "border-rose-500/50 bg-rose-500/5"
                  )}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              {errors.name && <span className="text-[10px] text-rose-500 font-bold ml-1">{errors.name}</span>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Description (Optional)</label>
              <div className="relative group">
                <StickyNote className="absolute left-4 top-4 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <textarea
                  placeholder="What is this group for?"
                  className="w-full h-24 bg-white/5 border border-border/50 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Type Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Group Type</label>
                <div className="relative group">
                  <Layers className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <select
                    className="w-full h-12 bg-white/5 border border-border/50 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    {groupTypes.map(t => <option key={t.value} value={t.value} className="bg-card">{t.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Currency */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Default Currency</label>
                <div className="relative group">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <select
                    className="w-full h-12 bg-white/5 border border-border/50 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  >
                    {currencies.map(c => <option key={c.value} value={c.value} className="bg-card">{c.label}</option>)}
                  </select>
                </div>
              </div>
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
                {initialData ? 'Update Group Info' : 'Initialize Group'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GroupModal;
