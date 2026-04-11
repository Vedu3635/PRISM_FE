import React from 'react';
import { motion } from 'framer-motion';
import { Target, ChevronRight } from 'lucide-react';

const GoalsWidget = ({ name, current, target, color = "bg-primary" }) => {
  const progress = Math.min((current / target) * 100, 100);

  return (
    <div className="group p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-2xl ${color}/20 text-foreground`}>
          <Target className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-sm leading-tight">{name}</h4>
          <p className="text-[10px] text-muted-foreground font-bold uppercase mt-0.5 tracking-wider">
            ₹ {current.toLocaleString('en-IN')} of ₹ {target.toLocaleString('en-IN')}
          </p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-black tracking-widest text-muted-foreground uppercase">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className={`h-full rounded-full ${color} shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
          />
        </div>
      </div>
    </div>
  );
};

export default GoalsWidget;
