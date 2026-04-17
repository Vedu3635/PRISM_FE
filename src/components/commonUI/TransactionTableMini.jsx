import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { MoreHorizontal, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const TransactionTableMini = ({ 
  transactions, 
  title = "Recent Activity", 
  subtitle = "Last 30 days",
  columns = ['label', 'date', 'amount', 'status'],
  labels = {}
}) => {
  const defaultLabels = {
    label: "Log Item",
    date: "Date",
    paidBy: "Payer",
    amount: "Amount",
    groupName: "Group",
    action: "Action"
  };

  const activeLabels = { ...defaultLabels, ...labels };

  return (
    <div className="p-8 rounded-[32px] bg-card border border-border/50 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black tracking-tighter">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1 uppercase font-bold tracking-widest">{subtitle}</p>
        </div>
        <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground transition-all">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border/50">
              {columns.includes('label') && <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{activeLabels.label}</th>}
              {columns.includes('date') && <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{activeLabels.date}</th>}
              {columns.includes('paidBy') && <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{activeLabels.paidBy}</th>}
              {columns.includes('groupName') && <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{activeLabels.groupName}</th>}
              {columns.includes('amount') && <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">{activeLabels.amount}</th>}
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">{activeLabels.action}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-12 text-center text-sm text-muted-foreground">No records found</td>
              </tr>
            ) : (
              transactions.map((tx, idx) => (
                <motion.tr 
                  key={tx.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-white/[0.02] transition-colors"
                >
                  {columns.includes('label') && (
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-xl shrink-0",
                          tx.amount > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                        )}>
                          {tx.amount > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-bold text-sm tracking-tight">{tx.title || tx.label}</p>
                          <p className="text-[10px] text-muted-foreground font-medium">{tx.category}</p>
                        </div>
                      </div>
                    </td>
                  )}
                  {columns.includes('date') && (
                    <td className="py-5">
                      <p className="text-xs font-medium text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                    </td>
                  )}
                  {columns.includes('paidBy') && (
                    <td className="py-5">
                      <p className="text-xs font-bold">{tx.paidBy || 'Self'}</p>
                    </td>
                  )}
                  {columns.includes('groupName') && (
                    <td className="py-5">
                      <p className="text-xs font-medium text-muted-foreground">{tx.groupName || 'N/A'}</p>
                    </td>
                  )}
                  {columns.includes('amount') && (
                    <td className="py-5 text-right">
                      <p className={cn(
                        "text-sm font-black font-mono",
                        tx.amount > 0 ? "text-emerald-500" : "text-foreground"
                      )}>
                        ₹ {Math.abs(tx.amount).toLocaleString('en-IN')}
                      </p>
                    </td>
                  )}
                  <td className="py-5 text-right">
                    <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all">View</button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTableMini;
