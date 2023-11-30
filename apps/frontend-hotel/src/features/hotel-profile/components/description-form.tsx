import { zodResolver } from '@hookform/resolvers/zod';
import { ListsToggle } from '@mdxeditor/editor';
import { MDXEditor } from '@mdxeditor/editor/MDXEditor';
import { headingsPlugin } from '@mdxeditor/editor/plugins/headings';
import { listsPlugin } from '@mdxeditor/editor/plugins/lists';
import { quotePlugin } from '@mdxeditor/editor/plugins/quote';
import { thematicBreakPlugin } from '@mdxeditor/editor/plugins/thematic-break';
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar';
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles';
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo';
import '@mdxeditor/editor/style.css';
import { set } from 'date-fns';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, Separator, toast } from '@libs/ui-web';

import CustomMDXEditor from '@hotel/components/mdx-editor';

import { updateHotelProfile } from '../api/update-profile';

export function DescriptionForm({ profile }) {
  const [description, setDescription] = useState();
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
