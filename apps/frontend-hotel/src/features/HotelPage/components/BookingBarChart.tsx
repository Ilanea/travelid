import { useState } from 'react';
import {
  Bar,
  BarChart,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Button } from '@libs/ui-web';

import DashboardCard from '@hotel/components/dashboard-card';
import { exportToExcel } from '@hotel/utils/exports';

interface DataEntry {
  day?: string;
  month?: number;
  year?: number;
  Bookings: number;
}

type BookingData = {
  day: string;
  Bookings: number;
};

type BookingBarChartProps = {
  filteredData: BookingData[];
};
const BookingBarChart = ({ filteredData }: BookingBarChartProps) => {
  const [view, setView] = useState<'daily' | 'monthly' | 'yearly'>('daily');

  const chartData: DataEntry[] =
    view === 'daily'
      ? filteredData
      : view === 'monthly'
      ? consolidateToMonthly(filteredData)
      : view === 'yearly'
      ? consolidateToYearly(filteredData)
      : [];

  function consolidateToMonthly(data: DataEntry[]): DataEntry[] {
    const monthlyData: { [key: number]: DataEntry } = {};

    data.forEach((entry) => {
      const month = new Date(entry.day!).getMonth() + 1;
      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          Bookings: 0,
        };
      }
      monthlyData[month].Bookings += entry.Bookings;
    });

    return Object.values(monthlyData);
  }

  function consolidateToYearly(data: DataEntry[]): DataEntry[] {
    const yearlyData: { [key: number]: DataEntry } = {};

    data.forEach((entry) => {
      const year = new Date(entry.day!).getFullYear();
      if (!yearlyData[year]) {
        yearlyData[year] = {
          year,
          Bookings: 0,
        };
      }
      yearlyData[year].Bookings += entry.Bookings;
    });

    return Object.values(yearlyData);
  }

  const maxY = Math.ceil(
    Math.max(...chartData.map((item) => item.Bookings)) * 1.1
  );

  return (
    <div id="barChart" className="w-1/2">
      <DashboardCard
        title="Monthly Bookings"
        button={
          <Button onClick={() => exportToExcel(filteredData, 'bookings')}>
            Export
          </Button>
        }
        subtitle={
          <div>
            <label className="text-gray-400 mr-4 text-sm items-center p-3 rounded-full cursor-pointer">
              <input
                type="radio"
                name="view"
                value="daily"
                checked={view === 'daily'}
                onChange={() => setView('daily')}
              />
              Täglich
            </label>
            <label className="text-gray-400 mr-4 text-sm items-center p-3 rounded-full cursor-pointer">
              <input
                type="radio"
                name="view"
                value="monthly"
                checked={view === 'monthly'}
                onChange={() => setView('monthly')}
              />
              Monatlich
            </label>
            <label className="text-gray-400 mr-4 text-sm">
              <input
                type="radio"
                name="view"
                value="yearly"
                checked={view === 'yearly'}
                onChange={() => setView('yearly')}
              />
              Jährlich
            </label>
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis
              dataKey={
                view === 'daily' ? 'day' : view === 'monthly' ? 'month' : 'year'
              }
              stroke="#306395"
            />
            <YAxis domain={[0, maxY]} stroke="#1c3c5c" />

            <Tooltip />
            <Legend />
            <Bar dataKey="Bookings" fill="#063461">
              <LabelList
                dataKey="Bookings"
                position="top"
                className="text-primary"
                style={{ fill: '#003366' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </DashboardCard>
    </div>
  );
};

export default BookingBarChart;
