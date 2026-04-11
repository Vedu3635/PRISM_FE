import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/utils/cn';

const StatCard = ({ title, value, trend, trendValue, subtext, icon: Icon }) => {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-3xl bg-card/30 backdrop-blur-xl border border-border/50 shadow-xl relative overflow-hidden group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
          <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold",
          isPositive ? "bg-emerald-500/10 text-emerald-500" : 
          isNegative ? "bg-rose-500/10 text-rose-500" : 
          "bg-gray-500/10 text-gray-500"
        )}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : isNegative ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
          {trendValue}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1 group-hover:text-foreground/80 transition-colors">{title}</p>
        <h3 className="text-3xl font-black tracking-tight mb-2">₹ {value.toLocaleString('en-IN')}</h3>
        <p className="text-xs text-muted-foreground">{subtext}</p>
      </div>

      {/* Decorative background accent */}
      <div className={cn(
        "absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500",
        isPositive ? "bg-emerald-500" : isNegative ? "bg-rose-500" : "bg-primary"
      )} />

    </motion.div>
  );
};

export default StatCard;
