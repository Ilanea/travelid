import '@mdxeditor/editor/style.css';
import { useEffect, useState } from 'react';

import { Button, Separator, toast } from '@libs/ui-web';

import CustomMDXEditor from '@hotel/components/mdx-editor';

import { updateHotelProfile } from '../api/update-profile';

export function DescriptionForm({ profile }: any) {
  const [description, setDescription] = useState<any>();
  function onSubmit() {
    const response = updateHotelProfile(profile.id, { description });

    console.log('response', response);

    if (response) {
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated.',
        duration: 3000,
      });
    }
  }

  useEffect(() => {
    setDescription(profile?.description);
  }, [profile]);

  if (!description) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Description</h3>
        <p className="text-sm text-muted-foreground">
          Give guests a sense of who you are.
        </p>
      </div>
      <Separator />

      <CustomMDXEditor markdown={description} onChange={setDescription} />
      <Button type="submit" onClick={onSubmit}>
        Update description
      </Button>
    </div>
  );
}
