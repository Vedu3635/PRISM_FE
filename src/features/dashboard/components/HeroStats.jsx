import React from 'react';

const HeroStats = ({
  netWorth,
  mtDChange,
  inflows,
  outflows,
  children,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      <div className="flex-1">
        <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
          Total Liquidity
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none tnum">
          ${netWorth.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </h1>
        <div className="flex items-center gap-2 text-primary mt-3">
          <span className="material-symbols-outlined text-[16px]">
            trending_up
          </span>
          <span className="text-sm font-medium">
            +$
            {mtDChange.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{' '}
            (1.2%) this month
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full md:w-auto">
        <div className="flex gap-4">
          <div className="flex-1 md:w-32 bg-surface-container border border-white/5 p-4 rounded-xl">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold mb-1">
              Inflow
            </p>
            <p className="text-xl font-semibold text-white tnum">
              ${(inflows / 1000).toFixed(1)}k
            </p>
          </div>
          <div className="flex-1 md:w-32 bg-surface-container border border-white/5 p-4 rounded-xl">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold mb-1">
              Outflow
            </p>
            <p className="text-xl font-semibold text-white tnum">
              ${(outflows / 1000).toFixed(1)}k
            </p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default HeroStats;

