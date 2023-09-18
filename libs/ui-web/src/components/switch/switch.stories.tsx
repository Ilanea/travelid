import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';
import { Label } from '../label';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'Switch',
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Primary: Story = {
  args: {},
  render: (props: any) => {
    return <MySwitch {...props} />;
  },
};

const MySwitch = (props: any) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
};
