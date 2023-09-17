import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Terminal, Waves } from 'lucide-react';

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: 'Alert',
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Primary = {
  args: {},
  render: (props: any) => {
    return <MyAlert {...props} />;
  },
};

export const WithOpenDefault: Story = {
  args: {},
  render: (props) => {
    return <MyAlert {...props} defaultValue="item-1" />;
  },
};

const MyAlert = (props: any) => {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  );
};
