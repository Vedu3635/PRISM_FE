import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-4',
    lg: 'h-16 w-16 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className={`${sizes[size]} border-primary/20 border-t-primary rounded-full`}
        />
        {/* Inner Glow */}
        <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full animate-pulse" />
      </div>
      {text && (
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
