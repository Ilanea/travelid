// Bookings.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function Bookings() {
  const bookingsData = [
    {
      name: 'John Doe',
      address: '123 Elm St',
      country: 'USA',
      tel: '123-456-7890',
    },
    {
      name: 'Jane Smith',
      address: '456 Oak St',
      country: 'Canada',
      tel: '456-789-0123',
    },
    {
      name: 'Alice White',
      address: '789 Maple St',
      country: 'UK',
      tel: '789-012-3456',
    },
    {
      name: 'David Green',
      address: '321 Birch St',
      country: 'Australia',
      tel: '012-345-6789',
    },
    {
      name: 'Lucas Black',
      address: '654 Cedar St',
      country: 'South Africa',
      tel: '345-678-9012',
    },
    {
      name: 'Emma Stone',
      address: '987 Pine St',
      country: 'New Zealand',
      tel: '678-901-2345',
    },
    {
      name: 'Oliver Brown',
      address: '147 Fir St',
      country: 'Germany',
      tel: '901-234-5678',
    },
    {
      name: 'Sophia Taylor',
      address: '258 Hemlock St',
      country: 'France',
      tel: '234-567-8901',
    },
    {
      name: 'Mason Gray',
      address: '369 Redwood St',
      country: 'Italy',
      tel: '567-890-1234',
    },
    {
      name: 'Isabella Walker',
      address: '480 Spruce St',
      country: 'Spain',
      tel: '890-123-4567',
    },
    {
      name: 'Benjamin Blue',
      address: '159 Cypress St',
      country: 'Japan',
      tel: '012-678-9012',
    },
    {
      name: 'Mia James',
      address: '951 Sycamore St',
      country: 'South Korea',
      tel: '123-890-4567',
    },
    {
      name: 'Ethan Thompson',
      address: '762 Chestnut St',
      country: 'India',
      tel: '234-012-5678',
    },
    {
      name: 'Aria Wood',
      address: '573 Beech St',
      country: 'China',
      tel: '345-123-6789',
    },
    {
      name: 'Logan Johnson',
      address: '684 Alder St',
      country: 'Russia',
      tel: '456-234-7890',
    },
    {
      name: 'Ava Lee',
      address: '295 Palm St',
      country: 'Brazil',
      tel: '567-345-8901',
    },
    {
      name: 'Michael Roberts',
      address: '916 Willow St',
      country: 'Mexico',
      tel: '678-456-9012',
    },
    {
      name: 'Lily Wright',
      address: '527 Teak St',
      country: 'Chile',
      tel: '789-567-0123',
    },
    {
      name: 'Daniel White',
      address: '138 Ash St',
      country: 'Argentina',
      tel: '890-678-1234',
    },
    {
      name: 'Zoe Hall',
      address: '249 Dogwood St',
      country: 'Egypt',
      tel: '901-789-2345',
    },
    {
      name: 'Lucas Patel',
      address: '360 Oakwood St',
      country: 'Nigeria',
      tel: '012-345-6789',
    },
    {
      name: 'Sophie Adams',
      address: '471 Pinecone St',
      country: 'Kenya',
      tel: '123-456-7890',
    },
  ];

  return (
    <div className="min-h-screen relative pt-5 pl-5 bg-gradient-to-tr from-cyan-300 to-sky-300">
      {' '}
      {/* Added gradient background */}
      <div className="flex items-start mb-5">
        {' '}
        {/* Flex container to position items side by side */}
        <img
          src="/images/hotel-logo-transparent.png"
          alt="Hotel Logo"
          style={{ width: '350px' }}
          className="h-28"
        />
      </div>
      <div className="flex space-x-4 mb-4 pr-4">
        <button className="bg-gradient-to-r from-cyan-300 to-blue-400 text-white py-5 px-4 w-72 h-15 font-extrabold text-9x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md">
          <Link to="/HotelPage">Overview</Link>
        </button>
        <button className="bg-gradient-to-r from-cyan-300 to-blue-400 text-white py-2 px-4 w-72 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md">
          <Link to="/Bookings">Bookings</Link>
        </button>
        <button className="bg-gradient-to-r from-cyan-300 to-blue-400 text-white py-2 px-4 w-72 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md">
          Guestlist
        </button>
        <button className="bg-gradient-to-r from-cyan-300 to-blue-400 text-white py-2 px-4 w-72 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md">
          Rewards
        </button>
        <button className="bg-gradient-to-r from-cyan-300 to-blue-400 text-white py-2 px-4 w-72 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md">
          Info
        </button>
        <button className="bg-gradient-to-r from-cyan-300 to-blue-400 text-white py-2 px-4 w-72 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md">
          Settings
        </button>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-4 pr-4">Bookings:</h2>
        <table className="min-w-full table-auto pr-4">
          <thead>
            <tr className="bg-gradient-to-r from-cyan-300 to-blue-400 text-white pr-4">
              <th className="px-4 py-2 ">Name</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Country</th>
              <th className="px-4 py-2">Telephone</th>
              <th className="px-4 py-2">Contact</th>
            </tr>
          </thead>
          <tbody>
            {bookingsData.map((person, index) => (
              <tr
                key={index}
                className="bg-white text-black border-t border-gray-200 pr-4"
              >
                <td className="px-4 py-2 font-bold">{person.name}</td>
                <td className="px-4 py-2">{person.address}</td>
                <td className="px-4 py-2">{person.country}</td>
                <td className="px-4 py-2">{person.tel}</td>
                <td className="px-4 py-2 text-center">💬</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Bookings;
