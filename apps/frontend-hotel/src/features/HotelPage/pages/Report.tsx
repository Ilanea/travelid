import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FaBed,
  FaCookieBite,
  FaHistory,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from 'react-icons/fa';
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { utils, write } from 'xlsx';

import { Button } from '@libs/ui-web';

import BookingsBarChart from '../components/BarChart';
import BedIcon from '../components/BedIcon';
import BoxComponent from '../components/BoxComponent';
// Import the styles
import StatsBox from '../components/StatsBox';

function Report() {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(new Date().getFullYear(), 0, 1)
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [view, setView] = useState<'daily' | 'monthly' | 'yearly'>('daily');

  interface BookingData {
    day: string;
    Bookings: number;
  }

  const mockupDailyBookings = [
    { day: '2023-01-01', Bookings: 12 },
    { day: '2023-01-02', Bookings: 8 },
    { day: '2023-01-03', Bookings: 10 },
    { day: '2023-01-04', Bookings: 15 },
    { day: '2023-01-05', Bookings: 9 },
    { day: '2023-01-06', Bookings: 7 },
    { day: '2023-02-07', Bookings: 10 },
    { day: '2023-02-08', Bookings: 13 },
    { day: '2023-02-09', Bookings: 8 },
    { day: '2023-03-10', Bookings: 11 },
    { day: '2023-03-11', Bookings: 14 },
    { day: '2023-04-12', Bookings: 6 },
    { day: '2023-04-13', Bookings: 10 },
    { day: '2023-05-14', Bookings: 12 },
    { day: '2023-05-15', Bookings: 8 },
    { day: '2023-05-16', Bookings: 9 },
    { day: '2023-06-17', Bookings: 13 },
    { day: '2023-06-18', Bookings: 15 },
    { day: '2023-06-19', Bookings: 10 },
    { day: '2023-07-20', Bookings: 12 },
    { day: '2023-07-21', Bookings: 8 },
    { day: '2023-07-22', Bookings: 9 },
    { day: '2023-08-23', Bookings: 13 },
    { day: '2023-08-24', Bookings: 15 },
    { day: '2023-08-25', Bookings: 10 },
    { day: '2023-09-26', Bookings: 12 },
    { day: '2023-09-27', Bookings: 8 },
  ];

  interface BuchungsHerkunft {
    source: string;
    bookings: number;
  }
  const exportToExcel = (data: BookingData[]) => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(blob, 'MonthlyBookings.xlsx');
  };

  const exportToExcelBH = (data: BuchungsHerkunft[]) => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(blob, 'MonthlyBookings.xlsx');
  };

  const bookingSourcesData = [
    { source: 'Everyhome', bookings: 1200 },
    { source: 'Mail', bookings: 300 },
    { source: 'Phone', bookings: 20 },
  ];

  const boxData = [
    { keyword: 'Treuepunkte vergeben', value: '323' },
    { keyword: 'Treuepunkte eingelöst', value: '200' },
    { keyword: 'Einnahmen', value: '43.392 €' },
    { keyword: 'Ausgaben', value: '930 €' },
    { keyword: 'Random fact 1', value: '1337' },
    { keyword: 'Random fact 2', value: '1337' },
  ];
  const statData = [
    {
      icon: <FaBed className="text-green-600" size={50} />,
      value: 15,
      label: 'Betten verfügbar',
    },
    {
      icon: <FaBed className="text-red-600" size={50} />,
      value: 35,
      label: 'Betten belegt',
    },
    {
      icon: <FaCookieBite size={50} />,
      value: 200,
      label: 'Treuepunkte eingelöst',
    },
    {
      icon: <FaHistory size={50} />,
      value: 50,
      label: 'Nächtigungen durch EH',
    },
    {
      icon: <FaRegThumbsUp className="text-green-600" size={50} />,
      value: 423432,
      label: 'Erhaltene Likes',
    },
    {
      icon: <FaRegThumbsDown className="text-red-600" size={50} />,
      value: 0,
      label: 'Erhaltene Dislikes',
    },
  ];

  const COLORS = ['#00008b', '#0000FF', '#0080ff'];

  const initialChartHeight = 400; // You can adjust this as needed
  const [chartHeight, setChartHeight] = React.useState(initialChartHeight);

  const filteredData = mockupDailyBookings.filter((item: any) => {
    const itemDate = new Date(item.day); // Convert to format "YYYY-MM-DD" for Date object

    if (startDate && endDate) {
      return itemDate >= startDate && itemDate <= endDate;
    }

    return true; // or false, depending on your desired behavior when the dates are null
  });

  const exportComponentAsPDF = (
    componentId: string,
    filename: string
  ): void => {
    const input = document.getElementById(componentId);

    if (!input) return; // Added a check to ensure the element exists.

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');

      const pdfWidth = 297; // A4 width in landscape mode in mm
      const pdfHeight = 210; // A4 height in landscape mode in mm

      let imgWidth = (canvas.width * pdfWidth) / canvas.width;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;

      // If the height after scaling exceeds the PDF height, we'll adjust the dimensions.
      if (imgHeight > pdfHeight) {
        imgWidth = (canvas.width * pdfHeight) / canvas.height;
        imgHeight = (canvas.height * pdfHeight) / canvas.height;
      }

      const x = (pdfWidth - imgWidth) / 2; // Position for centering the image horizontally
      const y = (pdfHeight - imgHeight) / 2; // Position for centering the image vertically
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save('filename.pdf');
    });
  };
  interface DataEntry {
    day?: string;
    month?: number;
    year?: number;
    Bookings: number;
  }

  type MonthlyData = {
    [key: number]: {
      month: number;
      Bookings: number;
    };
  };

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
    <div className="min-h-screen relative pl-5 pr-5">
      {' '}
      <div className="flex justify-end space-x-4 mb-5">
        {/* Bookings this week */}
        <div className="text-primary text-xl flex flex-col border rounded p-5 w-1/4 border-primary">
          <div className="flex justify-between items-center">
            <div className="text-lg">Bookings this week</div>
            <BedIcon className="text-primary" />
          </div>
          <div className="flex flex-col mb-3 text-2xl pt-2">
            <div className="font-bold">+13</div>
            <div className="text-sm text-gray-400 ml-2">
              +13% seit der letzten Woche
            </div>
          </div>
        </div>

        {/* Bookings this month */}
        <div className="text-primary text-xl flex flex-col border rounded p-5 w-1/4 border-primary">
          <div className="flex justify-between items-center">
            <div className="text-lg">Bookings this month</div>
            <BedIcon className="text-primary" />
          </div>
          <div className="flex flex-col mb-3 text-2xl pt-2">
            <div className="font-bold">+67</div>
            <div className="text-sm text-gray-400 ml-2">
              +33% seit letztem Monat
            </div>
          </div>
        </div>

        {/* Bookings this year */}
        <div className="text-primary text-xl flex flex-col border rounded p-5 w-1/4 border-primary">
          <div className="flex justify-between items-center">
            <div className="text-lg">Bookings this year</div>
            <BedIcon className="text-primary" />
          </div>
          <div className="flex flex-col mb-3 text-2xl pt-2">
            <div className="font-bold">+189</div>
            <div className="text-sm text-gray-400 ml-2">
              +89% seit letztem Jahr
            </div>
          </div>
        </div>

        {/* Total bookings */}
        <div className="text-primary text-xl flex flex-col border rounded p-5 w-1/4 border-primary">
          <div className="flex justify-between items-center">
            <div className="text-lg">Bookings total</div>
            <BedIcon className="text-primary" />
          </div>
          <div className="flex flex-col mb-3 text-2xl pt-2">
            <div className="font-bold">+456</div>
            <div className="text-sm text-gray-400 ml-2">+189% total</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 justify-center pl-52">
          <span className="text-xl font-bold mb-4 text-primary flex-grow">
            Start Datum:
          </span>
          <DatePicker
            className="border rounded border-black"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <span className="text-xl font-bold mb-4 text-primary flex-grow">
            End Datum:
          </span>
          <DatePicker
            className="border rounded border-black"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
          <div className="flex space-x-4 justify-center pb-4 pl-96">
            <Button
              onClick={() =>
                exportComponentAsPDF('wrapperdiv', 'exported-file.pdf')
              }
            >
              Export as PDF
            </Button>
          </div>
        </div>
      </div>
      <div id="wrapperdiv" className="flex space-x-4">
        {/* Bar Chart */}
        <div
          id="barChart"
          className="w-1/2 pl-5 pr-5 rounded border border-black bg-gray-200"
        >
          <div className="flex justify-between items-center p-3">
            {' '}
            {/* This is the flex container */}
            <h2 className="text-xl font-bold mb-4 text-primary flex-grow pt-4">
              Monatliche Buchungen:
            </h2>
            <div>
              <label className="text-primary mr-4 text-sm">
                <input
                  type="radio"
                  name="view"
                  value="daily"
                  checked={view === 'daily'}
                  onChange={() => setView('daily')}
                />
                Täglich
              </label>
              <label className="text-primary pr-5 text-sm">
                <input
                  type="radio"
                  name="view"
                  value="monthly"
                  checked={view === 'monthly'}
                  onChange={() => setView('monthly')}
                />
                Monatlich
              </label>
              <label className="text-primary mr-4 text-sm">
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
            <button
              className="bg-green-500 hover:bg-green-700 text-primary font-bold py-2 px-4 rounded text-sm"
              onClick={() => exportToExcel(filteredData)}
            >
              Export to Excel
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis
                dataKey={
                  view === 'daily'
                    ? 'day'
                    : view === 'monthly'
                    ? 'month'
                    : 'year'
                }
                stroke="#003366"
              />
              <YAxis domain={[0, maxY]} stroke="#003366" />

              <Tooltip />
              <Legend />
              <Bar dataKey="Bookings" fill="#003366">
                <LabelList
                  dataKey="Bookings"
                  position="top"
                  className="text-primary"
                  style={{ fill: '#003366' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Pie Chart */}
        <div className="w-1/4  text-white border pl-5 rounded border-black bg-gray-200">
          <div className="flex justify-between items-center p-3">
            {' '}
            {/* This is the flex container */}
            <h2 className="text-xl font-bold mb-4 text-primary pl-3 pt-3 pr-3">
              Buchungs-Herkunft:
            </h2>
            <button
              className="bg-green-500 hover:bg-green-700 text-primary font-bold py-2 px-4 rounded text-xs w-1/2"
              onClick={() => exportToExcelBH(bookingSourcesData)}
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
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/4  text-primary border pl-5 rounded border-black bg-gray-200 text-sm">
          <BoxComponent data={boxData} />
        </div>
      </div>
      <div id="wrapperdiv1" className="flex space-x-4 pt-5 pb-5">
        <div className="w-full rounded border border-black bg-gray-200 text-primary">
          <ResponsiveContainer width="100%" height={300}>
            <StatsBox data={statData} />
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Report;
