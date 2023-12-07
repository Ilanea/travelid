import { Table } from '@tanstack/react-table';
import { uniqBy } from 'lodash';
import { useState } from 'react';

import { Icons } from '@libs/icons-web';
import {
  Button,
  Input,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  toast,
} from '@libs/ui-web';

import { createProperty } from '../../api/create-property';
//import { DataTableViewOptions } from "@/app/examples/tasks/components/data-table-view-options"
import { CategoryCombobox } from './category-combobox';
import { RewardsTableFacetedFilter } from './properties-table-faceted-filter';

interface RewardsTableToolbarProps<TData> {
  table: Table<TData>;
  data: any[];
}

export function RewardsTableToolbar<TData>({
  table,
  data,
}: RewardsTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [propertyName, setPropertyName] = useState('');

  const categories = uniqBy(data, 'category').map((item) => ({
    value: item.categoryId.toString(),
    label: item.category,
  }));
  const subCategories = uniqBy(data, 'subCategory').map((item) => ({
    value: item.subCategoryId.toString(),
    label: item.subCategory,
  }));

  const inputChangeHandler = (event: any) => {
    setPropertyName(event.target.value);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    console.log('submitHandler', event);
    const response = createProperty({
      name: propertyName,
      subCategoryId: parseInt(subCategory),
    });
    console.log('response', response);
    if (response) {
      toast({
        title: 'Property created',
        description: 'Your property has been created.',
        duration: 3000,
      });
    }
  };

  console.log('subCategory', subCategory);

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
          <SheetTrigger>Add Property</SheetTrigger>
        </Button>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add a new property</SheetTitle>
            <SheetDescription className="pb-4">
              Here you can add a new property which will show up in the hotel
              profile.
            </SheetDescription>
            <CategoryCombobox
              data={categories}
              value={category}
              setValue={setCategory}
              title="Select category ..."
              searchTitle="Search category ..."
            />
            <CategoryCombobox
              data={subCategories}
              value={subCategory}
              setValue={setSubCategory}
              title="Select subcategory ..."
              searchTitle="Search subcategory ..."
            />
            <Input
              type="text"
              placeholder="Property name"
              value={propertyName}
              onChange={inputChangeHandler}
            />
            <Button className="mt-4" onClick={submitHandler}>
              Save property
            </Button>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
