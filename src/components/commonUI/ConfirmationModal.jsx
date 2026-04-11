import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", isDestructive = true }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md p-8 rounded-[32px] bg-card border border-border/50 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-2xl bg-destructive/10 text-destructive">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/5 text-muted-foreground transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <h3 className="text-xl font-black tracking-tight mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              {message}
            </p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-4 rounded-2xl bg-white/5 border border-border/50 font-black text-sm hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`flex-1 py-4 rounded-2xl font-black text-sm text-white shadow-xl transition-all hover:scale-[1.02] active:scale-95 ${
                  isDestructive ? 'bg-destructive shadow-destructive/20' : 'bg-primary shadow-primary/20'
                }`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
