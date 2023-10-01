import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import React, { useEffect, useState } from 'react';
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

import BookingOriginChart from '@hotel/features/HotelPage/components/BookingOriginChart';

import { getDailyBookings } from '../api/daily-bookings';
import BookingsBarChart from '../components/BarChart';
import BedIcon from '../components/BedIcon';
import BookingBarChart from '../components/BookingBarChart';
import BoxComponent from '../components/BoxComponent';
// Import the styles
import StatsBox from '../components/StatsBox';

function Report() {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(new Date().getFullYear(), 0, 1)
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [view, setView] = useState<'daily' | 'monthly' | 'yearly'>('daily');
  const [dailyBookings, setDailyBookings] = useState<DataEntry[]>([]);

  interface BookingData {
    day: string;
    Bookings: number;
  }

  useEffect(() => {
    const getDailyBookingsHandler = async () => {
      const myDailyBookings = await getDailyBookings();
      setDailyBookings(myDailyBookings);
    };

    getDailyBookingsHandler();
  }, []);

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

  const filteredData = dailyBookings.filter((item: any) => {
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
        {dailyBookings ? (
          <BookingBarChart filteredData={filteredData} />
        ) : (
          <div>loading...</div>
        )}
        {/* Pie Chart */}
        <BookingOriginChart />
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
