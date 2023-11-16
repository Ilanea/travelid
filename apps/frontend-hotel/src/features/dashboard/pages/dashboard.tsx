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

const data = [
  {
    name: 'April',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'May',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'June',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'July',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'August',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'September',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Dashboard = () => {
  return (
    <div>
      <div className="drop-shadow-card bg-gray-100 p-6 rounded-xl">
        <div className="pb-5">
          <h3 className="text-2xl font-semibold">Bookings</h3>
          <p className="text-gray-400 font-light">Last 6 month</p>
        </div>
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
      </div>
    </div>
  );
};

export default Dashboard;
