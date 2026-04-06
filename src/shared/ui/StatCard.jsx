import React from 'react';

const StatCard = ({ label, value, icon }) => {
  return (
    <div className="bg-surface-container border border-white/5 p-4 rounded-xl flex items-center gap-4 transition-colors hover:bg-surface-container-high cursor-default">
      <div className="w-10 h-10 rounded border border-white/10 bg-surface-container-highest flex items-center justify-center">
        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
          {icon}
        </span>
      </div>
      <div>
        <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-semibold text-white mt-0.5 tnum">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;

