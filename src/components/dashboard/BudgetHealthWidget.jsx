import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const BudgetHealthWidget = ({ category, used, limit }) => {
  const percentage = Math.min((used / limit) * 100, 100);
  
  const getStatusColor = () => {
    if (percentage < 70) return 'bg-emerald-500';
    if (percentage <= 100) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getStatusBg = () => {
    if (percentage < 70) return 'bg-emerald-500/10 border-emerald-500/20';
    if (percentage <= 100) return 'bg-amber-500/10 border-amber-500/20';
    return 'bg-rose-500/10 border-rose-500/20';
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <div>
          <h4 className="font-bold text-foreground">{category}</h4>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            ₹ {used.toLocaleString('en-IN')} / ₹ {limit.toLocaleString('en-IN')}
          </p>
        </div>
        <div className={cn(
          "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter",
          percentage > 100 ? "bg-rose-500/20 text-rose-500" : "bg-white/5 text-muted-foreground"
        )}>
          {Math.round(percentage)}% USED
        </div>
      </div>
      
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full shadow-lg shadow-black/20", getStatusColor())}
        />
      </div>
    </div>
  );
};

export default BudgetHealthWidget;
