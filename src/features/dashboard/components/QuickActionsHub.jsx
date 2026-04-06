import React from 'react';

const QuickActionsHub = ({ onOpenTransaction, onOpenBudget, onOpenGoal }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onOpenTransaction}
        className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/5 text-white text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5"
      >
        <span className="material-symbols-outlined text-[16px]">add</span>{' '}
        Entry
      </button>
      <button
        onClick={onOpenBudget}
        className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/5 text-white text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5"
      >
        <span className="material-symbols-outlined text-[16px]">shield</span>{' '}
        Budget
      </button>
      <button
        onClick={onOpenGoal}
        className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/5 text-white text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5"
      >
        <span className="material-symbols-outlined text-[16px]">flag</span>{' '}
        Goal
      </button>
    </div>
  );
};

export default QuickActionsHub;

