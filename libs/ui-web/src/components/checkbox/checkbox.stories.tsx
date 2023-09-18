import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';
import React from 'react';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Checkbox',
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {},
  render: (props: any) => {
    return <MyCheckbox {...props} />;
  },
};

const MyCheckbox = (props: any) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
};
