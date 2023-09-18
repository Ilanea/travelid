import type { Meta, StoryObj } from '@storybook/react';
import { useToast } from './use-toast';
import { Toaster } from './toaster';
import { Button } from '../button';
import { Toast, ToastAction } from './toast';

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: 'Toast',
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const WithTitle: Story = {
  args: {},
  render: (props: any) => {
    return <MyToast {...props} />;
  },
};
export const Destructive: Story = {
  args: {},
  render: (props: any) => {
    return <MyToastDestructive {...props} />;
  },
};

const MyToast = (props: any) => {
  const { toast } = useToast();

  return (
    <div>
      <Button
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up',
            description: 'Friday, February 10, 2023 at 5:57 PM',
          });
        }}
      >
        Show Toast
      </Button>
      <Toaster />
    </div>
  );
};

const MyToastDestructive = (props: any) => {
  const { toast } = useToast();

  return (
    <div>
      <Button
        onClick={() => {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.',
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }}
      >
        Show Toast
      </Button>
      <Toaster />
    </div>
  );
};
