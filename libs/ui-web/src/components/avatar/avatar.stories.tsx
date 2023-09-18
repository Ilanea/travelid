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
      <AvatarImage src="https://gitlab.com/uploads/-/system/project/avatar/3224774/rick_astley.jpg?width=64" />
      <AvatarFallback>RA</AvatarFallback>
    </Avatar>
  );
};
