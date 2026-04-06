import React from 'react';

const barHeights = [35, 42, 38, 50, 65, 55, 72, 85, 80, 95, 88, 100];

const NetWorthProjector = () => {
  return (
    <div className="lg:col-span-2 bg-surface-container border border-white/5 p-6 rounded-xl flex flex-col min-h-[360px]">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-base font-semibold text-white">
            Net Worth Projector
          </h3>
          <p className="text-xs text-on-surface-variant mt-1">
            12-Month Performance
          </p>
        </div>
        <div className="flex bg-surface-container-high p-0.5 rounded-md border border-white/5">
          <button className="px-2.5 py-1 text-xs text-on-surface-variant font-medium hover:text-white transition-colors">
            Daily
          </button>
          <button className="px-2.5 py-1 bg-white/10 text-xs text-white shadow-sm font-medium rounded transition-colors">
            Monthly
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-end gap-2 relative mt-4">
        <div className="absolute inset-0 flex flex-col justify-between py-1 border-l border-white/10">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full border-t border-white/5"></div>
          ))}
        </div>

        <div className="flex gap-2 w-full h-full items-end">
          {barHeights.map((h, i) => (
            <div
              key={i}
              className="group relative flex-1 flex flex-col items-center justify-end h-full z-10"
            >
              <div
                className="w-full max-w-[32px] bg-primary/20 hover:bg-primary/40 rounded-t-[2px] border-t-2 border-primary transition-colors cursor-pointer"
                style={{ height: `${h}%` }}
              ></div>
              <span className="text-[9px] font-medium text-on-surface-variant mt-3 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6">
                M{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetWorthProjector;

