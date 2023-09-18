import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { AlertCircle } from 'lucide-react';

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: 'Alert',
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (props, args) => {
    return <MyAlert {...props} {...args} />;
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  render: (props, args) => {
    return <MyAlert {...props} {...args} />;
  },
};

const MyAlert = (props: any) => {
  return (
    <Alert {...props}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  );
};
