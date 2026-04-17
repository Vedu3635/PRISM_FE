import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, subtitle, children, footerActions }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-opacity">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-surface-container border border-white/10 rounded-xl p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
           <div>
              <h3 className="text-lg font-bold text-white tracking-tight mb-1">{title}</h3>
              {subtitle && <p className="text-xs text-on-surface-variant font-medium">{subtitle}</p>}
           </div>
           <button 
             onClick={onClose}
             className="w-8 h-8 rounded-md bg-transparent flex items-center justify-center text-outline hover:text-white transition-colors hover:bg-white/5"
           >
              <span className="material-symbols-outlined text-lg">close</span>
           </button>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full">
           {children}
        </div>

        {/* Footer */}
        {footerActions && (
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-3">
             {footerActions}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
