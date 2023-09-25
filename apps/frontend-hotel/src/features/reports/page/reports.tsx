import { Icons } from '@libs/icons-web';
import { Button, Calendar } from '@libs/ui-web';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';

const pastMonth = new Date(2023, 10, 15);

const Reports = () => {
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: new Date(),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  return (
    <Button>
      <Icons.armchair />
      Calendar
    </Button>
  );
};

export default Reports;
