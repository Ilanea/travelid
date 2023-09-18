import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Badge',
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {},
  render: (props, args) => {
    return <MyBadge {...props} {...args} />;
  },
};

const MyBadge = (props: any) => {
  return <Badge {...props}>Badge</Badge>;
};
