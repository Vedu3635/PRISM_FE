import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, X, ShieldCheck, Ticket } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, onConfirm, planName, planPrice }) => {
  const [promoCode, setPromoCode] = useState('');

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
            className="relative w-full max-w-lg p-8 rounded-[40px] bg-card border border-border/50 shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tighter">Checkout</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-0.5">Secure Transaction</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/5 text-muted-foreground transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Order Summary */}
              <div className="p-5 rounded-2xl bg-white/5 border border-border/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-muted-foreground">Chosen Plan</span>
                  <span className="text-sm font-black text-primary uppercase">{planName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-muted-foreground">Billed Monthly</span>
                  <span className="text-xl font-black font-mono tracking-tighter">{planPrice}</span>
                </div>
              </div>

              {/* Card Details (Mock) */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Card Information</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="w-full h-14 bg-white/5 border border-border/50 rounded-2xl px-6 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <CreditCard className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    className="h-14 bg-white/5 border border-border/50 rounded-2xl px-6 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <input 
                    type="text" 
                    placeholder="CVC"
                    className="h-14 bg-white/5 border border-border/50 rounded-2xl px-6 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              {/* Promo Code */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Promo Code</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="DISCOUNT20"
                    className="w-full h-14 bg-white/5 border border-border/50 rounded-2xl px-6 pr-24 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all uppercase"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button className="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-[10px] font-black uppercase tracking-widest transition-all">Apply</button>
                  <Ticket className="absolute right-24 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30" />
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all"
                >
                  Pay & Subscribe
                </button>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">SSL Encrypted 256-bit Payment</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
