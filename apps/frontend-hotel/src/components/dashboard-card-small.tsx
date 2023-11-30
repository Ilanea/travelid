import React from 'react';

import { Icons } from '@libs/icons-web';
import { cn } from '@libs/utils';

const DashboardCardSmall = ({
  children,
  title,
  value,
  subvalue,
  icon,
  className,
}) => {
  return (
    <div
      className={cn(
        'drop-shadow-card bg-gray-100 p-6 rounded-xl w-full',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg  ">{title}</h3>
          {icon}
        </div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-gray-400 font-light">{subvalue}</p>
      </div>
    </div>
  );
};

export default DashboardCardSmall;
