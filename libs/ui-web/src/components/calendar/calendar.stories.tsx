import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';
import React from 'react';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'Calendar',
};
export default meta;
type Story = StoryObj<typeof Calendar>;

export const Single: Story = {
  args: {},
  render: (props: any) => {
    return <MyCalendarSingle {...props} />;
  },
};
export const Multiple: Story = {
  args: {},
  render: (props: any) => {
    return <MyCalendarMultiple {...props} />;
  },
};
export const Range: Story = {
  args: {},
  render: (props: any) => {
    return <MyCalendarRange {...props} />;
  },
};

const MyCalendarSingle = (props: any) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
};
const MyCalendarMultiple = (props: any) => {
  const [date, setDate] = React.useState<Date[] | undefined>([new Date()]);

  return (
    <div className="flex">
      <Calendar
        mode="multiple"
        min={2}
        max={3}
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
};

const pastMonth = new Date(2023, 10, 15);

const MyCalendarRange = (props: any) => {
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const [range, setRange] = React.useState<DateRange | undefined>(
    defaultSelected
  );

  return (
    <div className="flex">
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        className="rounded-md border"
        defaultMonth={pastMonth}
      />
    </div>
  );
};
