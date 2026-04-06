import React from 'react';

const SectionHeader = ({ title, subtitle, right }) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {subtitle ? (
          <p className="text-xs text-on-surface-variant mt-1">{subtitle}</p>
        ) : null}
      </div>
      {right ? <div>{right}</div> : null}
    </div>
  );
};

export default SectionHeader;

