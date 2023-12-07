import React from 'react';

interface DataItem {
  keyword: string;
  value: string;
}

interface BoxProps {
  data: DataItem[];
}
const BoxComponent: React.FC<BoxProps> = ({ data }) => {
  return (
    <div id="boxComponentId" className="flex justify-between">
      <div className="w-full">
        {data.map((item, index) => (
          <div className="flex items-center justify-between">
            <p key={index} className="mb-2 font-bold pt-3">
              {item.keyword}
            </p>
            <p key={index} className="mb-2 pt-3">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoxComponent;
