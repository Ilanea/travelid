'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge, Checkbox } from '@libs/ui-web';

import { labels, priorities, statuses } from '../data/data';
import { Task } from '../data/schema';
import { RewardsTableColumnHeader } from './rewards-table-column-header';
import { RewardsTableRowActions } from './rewards-table-row-actions';

export const RewardsTableColumns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <RewardsTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'name',
    header: ({ column }) => (
      <RewardsTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('name')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'validFrom',
    header: ({ column }) => (
      <RewardsTableColumnHeader column={column} title="Valid From" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {new Date(row.getValue('validFrom')).toLocaleDateString('de-DE', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'validUntil',
    header: ({ column }) => (
      <RewardsTableColumnHeader column={column} title="Valid Until" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {new Date(row.getValue('validUntil')).toLocaleDateString('de-DE', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'active',
    header: ({ column }) => (
      <RewardsTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      console.log('isActive ', row.getValue('active'));

      const isActive = row.getValue('active') === true ? 'Active' : 'Inactive';

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">{isActive}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <RewardsTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('price') + ' Points'}
          </span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <RewardsTableRowActions row={row} />,
  },
];
