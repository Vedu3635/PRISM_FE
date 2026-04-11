import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertCircle, TrendingUp, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';

const SmartInsights = ({ insights }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'warning': return AlertCircle;
      case 'success': return CheckCircle2;
      case 'trend': return TrendingUp;
      default: return Sparkles;
    }
  };

  const getColors = (type) => {
    switch(type) {
      case 'warning': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      case 'success': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'trend': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div className="space-y-3">
      {insights.map((insight, index) => {
        const Icon = getIcon(insight.type);
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className={cn(
              "p-4 rounded-2xl border flex items-center gap-4 transition-all hover:scale-[1.02]",
              getColors(insight.type)
            )}
          >
            <div className="shrink-0 p-2 rounded-xl bg-white/10">
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold leading-snug">{insight.message}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SmartInsights;
