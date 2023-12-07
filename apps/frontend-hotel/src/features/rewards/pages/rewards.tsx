import { log } from 'console';
import React, { useEffect, useState } from 'react';

import { Button } from '@libs/ui-web';

import { useAuthStore } from '@hotel/features/auth/store/auth';

import { getRewards } from '../api/get-rewards';
import { RewardsTable } from '../components/rewards-table';
import { RewardsTableColumns } from '../components/rewards-table-columns';

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

function Rewards() {
  const authUser = useAuthStore((state) => state.user);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      console.log('get rewards');

      const response = await getRewards(authUser?.hotelsAsAdmin[0].id);
      console.log(response);

      setRewards(response);
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <div className="hidden h-full flex-1 flex-col p-8 md:flex">
        <div className="flex items-center space-x-2"></div>
      </div>
      <RewardsTable data={rewards} columns={RewardsTableColumns} />
    </div>
  );
}

export default Rewards;
