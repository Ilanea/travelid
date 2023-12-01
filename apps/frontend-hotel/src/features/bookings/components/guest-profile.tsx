import React from 'react';

import { Icons } from '@libs/icons-web';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@libs/ui-web';

const GuestProfile = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Icons.user className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Herbert Huber</DialogTitle>
          <DialogDescription>
            <p>herbert@gast.at</p>
            <p>Check-In: 01.05.2024</p>
            <p>Check-In: 03.05.2024</p>
            <p>Preferences: Extra Pillow, Gluten-Free</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GuestProfile;
