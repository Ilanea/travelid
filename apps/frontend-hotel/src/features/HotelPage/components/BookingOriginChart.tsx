import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CHARTS_COLORS } from '../consts/colors';
import { Button } from "@libs/ui-web";
import { exportToExcel } from "@hotel/utils/exports";

type BookingData = {
  day: string;
  Bookings: number;
  BookingsViaPhone: number;
  BookingsViaMail: number;
  BookingsViaBonAway: number;
};

type BookingOriginChartProps = {
  filteredData: BookingData[];
};

const BookingOriginChart = ({ filteredData }: BookingOriginChartProps) => {
  // Transform filteredData into pie chart format
  const pieChartData = filteredData.reduce((acc, item) => {
    acc[0].value += item.BookingsViaPhone; // Sum phone bookings
    acc[1].value += item.BookingsViaMail; // Sum mail bookings
    acc[2].value += item.BookingsViaBonAway; // Sum Bon Away bookings
    return acc;
  }, [
    { name: 'Phone', value: 0 },
    { name: 'Mail', value: 0 },
    { name: 'Bon Away', value: 0 }
  ]);

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow w-full w-1/4">
      <div className="flex justify-between items-center p-3">
        <h2 className="text-xl font-bold mb-4 text-primary pl-3 pt-3 pr-3">
          Buchungs-Herkunft:
        </h2>
        <Button
          className="bg-green-500"
          onClick={() => exportToExcel(pieChartData, 'booking_sources')}
        >
          Export to Excel
        </Button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={130}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHARTS_COLORS[index % CHARTS_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingOriginChart;
