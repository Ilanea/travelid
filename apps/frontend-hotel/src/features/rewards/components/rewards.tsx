import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { NavLink } from 'react-router-dom';

import { Icons } from '@libs/icons-web';
import { Button, Input } from '@libs/ui-web';

//import { DataTableViewOptions } from "@/app/examples/tasks/components/data-table-view-options"
import { priorities, statuses } from '../data/data';
import { RewardsTableFacetedFilter } from './rewards-table-faceted-filter';

interface RewardsTableToolbarProps<TData> {
  table: Table<TData>;
}

export function RewardsTableToolbar<TData>({
  table,
}: RewardsTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter rewards..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('status') && (
          <RewardsTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statuses}
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
      <NavLink to="/rewards/edit">
        <Button>
          <Icons.plusCircle className="mr-2 h-6 w-6" />
          Add Reward
        </Button>
      </NavLink>
    </div>
  );
}
