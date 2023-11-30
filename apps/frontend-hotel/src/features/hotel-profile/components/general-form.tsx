import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Textarea,
  toast,
} from '@libs/ui-web';
import { cn } from '@libs/utils';

import { updateHotelProfile } from '../api/update-profile';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(60, {
      message: 'Username must not be longer than 60 characters.',
    }),
  subtitle: z
    .string()
    .min(2, {
      message: 'Subtitle must be at least 2 characters.',
    })
    .max(80, {
      message: 'Subtitle must not be longer than 80 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  phoneNumber: z.string().max(1200).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.

export function GeneralForm({ profile }) {
  console.log('profile', profile);

  const defaultValues: Partial<ProfileFormValues> = {
    name: profile?.name,
    subtitle: profile?.subtitle,
    email: profile?.email,
    phoneNumber: profile?.phoneNumber,
    urls: profile?.urls,
  };

  console.log('urls', profile);

  useEffect(() => {
    form.reset({
      name: profile?.name,
      subtitle: profile?.subtitle,
      email: profile?.email,
      phoneNumber: profile?.phoneNumber,
      urls: profile?.urls?.map((item) => {
        return { value: item };
      }),
    });
  }, [profile]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
  });

  const { fields, append } = useFieldArray({
    name: 'urls',
    control: form.control,
  });

  function onSubmit(data: ProfileFormValues) {
    const { urls, ...myData } = data;
    const flatUrls = urls?.map((item) => {
      return item.value;
    });

    const response = updateHotelProfile(profile.id, {
      urls: flatUrls,
      ...myData,
    });

    if (response) {
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated.',
        duration: 3000,
      });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Give guests a sense of who you are.
        </p>
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Hotel an der Donau..." {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display hotel name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Input placeholder="The relax hotel..." {...field} />
                </FormControl>
                <FormDescription>
                  This is a short description of your hotel.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="The relax hotel..." {...field} />
                </FormControl>
                <FormDescription>
                  This is a short description of your hotel.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="The relax hotel..." {...field} />
                </FormControl>
                <FormDescription>
                  This is a short description of your hotel.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {fields.map((field, index) => {
              console.log('field', field);

              return (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`urls.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>
                        URLs
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && 'sr-only')}>
                        Add links to your website, blog, or social media
                        profiles.
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: '' })}
            >
              Add URL
            </Button>
          </div>
          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </div>
  );
}
