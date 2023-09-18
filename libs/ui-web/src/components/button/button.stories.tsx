import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { DownloadCloud } from 'lucide-react';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
  },
  render: (props, args) => <MyButton {...props} {...args} />,
};
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'default',
  },
  render: (props, args) => <MyButton {...props} {...args} />,
};

export const Icon: Story = {
  args: {
    variant: 'default',
    size: 'icon',
  },
  render: (props, args) => <MyButton {...props} {...args} />,
};

export const IconOutline: Story = {
  args: {
    variant: 'outline',
    size: 'icon',
  },
  render: (props, args) => <MyButton {...props} {...args} />,
};

const MyButton = (props: any) => {
  return (
    <Button {...props}>
      {props.size === 'icon' ? <DownloadCloud /> : 'Button'}
    </Button>
  );
};
