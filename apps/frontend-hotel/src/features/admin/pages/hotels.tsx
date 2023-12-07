import { log } from 'console';
import React, { useEffect, useState } from 'react';

import { Button } from '@libs/ui-web';

import { useAuthStore } from '@hotel/features/auth/store/auth';

import { getHotels } from '../api/get-hotels';
import { HotelsTable } from '../components/hotels/hotels-table';
import { RewardsTableColumns } from '../components/hotels/hotels-table-columns';
import { RewardsTable } from '../components/properties/properties-table';

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

function HotelsPage() {
  const authUser = useAuthStore((state) => state.user);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      console.log('get rewards');
      const response = await getHotels();

      console.log('response hotels', response);

      setRewards(response);
    };
    fetchHotels();
  }, []);

  return (
    <div>
      <div className="hidden h-full flex-1 flex-col p-8 md:flex">
        <div className="flex items-center space-x-2"></div>
      </div>
      <HotelsTable data={rewards} columns={RewardsTableColumns} />
    </div>
  );
}

export default HotelsPage;
