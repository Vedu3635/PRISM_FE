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

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      {label && <label className="prism-label">{label}</label>}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`prism-input flex items-center justify-between ${
          isOpen ? 'border-primary ring-1 ring-primary/30' : ''
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={value ? 'text-white font-medium' : 'text-outline/50'}>
          {value || 'Select option...'}
        </span>
        <span className={`material-symbols-outlined text-outline/50 transition-transform ${isOpen ? 'rotate-180 text-primary' : ''}`}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 z-50 prism-card overflow-hidden">
          <div className="max-h-60 overflow-y-auto p-1.5" role="listbox">
            {options.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`w-full rounded-md px-3 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between ${
                  value === opt
                    ? 'bg-primary/20 text-white border border-primary/30'
                    : 'text-on-surface-variant hover:bg-white/5 hover:text-white border border-transparent'
                }`}
                role="option"
                aria-selected={value === opt}
              >
                <span>{opt}</span>
                {value === opt && <span className="material-symbols-outlined text-[16px] text-primary">check</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PRISMSelect;
