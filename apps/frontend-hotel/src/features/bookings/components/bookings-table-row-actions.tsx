'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@libs/ui-web';

import { bookingSchema } from '../data/schema';
import GuestProfile from './guest-profile';

interface BookingsTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function BookingsTableRowActions<TData>({
  row,
}: BookingsTableRowActionsProps<TData>) {
  const task = bookingSchema.parse(row.original);

  return (
    <div className="flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>Cancel Booking</DropdownMenuItem>
          <DropdownMenuItem>View Guest Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <GuestProfile />
    </div>
  );
}
