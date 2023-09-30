import React from 'react';

interface StatItem {
  icon: React.ReactElement;
  value: number;
  label: string;
}

interface StatsBoxProps {
  data: StatItem[];
}

const StatsBox: React.FC<StatsBoxProps> = ({ data }) => {
  return (
    <div
      id="StatsBox"
      className="flex justify-center items-center w-full h-full"
    >
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center mx-5">
          {item.icon}
          <div className="text-xl font-bold mt-2">{item.value}</div>
          <div className="text-primary font-bold">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsBox;
