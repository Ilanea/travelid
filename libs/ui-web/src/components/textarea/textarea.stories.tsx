import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'Textarea',
  argTypes: {
    value: {
      control: {
        type: 'placeholder',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Primary: Story = {
  args: {},
  render: (props: any) => {
    return <MyTextarea {...props} />;
  },
};

const MyTextarea = (props: any) => {
  return <Textarea {...props} />;
};
