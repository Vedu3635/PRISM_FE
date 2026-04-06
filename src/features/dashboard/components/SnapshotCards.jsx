import React from 'react';
import { StatCard } from '../../../shared/ui';

const stats = [
  { label: 'Active Vaults', value: '4 Assets', icon: 'account_balance' },
  { label: 'System Efficiency', value: '98.4%', icon: 'bolt' },
  { label: 'Risk Profile', value: 'Low Core', icon: 'verified' },
  { label: 'Net Saving', value: '+$4.2k', icon: 'savings' },
];

const SnapshotCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <StatCard
          key={i}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default SnapshotCards;

