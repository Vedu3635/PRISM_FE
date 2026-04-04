import React, { useState } from 'react';
import PRISMSelect from '../components/PRISMSelect';

const AssetCard = ({ label, title, value, change, isNegative }) => {
  return (
    <div className="bg-surface-container border border-white/5 p-5 rounded-xl transition-colors hover:bg-surface-container-high cursor-default flex flex-col justify-between">
       <div>
          <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1">{label}</p>
          <h4 className="text-sm font-semibold text-white mb-6">{title}</h4>
       </div>
       <div className="flex items-end justify-between">
          <p className="text-xl font-bold text-white tnum tracking-tight">{value}</p>
          <p className={`text-xs font-semibold tnum ${isNegative ? 'text-error' : 'text-primary'}`}>
             {isNegative ? '-' : '+'}{change}
          </p>
       </div>
    </div>
  );
};

const Analytics = () => {
  const [horizon, setHorizon] = useState('36 Months');

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Forecasting Hero */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
         <div className="flex-1 lg:max-w-2xl">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Wealth Intelligence</p>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Financial Forecaster</h1>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Real-time projection of your wealth based on current transaction velocity and market yields.
            </p>
         </div>
         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-surface-container border border-white/5 rounded-xl w-full lg:w-auto">
            <div className="sm:text-right pr-4 sm:border-r border-white/10 w-full sm:w-auto">
               <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Est. Yearly Improvement</p>
               <p className="text-lg font-bold text-white tnum tracking-tight">+$124,500.00</p>
            </div>
            <div className="w-full sm:w-48 shrink-0">
               <PRISMSelect 
                  options={['12 Months', '24 Months', '36 Months', '60 Months', '10 Years']} 
                  value={horizon}
                  onChange={setHorizon}
               />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Net Worth Dynamic Chart */}
         <div className="lg:col-span-2 bg-surface-container border border-white/5 p-6 rounded-xl flex flex-col min-h-[400px]">
            <div className="flex justify-between items-start mb-8">
               <div>
                  <h3 className="text-base font-semibold text-white tracking-tight">Net Worth Velocity</h3>
                  <p className="text-xs text-on-surface-variant mt-1">36-Month Growth Projection</p>
               </div>
               <div className="flex gap-4">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
                     <span className="w-2 h-2 rounded bg-white/20"></span> Previous
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-white">
                     <span className="w-2 h-2 rounded bg-primary"></span> Projected
                  </span>
               </div>
            </div>

            {/* Projection Chart Simulation */}
            <div className="flex-1 flex items-end gap-1.5 px-2 relative mt-4">
               <div className="absolute inset-0 flex flex-col justify-between py-1 border-l border-white/10">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full border-t border-white/5"></div>
                  ))}
               </div>
               
               {/* Previous data */}
               {[30, 32, 28, 35, 40, 45, 42, 50, 55, 60, 65, 70].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group z-10">
                     <div className="w-full bg-surface-container-highest rounded-t-sm transition-colors hover:bg-white/20" style={{ height: `${h}%` }}></div>
                     <p className="text-[9px] font-medium text-on-surface-variant mt-2 opacity-0 group-hover:opacity-100 absolute -bottom-5">Q{Math.ceil((i+1)/3)}</p>
                  </div>
               ))}
               
               {/* Divider */}
               <div className="w-px h-full bg-primary/30 mx-1 relative z-10 flex shrink-0">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-sm border-2 border-background"></div>
               </div>

               {/* Forecast data */}
               {[75, 82, 88, 95, 105, 115, 125, 140, 160].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group z-10">
                    <div className="w-full bg-primary/20 border-t-2 border-primary rounded-t-sm transition-colors hover:bg-primary/40" style={{ height: `${h}%` }}>
                    </div>
                    <p className="text-[9px] font-medium text-primary mt-2 opacity-0 group-hover:opacity-100 absolute -bottom-5">F{i+1}</p>
                  </div>
               ))}
            </div>
         </div>

         {/* AI Velocity Insights */}
         <div className="flex flex-col gap-4">
            <div className="bg-surface-container border border-white/5 p-6 rounded-xl flex-1 flex flex-col">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                     <span className="material-symbols-outlined text-[20px] text-primary">psychology</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">PRISM Analytics AI</h4>
               </div>
               
               <div className="space-y-6 flex-1">
                  <div className="space-y-2 border-l-2 border-primary/40 pl-4 py-1">
                     <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Spending Velocity</p>
                     <p className="text-xs font-medium text-white leading-relaxed">
                       "Tech Subscriptions" are <span className="text-primary font-bold">24% higher</span> than peers. Consolidation could save $140/mo.
                     </p>
                  </div>
                  <div className="space-y-2 border-l-2 border-white/10 pl-4 py-1">
                     <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Liquidity Detection</p>
                     <p className="text-xs font-medium text-white leading-relaxed">
                       Shift in spending velocity modeled. Reallocate $500 to Vault for <span className="text-primary font-bold">4.2% APY</span>.
                     </p>
                  </div>
               </div>

               <button className="mt-6 w-full py-2.5 bg-white text-black font-semibold text-xs rounded-md hover:bg-neutral-200 transition-colors">
                  Analyze Portfolio Efficiency
               </button>
            </div>
         </div>

      </div>

      {/* Asset Distribution */}
      <section className="space-y-4 pt-4 border-t border-white/5">
         <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white tracking-tight">Liquid Asset Allocation</h3>
            <span className="text-xs font-medium text-on-surface-variant">3 Active Containers</span>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AssetCard label="Vault Account" title="Main Savings" value="$142,500.00" change="0.4%" isNegative={false} />
            <AssetCard label="Digital Assets" title="Crypto Portfolio" value="$28,140.24" change="2.1%" isNegative={true} />
            <AssetCard label="Market Holdings" title="Equity Index" value="$84,000.00" change="1.8%" isNegative={false} />
         </div>
      </section>

    </div>
  );
};

export default Analytics;
