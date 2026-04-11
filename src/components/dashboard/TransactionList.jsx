import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Tag as TagIcon,
  Calendar
} from 'lucide-react';
import { cn } from '@/utils/cn';

const TransactionList = ({ transactions }) => {
  return (
    <div className="space-y-4">
      {transactions.map((tx, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300"
        >
          {/* Icon/Avatar */}
          <div className={cn(
            "p-3 rounded-2xl shrink-0 transition-transform group-hover:scale-110",
            tx.amount < 0 ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"
          )}>
            {tx.amount < 0 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{tx.name}</h4>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                <TagIcon className="h-3 w-3" />
                {tx.category}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                <Calendar className="h-3 w-3" />
                {tx.date}
              </span>
            </div>
          </div>

          {/* Amount & Tag */}
          <div className="text-right shrink-0">
            <p className={cn(
              "font-black text-sm",
              tx.amount < 0 ? "text-foreground" : "text-emerald-500"
            )}>
              {tx.amount < 0 ? '-' : '+'} ₹ {Math.abs(tx.amount).toLocaleString('en-IN')}
            </p>
            {tx.tag && (
              <span className={cn(
                "inline-block mt-1 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter",
                tx.tag === 'High Spend' ? "bg-rose-500/20 text-rose-500" : 
                tx.tag === 'Recurring' ? "bg-blue-500/20 text-blue-500" :
                "bg-white/5 text-muted-foreground"
              )}>
                {tx.tag}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TransactionList;
