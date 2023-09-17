import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import React from 'react';

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: 'Popover',
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Primary = {
  args: {},
  render: (props: any) => {
    return <MyPopover {...props} />;
  },
};

export const WithOpenDefault: Story = {
  args: {},
  render: (props) => {
    return <MyPopover {...props} />;
  },
};

const MyPopover = (props: any) => {
  return (
    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};
