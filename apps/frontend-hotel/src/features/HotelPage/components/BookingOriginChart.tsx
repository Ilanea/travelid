import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { Button } from '@libs/ui-web';

import DashboardCard from '@hotel/components/dashboard-card';
import { exportToExcel } from '@hotel/utils/exports';

import { CHARTS_COLORS } from '../consts/colors';

const bookingSourcesData = [
  { source: 'Everyhome', bookings: 1200 },
  { source: 'Mail', bookings: 300 },
  { source: 'Phone', bookings: 20 },
];

const BookingOriginChart = () => {
  return (
    <DashboardCard
      className="w-1/4"
      title="Booking Origin"
      subtitle="How do you guests book?"
      button={
        <Button
          className=""
          onClick={() => exportToExcel(bookingSourcesData, 'booking_sources')}
        >
          Export
        </Button>
      }
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={bookingSourcesData}
            cx="50%"
            cy="50%"
            outerRadius={130}
            fill="#8884d8"
            dataKey="bookings"
            nameKey="source"
          >
            {bookingSourcesData.map((entry, index) => (
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
    </DashboardCard>
  );
};

export default BookingOriginChart;
