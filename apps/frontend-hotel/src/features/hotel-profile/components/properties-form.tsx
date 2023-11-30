'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
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

import { updateHotelProfile } from '../api/update-profile';

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

export function PropertiesForm({ properties, selectedNav, profile }) {
  const [checkedProperties, setCheckedProperties] = useState(null);
  const [uncheckedProperties, setUncheckedProperties] = useState(null);

  console.log('profile', profile);

  const myProperties = properties.find((categories) => {
    console.log('categories', categories);
    console.log('categories.url', categories.url);

    console.log('myPropertyCategory#####', categories.url == selectedNav);

    return categories.url == selectedNav;
  });

  console.log('myProperties######', profile?.properties?.includes(1));
  console.log('myProperties######', profile?.hotelProperties);

  useEffect(() => {
    if (profile?.hotelProperties) {
      const myProps = profile?.hotelProperties?.map((item) => item.id);
      setCheckedProperties(myProps);
    }
  }, [profile, properties]);

  const changeCheckboxHandler = (checked, id) => {
    console.log('event', checked);

    if (checked) {
      setCheckedProperties([...checkedProperties, id]);
      setUncheckedProperties(uncheckedProperties.filter((item) => item !== id));
    } else {
      setCheckedProperties(checkedProperties.filter((item) => item !== id));
      setUncheckedProperties([...uncheckedProperties, id]);
    }
  };

  const submitHandler = async (values) => {
    console.log('values', values);

    const newValues = profile?.hotelProperties?.filter((item) =>
      uncheckedProperties?.includes(item.id)
    );

    console.log('newValues', newValues);

    newValues.push(...checkedProperties);

    console.log('newValues', newValues);

    const response = await updateHotelProfile(profile.id, {
      properties: newValues,
    });

    console.log('response', response);
  };

  if (!myProperties || !checkedProperties) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{myProperties.name}</h3>
        <p className="text-sm text-muted-foreground">
          Select the {myProperties.name} you want to display on your profile.
        </p>
      </div>
      <Separator />

      {myProperties.subCategories.map((subCategory) => (
        <div>
          <div className="mb-4">
            <p>{subCategory.name}</p>
            {/*                <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription> */}
          </div>
          {subCategory.properties.map((property) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={checkedProperties.includes(property.id)}
                onCheckedChange={(checked) =>
                  changeCheckboxHandler(checked, property.id)
                }
              />
              <p>{property.name}</p>
            </div>
          ))}
        </div>
      ))}

      <Button type="submit" onClick={submitHandler}>
        Update {myProperties.name}
      </Button>
    </div>
  );
}
