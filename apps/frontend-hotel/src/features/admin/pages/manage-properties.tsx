import { prop } from '@mdxeditor/editor';
import { log } from 'console';
import { sub } from 'date-fns';
import React, { useEffect, useState } from 'react';

import { useAuthStore } from '@hotel/features/auth/store/auth';
import { getPropertyCategories } from '@hotel/features/hotel-profile/api/get-property-categories';

import { RewardsTable } from '../components/properties-table';
import { RewardsTableColumns } from '../components/properties-table-columns';

const REWARDS_DATA = [
  {
    id: '8782',
    name: 'Thai Massage',
    price: 55,
    category: 'spa',
    validFrom: '2023-11-10',
    validUntil: '2023-11-12',
    status: 'active',
  },
  {
    id: '8782',
    name: 'Thai Massage',
    price: 55,
    category: 'spa',
    validFrom: '2023-11-10',
    validUntil: '2023-11-12',
    status: 'active',
  },
  {
    id: '8782',
    name: 'Thai Massage',
    price: 55,
    category: 'spa',
    validFrom: '2023-11-10',
    validUntil: '2023-11-12',
    status: 'active',
  },
  {
    id: '8782',
    name: 'Thai Massage',
    price: 55,
    category: 'spa',
    validFrom: '2023-11-10',
    validUntil: '2023-11-12',
    status: 'active',
  },
];

function ManageProperties() {
  const authUser = useAuthStore((state) => state.user);
  const [properties, setProperties] = useState();

  useEffect(() => {
    const fetchProperties = async () => {
      console.log('get rewards');

      const response = await getPropertyCategories();
      console.log(response);

      console.log('get properties', response);
      let myProperties = [];
      response.forEach((category) => {
        category.subCategories.forEach((subCategory) => {
          subCategory.properties.forEach((property) => {
            myProperties.push({
              category: category.name,
              categoryId: category.id,
              subCategory: subCategory.name,
              subCategoryId: subCategory.id,
              name: property.name,
              id: property.id,
            });
          });
        });
      });

      setProperties(myProperties);
    };
    fetchProperties();
  }, []);

  if (!properties) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="hidden h-full flex-1 flex-col p-8 md:flex">
        <div className="flex items-center space-x-2"></div>
      </div>
      <RewardsTable data={properties} columns={RewardsTableColumns} />
    </div>
  );
}

export default ManageProperties;
