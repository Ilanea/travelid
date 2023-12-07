import { useEffect, useState } from 'react';

import { Button, Checkbox, Separator, toast } from '@libs/ui-web';

import { updateHotelProfile } from '../api/update-profile';

type PropertiesFormProps = {
  properties: any;
  selectedNav: any;
  profile: any;
};

export function PropertiesForm({
  properties,
  selectedNav,
  profile,
}: PropertiesFormProps) {
  const [checkedProperties, setCheckedProperties] = useState<any>(null);
  const [uncheckedProperties, setUncheckedProperties] = useState<any>(null);

  console.log('profile', profile);

  const myProperties = properties.find((categories: any) => {
    console.log('categories', categories);
    console.log('categories.url', categories.url);

    console.log('myPropertyCategory#####', categories.url == selectedNav);

    return categories.url == selectedNav;
  });

  console.log('myProperties######', profile?.properties?.includes(1));
  console.log('myProperties######', profile?.hotelProperties);

  useEffect(() => {
    if (profile?.hotelProperties) {
      const myProps = profile?.hotelProperties?.map((item: any) => item.id);
      setCheckedProperties(myProps);
    }
  }, [profile, properties]);

  const changeCheckboxHandler = (checked: any, id: any) => {
    console.log('event', checked);

    if (checked) {
      setCheckedProperties([...checkedProperties, id]);
      setUncheckedProperties(
        uncheckedProperties.filter((item: any) => item !== id)
      );
    } else {
      setCheckedProperties(
        checkedProperties.filter((item: any) => item !== id)
      );
      setUncheckedProperties([...uncheckedProperties, id]);
    }
  };

  const submitHandler = async (values: any) => {
    console.log('values', values);

    const newValues = profile?.hotelProperties?.filter((item: any) =>
      uncheckedProperties?.includes(item.id)
    );

    console.log('newValues', newValues);

    newValues.push(...checkedProperties);

    console.log('newValues', newValues);

    const response = await updateHotelProfile(profile.id, {
      properties: newValues,
    });

    if (response) {
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated.',
        duration: 3000,
      });
    }
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

      {myProperties.subCategories.map((subCategory: any) => (
        <div>
          <div className="mb-4">
            <p>{subCategory.name}</p>
          </div>
          {subCategory.properties.map((property: any) => (
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
