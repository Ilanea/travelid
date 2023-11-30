import clsx from 'clsx';
import React from 'react';
import {
  Area,
  AreaChart,
  CartesianAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Icons } from '@libs/icons-web';

import DashboardCard from '@hotel/components/dashboard-card';
import DashboardCardSmall from '@hotel/components/dashboard-card-small';

const data = [
  {
    name: 'April',
    uv: 30,
    pv: 13,
    amt: 22,
  },
  {
    name: 'May',
    uv: 20,
    pv: 98,
    amt: 22,
  },
  {
    name: 'June',
    uv: 27,
    pv: 39,
    amt: 20,
  },
  {
    name: 'July',
    uv: 18,
    pv: 48,
    amt: 21,
  },
  {
    name: 'August',
    uv: 23,
    pv: 38,
    amt: 25,
  },
  {
    name: 'September',
    uv: 34,
    pv: 43,
    amt: 21,
  },
];

const bookings_data = [
  {
    email: 'alex@email.at',
    checkIn: '2023-12-10',
    checkOut: '2023-12-12',
    duration: 2,
    type: 'Business',
  },
  {
    email: 'maria@email.at',
    checkIn: '2024-01-10',
    checkOut: '2024-01-12',
    duration: 2,
    type: 'Business',
  },
  {
    email: 'harald@email.at',
    checkIn: '2024-01-14',
    checkOut: '2024-01-18',
    duration: 4,
    type: 'Private',
  },
  {
    email: 'peter@email.at',
    checkIn: '2024-01-20',
    checkOut: '2024-01-22',
    duration: 2,
    type: 'Business',
  },
  {
    email: 'christina@email.at',
    checkIn: '2024-01-24',
    checkOut: '2024-01-26',
    duration: 2,
    type: 'Private',
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-4">
      <div className="flex w-full space-x-4">
        <DashboardCardSmall
          title="Bookings"
          value="+ 34"
          subvalue="+ 20.1% from last month"
          icon={<Icons.calendar className="w-6 h-6 text-gray-400" />}
        />
        <DashboardCardSmall
          title="Views"
          value="+ 1873"
          subvalue="+ 15.9% from last month"
          icon={<Icons.eye className="w-6 h-6 text-gray-400" />}
        />
        <DashboardCardSmall
          title="Rating"
          value="4.2"
          subvalue="- 0.25% from last month"
          icon={<Icons.star className="w-6 h-6 text-gray-400" />}
        />
        <DashboardCardSmall
          title="Rewards"
          value="+ 23"
          subvalue="+ 34.6% from last month"
          icon={<Icons.gift className="w-6 h-6 text-gray-400" />}
        />
      </div>
      <div className="flex w-full space-x-4">
        <DashboardCard title="Bookings" subtitle="Last 6 month">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              width={730}
              height={250}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid vertical={false} strokeDasharray="3 6" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardCard>
        <DashboardCard
          title="Latest Bookings"
          subtitle="Last 5 bookings"
          className="w-1/2"
        >
          <div className="space-y-2">
            {bookings_data.map((item) => (
              <div
                key={item.email}
                className="flex flex-row items-center justify-between"
              >
                <div className="flex flex-col">
                  <p className="">{item.email}</p>
                  <p className="text-gray-400 font-light">
                    {item.checkIn} ({item.duration} days)
                  </p>
                </div>
                <div className="flex flex-row items-center space-x-2 px-3 py-1 rounded-full bg-black">
                  <p className="text-white text-sm">{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
      <div className="flex w-full space-x-4">
        <DashboardCard
          title="Latest Bookings"
          subtitle="Last 5 bookings"
          className="w-1/2"
        >
          <div className="space-y-2">
            {bookings_data.map((item) => (
              <div
                key={item.email}
                className="flex flex-row items-center justify-between"
              >
                <div className="flex flex-col">
                  <p className="">{item.email}</p>
                  <p className="text-gray-400 font-light">
                    {item.checkIn} ({item.duration} days)
                  </p>
                </div>
                <div className="flex flex-row items-center space-x-2 px-3 py-1 rounded-full bg-black">
                  <p className="text-white text-sm">{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
        <DashboardCard title="Bookings" subtitle="Last 6 month">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              width={730}
              height={250}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid vertical={false} strokeDasharray="3 6" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;
