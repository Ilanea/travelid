import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';
import React from 'react';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'Calendar',
};
export default meta;
type Story = StoryObj<typeof Calendar>;

export const Primary = {
  args: {},
  render: (props: any) => {
    return <MyCalendar {...props} />;
  },
};

export const WithOpenDefault: Story = {
  args: {},
  render: (props) => {
    return <MyCalendar {...props} />;
  },
};

const MyCalendar = (props: any) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
};
