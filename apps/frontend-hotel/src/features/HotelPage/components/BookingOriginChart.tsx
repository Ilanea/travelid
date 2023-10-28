import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { exportToExcel } from '@hotel/utils/exports';

import { CHARTS_COLORS } from '../consts/colors';

const bookingSourcesData = [
  { source: 'Everyhome', bookings: 1200 },
  { source: 'Mail', bookings: 300 },
  { source: 'Phone', bookings: 20 },
];

const BookingOriginChart = () => {
  return (
    <div className="w-1/4  text-white border pl-5 rounded border-black bg-gray-200">
      <div className="flex justify-between items-center p-3">
        {/* This is the flex container */}
        <h2 className="text-xl font-bold mb-4 text-primary pl-3 pt-3 pr-3">
          Buchungs-Herkunft:
        </h2>
        <button
          className="bg-green-500 hover:bg-green-700 text-primary font-bold py-2 px-4 rounded text-xs w-1/2"
          onClick={() => exportToExcel(bookingSourcesData, 'booking_sources')}
        >
          Export to Excel
        </button>
      </div>
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
    </div>
  );
};

export default BookingOriginChart;
