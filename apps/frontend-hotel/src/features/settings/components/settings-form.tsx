import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Icons } from '@libs/icons-web';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@libs/ui-web';

import useChangeUser from '../hooks/change-settings-user';

const formSchema = z.object({
  /*firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'lastName name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),*/
  oldPassword: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
    })
    .max(32, {
      message: 'Password must be at most 32 characters.',
    }),
  newPassword: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .max(32, {
      message: 'Password must be at most 32 characters.',
    }),
});

const SettingsForm = () => {
  const { isLoading, changeUser } = useChangeUser();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    changeUser(values, 'changePassword');
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter old password" {...field} type="oldPassword" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter new password" {...field} type="newPassword" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="mt-2">
          {isLoading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </form>
    </Form>
  );
};

export default SettingsForm;
