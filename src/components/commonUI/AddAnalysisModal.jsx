import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Plus, BarChart2, PieChart, LineChart, Activity } from 'lucide-react';
import { cn } from '@/utils/cn';

const AddAnalysisModal = ({ isOpen, onClose, onAdd, availableItems }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredItems = availableItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pie': return <PieChart className="h-5 w-5" />;
      case 'line': return <LineChart className="h-5 w-5" />;
      case 'bar': return <BarChart2 className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

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
            className="relative w-full max-w-4xl max-h-[85vh] flex flex-col rounded-[40px] bg-card border border-border/50 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-border/30 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-2xl font-black tracking-tighter">Analysis Gallery</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Select a visualization to add to your dashboard</p>
              </div>
              <button onClick={onClose} className="p-3 rounded-2xl hover:bg-white/5 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-8 py-4 bg-white/5 border-b border-border/30 flex items-center gap-4 shrink-0">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search analytics types, chart styles, or metrics..."
                className="bg-transparent border-none outline-none flex-1 font-bold text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onAdd(item);
                      onClose();
                    }}
                    className="flex items-center gap-6 p-6 rounded-[28px] bg-white/5 border border-border/30 hover:border-primary/50 hover:bg-white/10 transition-all text-left group"
                  >
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-sm tracking-tighter">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Plus className="h-4 w-4" />
                    </div>
                  </button>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-muted-foreground font-bold italic">No matching analysis systems found.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-white/5 border-t border-border/30 flex justify-center shrink-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">Select multiple to build a comprehensive dashboard</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddAnalysisModal;
