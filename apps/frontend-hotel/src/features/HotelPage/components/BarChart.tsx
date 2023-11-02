// BarChartComponent.tsx
import React from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface BookingsBarChartProps {
  data: {
    day: string;
    Bookings: number;
  }[];
}

const BookingsBarChart: React.FC<BookingsBarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Bookings" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BookingsBarChart;
