import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Avatar',
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Primary = {
  args: {},
  render: (props: any) => {
    return <MyAvatar {...props} />;
  },
};

export const WithOpenDefault: Story = {
  args: {},
  render: (props) => {
    return <MyAvatar {...props} />;
  },
};

const MyAvatar = (props: any) => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
