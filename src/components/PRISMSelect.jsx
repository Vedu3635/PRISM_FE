import React, { useState, useRef, useEffect } from 'react';

const PRISMSelect = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      {label && <label className="text-xs font-semibold text-outline-variant">{label}</label>}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-10 bg-surface border rounded-md px-3 flex items-center justify-between transition-colors text-sm ${
          isOpen ? 'border-primary ring-1 ring-primary/30' : 'border-white/10 hover:border-white/20'
        }`}
      >
        <span className={value ? 'text-white font-medium' : 'text-outline/50'}>
          {value || 'Select option...'}
        </span>
        <span className={`material-symbols-outlined text-outline/50 transition-transform ${isOpen ? 'rotate-180 text-primary' : ''}`}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 z-50 bg-surface-container-high border border-white/10 rounded-md overflow-hidden shadow-2xl">
          <div className="max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 text-sm cursor-pointer transition-colors flex items-center justify-between ${
                  value === opt ? 'bg-primary/20 text-white' : 'text-on-surface-variant hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{opt}</span>
                {value === opt && <span className="material-symbols-outlined text-[16px] text-primary">check</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PRISMSelect;
