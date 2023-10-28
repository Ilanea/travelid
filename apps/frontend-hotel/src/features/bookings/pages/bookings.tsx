import React from 'react';

import { BookingsTable } from '../components/bookings-table';
import { columns } from '../components/bookings-table-columns';
import { UserNav } from '../components/guest-nav';

const BOOKINGS_DATA = [
  {
    id: '8782',
    fullName: 'John Doe',
    email: 'john@doe.com',
    status: 'confirmed',
    label: 'business',
    checkIn: '2023-11-10',
    checkOut: '2023-11-12',
    priority: 'high',
  },
  {
    id: '8785',
    fullName: 'Max Schwarz',
    email: 'max@schwarz.com',
    status: 'confirmed',
    label: 'private',
    checkIn: '2023-11-14',
    checkOut: '2023-11-18',
    priority: 'medium',
  },
];

function Bookings() {
  return (
    <div>
      <div className="hidden h-full flex-1 flex-col p-8 md:flex">
        <div className="flex items-center space-x-2"></div>
      </div>
      <BookingsTable data={BOOKINGS_DATA} columns={columns} />
    </div>
  );
}

export default Bookings;
