import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Calculator, TrendingUp } from 'lucide-react';

const CashFlowWidget = ({ dailyAvg, burnRate, projection }) => {

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
            <Zap className="h-3 w-3 text-amber-500" />
            Daily Avg
          </p>
          <h4 className="text-xl font-black">₹ {dailyAvg.toLocaleString('en-IN')}</h4>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
            <Activity className="h-3 w-3 text-rose-500" />
            Burn Rate
          </p>
          <h4 className="text-xl font-black">{burnRate}%</h4>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden group">
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
              <Calculator className="h-3 w-3" />
              Projected Balance
            </p>
            <h3 className="text-2xl font-black text-foreground">₹ {projection.toLocaleString('en-IN')}</h3>
            <p className="text-[10px] text-muted-foreground mt-1">Estimated by the end of current month</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <span>Monthly Progress</span>
          <span>72%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '72%' }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>
    </div>
  );
};


export default CashFlowWidget;

