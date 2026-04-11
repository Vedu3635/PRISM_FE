import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { cn } from '@/utils/cn';

const GroupSummaryWidget = ({ owe, owed, groups }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20">
          <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <ArrowUpRight className="h-3 w-3" />
            You Owe
          </p>
          <h4 className="text-xl font-black text-foreground">₹ {owe.toLocaleString('en-IN')}</h4>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
          <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <ArrowDownLeft className="h-3 w-3" />
            You're Owed
          </p>
          <h4 className="text-xl font-black text-foreground">₹ {owed.toLocaleString('en-IN')}</h4>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest ml-1">Active Groups</p>
        {groups.map((group, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-primary/20 flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-bold">{group.name}</span>
            </div>
            <span className={cn(
              "text-xs font-black",
              group.balance < 0 ? "text-rose-500" : "text-emerald-500"
            )}>
              {group.balance < 0 ? '-' : '+'} ₹ {Math.abs(group.balance).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupSummaryWidget;
