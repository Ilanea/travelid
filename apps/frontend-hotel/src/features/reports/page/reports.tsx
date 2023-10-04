import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Icons } from '@libs/icons-web';
import { Button, Calendar } from '@libs/ui-web';

const pastMonth = new Date(2023, 10, 15);

const Reports = () => {
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: new Date(),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  return (
    <div className="text-6xl font-medium flex flex-col items-center justify-center h-full">
      <p>Vielen Dank</p>
      <p>für die Aufmerksamkeit!</p>
    </div>
  );
};

export default Reports;
