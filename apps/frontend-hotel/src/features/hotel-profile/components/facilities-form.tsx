'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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

const wellness_items = [
  {
    id: 'Spa',
    label: 'Spa',
  },
  {
    id: 'Gym',
    label: 'Gym',
  },
  {
    id: 'Pool',
    label: 'Pool',
  },
  {
    id: 'Sauna',
    label: 'Sauna',
  },
  {
    id: 'Massage',
    label: 'Massage',
  },
  {
    id: 'Yoga',
    label: 'Yoga',
  },
  {
    id: 'Pilates',
    label: 'Pilates',
  },
] as const;

const general_items = [
  {
    id: 'Wifi',
    label: 'Wifi',
  },
  {
    id: 'Parking',
    label: 'Parking',
  },
  {
    id: 'Restaurant',
    label: 'Restaurant',
  },
  {
    id: 'Bar',
    label: 'Bar',
  },
  {
    id: 'Room service',
    label: 'Room service',
  },
  {
    id: 'Laundry',
    label: 'Laundry',
  },
] as const;

const displayFormSchema = z.object({
  wellness_items: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
  general_items: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
});

type DisplayFormValues = z.infer<typeof displayFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<DisplayFormValues> = {
  wellness_items: ['gym', 'sauna'],
};

export function FacilitiesForm() {
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues,
  });

  function onSubmit(data: DisplayFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Facilities</h3>
        <p className="text-sm text-muted-foreground">
          Select the facilities you want to display on your profile.
        </p>
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="general_items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">General</FormLabel>
                  {/*                <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription> */}
                </div>
                {general_items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="general_items"
                    render={({ field }) => {
                      return (
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
            name="wellness_items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Wellness</FormLabel>
                  {/*                <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription> */}
                </div>
                {wellness_items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="wellness_items"
                    render={({ field }) => {
                      return (
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
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update facilities</Button>
        </form>
      </Form>
    </div>
  );
}
