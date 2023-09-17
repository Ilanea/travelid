import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary = {
  args: {},
  render: (props) => <Button {...props}>Button</Button>,
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Button!/gi)).toBeTruthy();
  },
};

export const Accessible = () => <button>Accessible button</button>;
