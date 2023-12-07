import React from 'react';

import { cn } from '@libs/utils';

type DashboardCardSmallProps = {
  title: string;
  value: string;
  subvalue: string;
  icon: React.ReactNode;
  className?: string;
};

const DashboardCardSmall = ({
  title,
  value,
  subvalue,
  icon,
  className,
}: DashboardCardSmallProps) => {
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
