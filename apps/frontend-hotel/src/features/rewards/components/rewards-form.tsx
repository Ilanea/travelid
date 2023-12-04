import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Cloudinary } from 'cloudinary-core';
import { format } from 'date-fns';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
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

import UploadWidget from '@hotel/components/upload-widget';

import useCreateEditReward from '../hooks/use-create-edit-reward';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(60, {
      message: 'Username must not be longer than 60 characters.',
    }),
  description: z
    .string()
    .min(2, {
      message: 'Subtitle must be at least 2 characters.',
    })
    .max(300, {
      message: 'Subtitle must not be longer than 80 characters.',
    }),
  image: z
    .string()
    .min(2, {
      message: 'Subtitle must be at least 2 characters.',
    })
    .max(200, {
      message: 'Subtitle must not be longer than 80 characters.',
    }),
  price: z.number(),
  active: z.boolean(),
  validFrom: z.date(),
  validUntil: z.date(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  name: '',
  description:
    'Das Hotel Sacher in Salzburg gilt als eines der weltweit besten Luxushotels in der Heimatstadt Mozarts. Lassen Sie das besondere Flair von Salzburg in einzigartigem elegantem Ambiente auf sich wirken. Besuchen Sie Mozarts Geburtshaus, die Festung Hohensalzburg oder die Salzburger Festspiele und erleben Sie erstklassigen Komfort, Gastfreundlichkeit und Kultur im Herzen von Salzburg.',
  price: 100,
  active: true,
  validFrom: new Date(),
  validUntil: new Date(),
  image:
    'https://media-cdn.tripadvisor.com/media/photo-s/0e/9c/0b/6a/hotel-sacher-salzburg.jpg',
};

export function RewardsForm() {
  const { isLoading, createEditReward } = useCreateEditReward();

  const [uploadedImage, setUploadedImage] = useState('');

  console.log('uploadedImage', uploadedImage);

  async function onSubmit(reward: ProfileFormValues) {
    createEditReward(reward, 'createReward');
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
  });

  return (
    <div className="space-y-6 w-[800px]">
      <div>
        <h3 className="text-lg font-medium">Reward</h3>
        <p className="text-sm text-muted-foreground">
          Create and edit rewards.
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
                  <Input placeholder="Free Drinks at the Bar..." {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display reward name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your reward..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormDescription>This image will be displayed.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="validFrom"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Valid from</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="validUntil"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Valid until</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="100" {...field} />
                </FormControl>
                <FormDescription>
                  How many points does this reward cost?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update reward</Button>
        </form>
      </Form>
    </div>
  );
}
