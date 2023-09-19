import { zodResolver } from '@hookform/resolvers/zod';
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
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from '../api/sign-in';
import AuthContext from '@hotel/context/auth-provider';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

const SignInForm = () => {
  const { setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    setIsLoading(true);

    const response = await signIn(values);

    console.log('response', response);

    setIsLoading(false);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Your password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="mt-2">
          {isLoading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign in
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
