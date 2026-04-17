import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Edit3, 
  Trash2, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Tag
} from 'lucide-react';
import { cn } from '@/utils/cn';

const TransactionTable = ({ transactions, onView, onEdit, onDelete }) => {
  if (!transactions.length) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center bg-card/10 rounded-3xl border border-dashed border-border/50">
        <div className="p-4 rounded-full bg-white/5 mb-4">
           <MoreHorizontal className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold">No transactions found</h3>
        <p className="text-sm text-muted-foreground max-w-62.5 mt-1">Start adding your expenses to see them logged here.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-4xl border border-border/50 bg-card/30 backdrop-blur-xl shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/30 bg-white/5">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Label</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {transactions.map((tx, index) => (
              <motion.tr 
                key={tx.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group hover:bg-white/5 transition-colors"
              >
                {/* Label */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-xl shrink-0 transition-transform group-hover:scale-110",
                      tx.amount < 0 ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"
                    )}>
                      {tx.amount < 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                    </div>
                    <div>
                      <span className="font-bold text-sm block truncate max-w-[200px]">{tx.title}</span>
                      {tx.notes && <span className="text-[10px] text-muted-foreground truncate max-w-[150px] block">{tx.notes}</span>}
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {tx.transactedAt ? new Date(tx.transactedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-border/30 text-[10px] font-black uppercase tracking-tighter text-muted-foreground group-hover:border-primary/30 group-hover:text-primary transition-colors">
                      {tx.category}
                    </span>
                  </div>
                </td>

                {/* Amount */}
                <td className="px-6 py-4">
                  <span className={cn(
                    "font-black text-sm",
                    tx.amount < 0 ? "text-rose-500" : "text-emerald-500"
                  )}>
                    {tx.amount < 0 ? '-' : '+'} {tx.currency === 'INR' || !tx.currency ? '₹' : tx.currency} {Math.abs(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter",
                    tx.status === 'active' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                  )}>
                    {tx.status || 'Active'}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onView(tx)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onEdit(tx)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 text-muted-foreground hover:text-blue-500 transition-all"
                      title="Edit Entry"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(tx.id)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-muted-foreground hover:text-rose-500 transition-all"
                      title="Delete Record"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
