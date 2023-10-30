import React from 'react';

import { BookingsTable } from '../components/bookings-table';
import { BookingTableColumns } from '../components/bookings-table-columns';

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
  {
    id: '8786',
    fullName: 'Mario Bedenk',
    email: 'mario@bedenk.com',
    status: 'in progress',
    label: 'private',
    checkIn: '2023-12-24',
    checkOut: '2023-12-30',
    priority: 'high',
  },
  {
    id: '8787',
    fullName: 'Heinz Mayr',
    email: 'heinz@mayr.com',
    status: 'booked',
    label: 'business',
    checkIn: '2023-11-28',
    checkOut: '2023-12-01',
    priority: 'low',
  },
  {
    id: '8788',
    fullName: 'Dominik Botzang',
    email: 'dominik@botzang.com',
    status: 'confirmed',
    label: 'private',
    checkIn: '2023-12-01',
    checkOut: '2023-12-02',
    priority: 'medium',
  },
  {
    id: '8789',
    fullName: 'Matthias Falbesoner',
    email: 'matthias@falbesoner.com',
    status: 'confirmed',
    label: 'private',
    checkIn: '2023-11-21',
    checkOut: '2023-12-12',
    priority: 'medium',
  },
  {
    id: '8790',
    fullName: 'Christian Zeller',
    email: 'christian@zeller.com',
    status: 'booked',
    label: 'business',
    checkIn: '2024-01-03',
    checkOut: '2024-01-10',
    priority: 'low',
  },
  {
    id: '8791',
    fullName: 'Christoph Egger',
    email: 'christoph@egger.com',
    status: 'canceled',
    label: 'business',
    checkIn: '2024-01-05',
    checkOut: '2024-01-07',
    priority: 'low',
  },
  {
    id: '8792',
    fullName: 'Pascal Genctan',
    email: 'pascal@genctan.com',
    status: 'booked',
    label: 'private',
    checkIn: '2023-12-30',
    checkOut: '2024-01-07',
    priority: 'medium',
  },
  {
    id: '8793',
    fullName: 'Andrea Corradini',
    email: 'andrea@corradini.com',
    status: 'canceled',
    label: 'business',
    checkIn: '2024-02-02',
    checkOut: '2024-02-07',
    priority: 'high',
  },
  {
    id: '8794',
    fullName: 'Matthias Janetschek',
    email: 'matthias@janetschek.com',
    status: 'booked',
    label: 'business',
    checkIn: '2024-02-02',
    checkOut: '2024-02-07',
    priority: 'high',
  },
  {
    id: '8795',
    fullName: 'Pascal Schoettle',
    email: 'pascal@schoettle.com',
    status: 'confirmed',
    label: 'business',
    checkIn: '2024-02-02',
    checkOut: '2024-02-07',
    priority: 'high',
  },
];

function Bookings() {
  return (
    <div>
      <div className="hidden h-full flex-1 flex-col p-8 md:flex">
        <div className="flex items-center space-x-2"></div>
      </div>
      <BookingsTable data={BOOKINGS_DATA} columns={BookingTableColumns} />
    </div>
  );
}

export default Bookings;
