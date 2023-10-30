import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button, Input } from '@libs/ui-web';

//import { DataTableViewOptions } from "@/app/examples/tasks/components/data-table-view-options"
import { priorities, statuses } from '../data/data';
import { BookingsTableFacetedFilter } from './bookings-table-faceted-filter';

interface BookingsTableToolbarProps<TData> {
  table: Table<TData>;
}

export function BookingsTableToolbar<TData>({
  table,
}: BookingsTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter guests..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('status') && (
          <BookingsTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn('priority') && (
          <BookingsTableFacetedFilter
            column={table.getColumn('priority')}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/*  <DataTableViewOptions table={table} /> */}
    </div>
  );
}
