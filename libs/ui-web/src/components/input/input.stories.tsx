import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Input',
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Primary = {
  args: {},
};

export const WithInput: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole('textbox');

    await userEvent.type(input, 'Hello, Alpaka Gang!', {
      delay: 100,
    });
  },
};
