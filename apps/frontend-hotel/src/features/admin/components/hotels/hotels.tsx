import { Table } from '@tanstack/react-table';
import { useState } from 'react';

import { Icons } from '@libs/icons-web';
import {
  Button,
  Input,
  Label,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  toast,
} from '@libs/ui-web';

import { createHotel } from '../../api/create-hotel';

interface RewardsTableToolbarProps<TData> {
  table: Table<TData>;
  data: any[];
}

export function RewardsTableToolbar<TData>({
  table,
  data,
}: RewardsTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [hotelName, setHotelName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const submitHandler = (event: any) => {
    event.preventDefault();
    const response = createHotel({
      name: hotelName,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      subtitle: subtitle,
    });

    if (response) {
      toast({
        title: 'Hotel created',
        description: 'New hotel has been created.',
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter properties..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <Sheet>
        <Button>
          <Icons.plusCircle className="mr-2 h-6 w-6" />
          <SheetTrigger>Add Hotel</SheetTrigger>
        </Button>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add a new hotel</SheetTitle>
            <SheetDescription className="pb-4">
              Here you can add a new hotel for a new customer.
            </SheetDescription>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Hotel Name</Label>
              <Input
                type="text"
                id="email"
                placeholder="Hotel Buxtehude"
                value={hotelName}
                onChange={(event) => setHotelName(event.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Subtitle</Label>
              <Input
                type="text"
                id="email"
                placeholder="Best hotel in town"
                value={subtitle}
                onChange={(event) => setSubtitle(event.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Address</Label>
              <Input
                type="text"
                id="email"
                placeholder="Max Mustermann Str. 1, 12345 Musterstadt"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Phone number</Label>
              <Input
                type="text"
                id="email"
                placeholder="+43 664 123 456 789"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <Button className="mt-4" onClick={submitHandler}>
              Save hotel
            </Button>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
