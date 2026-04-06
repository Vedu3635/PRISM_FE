import React from 'react';

const IntelligencePanel = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="p-5 rounded-xl bg-surface-container border border-white/5 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="w-8 h-8 rounded border border-white/10 bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px] text-white">
              psychology
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 bg-primary/20 text-primary font-semibold rounded uppercase tracking-wider">
            Opportunity
          </span>
        </div>
        <h3 className="text-sm font-semibold text-white mb-2">
          Automated Tax Strategy
        </h3>
        <p className="text-xs text-on-surface-variant mb-5 line-clamp-3">
          Your capital positions allow for an immediate tax-loss harvesting
          simulation of <span className="text-primary font-medium">+$3.4k</span>.
        </p>
        <button className="mt-auto w-full py-2 bg-white text-black font-semibold rounded-md hover:bg-neutral-200 transition-colors text-xs">
          Execute Strategy
        </button>
      </div>

      <div className="p-5 rounded-xl bg-surface-container border border-white/5 flex-1">
        <h4 className="text-xs font-semibold text-on-surface-variant mb-4 uppercase tracking-wider">
          System Alerts
        </h4>
        <div className="space-y-1">
          <div className="flex items-start gap-3 p-2 -mx-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 shrink-0"></div>
            <div>
              <p className="text-xs text-white font-medium">Unexpected Withdrawal</p>
              <p className="text-[10px] text-on-surface-variant mt-0.5">
                Bank of America • -$1,240
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-2 -mx-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
            <div>
              <p className="text-xs text-white font-medium">Vault Security Pulse</p>
              <p className="text-[10px] text-on-surface-variant mt-0.5">
                Systems Active [SECURE]
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligencePanel;

