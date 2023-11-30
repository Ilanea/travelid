import React from 'react';

import { cn } from '@libs/utils';

const DashboardCard = ({ children, title, subtitle, className, button }) => {
  return (
    <div
      className={cn(
        'drop-shadow-card bg-gray-100 p-6 rounded-xl w-full',
        className
      )}
    >
      <div className="pb-5 flex justify-between it">
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-gray-400 font-light">{subtitle}</p>
        </div>
        {button}
      </div>
      {children}
    </div>
  );
};

export default DashboardCard;
