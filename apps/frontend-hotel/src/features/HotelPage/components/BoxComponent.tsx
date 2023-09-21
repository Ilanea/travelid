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
        <div className="w-1/2 pt-5">
          {
            data.map((item, index) => (
              <div key={index} className="mb-2 font-bold pt-3 border-b text-1xl">{item.keyword}</div>
            ))
          }
        </div>
        <div className="w-1/2 pt-5 pr-5 text-right">
          {
            data.map((item, index) => (
              <div key={index} className="mb-2 pt-3 border-b text-1xl">{item.value}</div>
            ))
          }
        </div>
      </div>
  );
}

export default BoxComponent;
