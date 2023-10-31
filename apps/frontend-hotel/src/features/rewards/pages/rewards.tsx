import React from 'react';

import { Button } from '@libs/ui-web';

import { RewardsTable } from '../components/bookings-table';
import { BookingTableColumns } from '../components/bookings-table-columns';

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
  return (
    <div>
      <div className="hidden h-full flex-1 flex-col p-8 md:flex">
        <div className="flex items-center space-x-2"></div>
      </div>
      <RewardsTable data={REWARDS_DATA} columns={BookingTableColumns} />
    </div>
  );
}

export default Rewards;
