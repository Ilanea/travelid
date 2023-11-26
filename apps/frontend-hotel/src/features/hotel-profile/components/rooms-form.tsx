'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Textarea } from '@libs/ui-web';

import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Separator,
  toast,
} from '@libs/ui-web';
import {useState} from "react";

const room_items = [
  {
    id: 'singleroom',
    label: 'Einzelzimmer',
  },
  {
    id: 'doubleroom',
    label: 'Doppelzimmer',
  },
  {
    id: 'twinroom',
    label: 'Zweibettzimmer',
  },
  {
    id: 'tripleroom',
    label: 'Dreibettzimmer',
  },
  {
    id: 'familyroom',
    label: 'Familienzimmer',
  },
    {
        id: 'apartment',
        label: 'Apartment',
    },
    {
        id: 'conectedrooms',
        label: 'Verbindungszimmer',
    },
  {
    id: 'suite',
    label: 'Suite',
  },
  {
    id: 'Penthouse',
    label: 'Penthouse',
  },
] as const;

const standard_room_items = [
   {
    id: 'bedlinen',
    label: 'Bettwäsche',
   },
    {
        id: 'slippers',
        label: 'Hausschuhe',
    },
   {
    id: 'cupboard',
    label: 'Kleiderschrank',
   },
    {
        id: 'safe',
        label: 'Safe',
    },
    {
        id: 'alarmclock',
        label: 'Wecker',
    },
    {
        id: 'tv',
        label: 'TV',
    },
    {
        id: 'airconditioning',
        label: 'Klimaanlage',
    },
    {
    id: 'shower',
    label: 'Dusche',
  },
  {
    id: 'bathtub',
    label: 'Badewanne',
  },
  {
    id: 'bidet',
    label: 'Bidet',
  },
  {
    id: 'towels',
    label: 'Handtücher',
  },

  {
    id: 'wc',
    label: 'WC',
  },
  {
    id: 'hairdryer',
    label: 'Haartrockner',
  },
  {
    id: 'bathrobe',
    label: 'Bademantel',
  },
  {
      id: 'toiletpaper',
      label: 'Toilettenpapier',
  },

] as const;

const displayFormSchema = z.object({
  room_items: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
    standard_room_items: z
        .array(z.string())
        .refine((value) => value.some((item) => item), {
            message: 'You have to select at least one item.',
        }),
});

type DisplayFormValues = z.infer<typeof displayFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<DisplayFormValues> = {
  room_items: [],
  standard_room_items: [],
};

export function RoomsForm() {
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues,
  });

  function onSubmit(data: DisplayFormValues) {
      toast
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  function onDetails(data: DisplayFormValues) {

  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Rooms & Equipment</h3>
        <p className="text-sm text-muted-foreground">
          Select the rooms and the equipment you want to display on your profile.
        </p>
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="standard_room_items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Standard Equiment Rooms</FormLabel>
                  {/*                <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription> */}
                </div>
                {standard_room_items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="standard_room_items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl >
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="room_items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Rooms</FormLabel>
                  {/*                <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription> */}
                </div>
                {room_items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="room_items"
                    render={({ field }) => {
                      return (
                         <form onDetails={form.handleSubmit(onDetails)} className="space-y-8">
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}

                          </FormLabel>
                            <Button type="details">Details Room</Button>
                        </FormItem>
                         </form>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update Rooms</Button>
        </form>
      </Form>
    </div>
  );
}
