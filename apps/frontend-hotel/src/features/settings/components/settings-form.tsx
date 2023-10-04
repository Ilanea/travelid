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

import * as Tabs from '@radix-ui/react-tabs';

import useChangeUser from '../hooks/change-settings-user';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'lastName name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
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

    // create a tab for change username
    // create a tab for change password

    <Tabs.Root defaultValue="changePassword">
      <Tabs.List className="flex gap-2" aria-label="Manage your account">
        <Tabs.Trigger className="TabsTrigger" value="changePassword">Change Password</Tabs.Trigger>
        <Tabs.Trigger value="changeUsername">Change Username</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="changePassword">
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
      </Tabs.Content>
      <Tabs.Content value="changeUsername">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter new first Name" {...field} type="firstName" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter new last Name" {...field} type="lastName" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter new Email" {...field} type="newEmail" />
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
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default SettingsForm;
