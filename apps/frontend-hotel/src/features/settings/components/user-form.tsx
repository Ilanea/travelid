import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Icons } from '@libs/icons-web';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@libs/ui-web';

import { useAuthStore } from '@hotel/features/auth/store/auth';

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
});

const UserForm = () => {
  const { isLoading, changeUser } = useChangeUser();
  const authUser = useAuthStore((state) => state.user);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    changeUser(values, 'changeUserData');
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: authUser?.firstName,
      lastName: authUser?.lastName,
      email: authUser?.email,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit user</CardTitle>
        <CardDescription>Edit user profile information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter new first Name"
                      {...field}
                      type="firstName"
                    />
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
                    <Input
                      placeholder="Enter new last Name"
                      {...field}
                      type="lastName"
                    />
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
                  <FormLabel>E-Mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter new Email"
                      {...field}
                      type="newEmail"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="mt-2">
              {isLoading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
              Update profile
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>
  );
};

export default UserForm;
