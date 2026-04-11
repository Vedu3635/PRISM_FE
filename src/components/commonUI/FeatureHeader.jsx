import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const FeatureHeader = ({ title, description, actions = [] }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-4xl font-black tracking-tighter text-foreground">{title}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{description}</p>
      </motion.div>

      <div className="flex flex-wrap items-center gap-3">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={action.onClick}
            disabled={action.disabled}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-xl ${
              action.variant === 'primary' 
                ? 'bg-primary text-primary-foreground shadow-primary/20' 
                : 'bg-white/5 border border-border/50 text-foreground shadow-black/20 hover:bg-white/10'
            }`}
          >
            {action.icon ? <action.icon className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeatureHeader;
