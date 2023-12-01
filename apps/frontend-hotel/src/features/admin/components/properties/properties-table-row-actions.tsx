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

import { taskSchema } from '../../data/schema';

interface RewardsTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function RewardsTableRowActions<TData>({
  row,
}: RewardsTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);

  return (
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
        <DropdownMenuItem>Change Status</DropdownMenuItem>
        <DropdownMenuItem>View Guest Profile</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
