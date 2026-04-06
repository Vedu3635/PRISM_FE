import React, { useEffect, useMemo } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, title, subtitle, children, footerActions }) => {
  const portalRoot = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return document.body;
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!portalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[9999]">
          <div
            className="absolute inset-0 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop (covers sidebar + navbar too) */}
            <Motion.button
              type="button"
              aria-label="Close modal"
              onClick={onClose}
              className="absolute inset-0 bg-black/55 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            />

            {/* Layout wrapper: prevents cropping, enables scroll */}
            <div className="relative w-full h-full p-3 sm:p-5 md:p-8 flex items-start sm:items-center justify-center">
              <Motion.div
                className="relative w-full prism-card overflow-hidden flex flex-col"
                style={{
                  maxWidth: '42rem',
                  // Use dvh for better mobile/desktop viewport correctness.
                  maxHeight: 'calc(100dvh - 1.5rem)',
                }}
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {/* Header */}
                <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 bg-surface-container/70 backdrop-blur border-b border-white/10">
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-white tracking-tight mb-1 truncate">
                        {title}
                      </h3>
                      {subtitle ? (
                        <p className="text-xs text-on-surface-variant font-medium">
                          {subtitle}
                        </p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="prism-btn-ghost !h-9 !w-9 !rounded-md !p-0 shrink-0"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </div>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 min-h-0 px-5 sm:px-6 py-5 overflow-y-auto">
                  {children}
                </div>

                {/* Footer */}
                {footerActions ? (
                  <div className="px-5 sm:px-6 py-4 bg-surface-container/70 backdrop-blur border-t border-white/10 flex justify-end gap-3">
                    {footerActions}
                  </div>
                ) : null}
              </Motion.div>
            </div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>,
    portalRoot,
  );
};

export default Modal;
