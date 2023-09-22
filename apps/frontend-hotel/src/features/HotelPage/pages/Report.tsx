import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {BarChart, Bar, XAxis, YAxis,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LabelList
} from 'recharts';
import "react-resizable/css/styles.css";
import {Button} from "@libs/ui-web";
import BoxComponent from "../components/BoxComponent";
import {
  FaBed,
  FaCookieBite,
  FaHistory,
  FaRegThumbsDown,
  FaRegThumbsUp
} from "react-icons/fa"; // Import the styles
import StatsBox  from "../components/StatsBox";
import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import BookingsBarChart from "../components/BarChart";


function Report() {

  const [startDate, setStartDate] = useState<Date | null>(new Date(new Date().getFullYear(), 0, 1));
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
    utils.book_append_sheet(wb, ws, "Sheet1");

    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob, 'MonthlyBookings.xlsx');
  }

  const exportToExcelBH = (data: BuchungsHerkunft[]) => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");

    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob, 'MonthlyBookings.xlsx');
  }

  const bookingSourcesData = [
    { source: 'Everyhome', bookings: 1200 },
    { source: 'Mail', bookings: 300 },
    { source: 'Phone', bookings: 20 },
  ];


  const boxData = [
    { keyword: "Treuepunkte vergeben", value: "323" },
    { keyword: "Treuepunkte eingelöst", value: "200" },
    { keyword: "Einnahmen", value: "43.392 €" },
    { keyword: "Ausgaben", value: "930 €" },
    { keyword: "Random fact 1", value: "1337" },
    { keyword: "Random fact 2", value: "1337" }

  ];
  const statData = [
    { icon: <FaBed className="text-green-600" size={50} />, value: 15, label: "Betten verfügbar" },
    { icon: <FaBed className="text-red-600" size={50} />, value: 35, label: "Betten belegt" },
    { icon: <FaCookieBite size={50} />, value: 200, label: "Treuepunkte eingelöst" },
    { icon: <FaHistory size={50} />, value: 50, label: "Nächtigungen durch EH" },
    { icon: <FaRegThumbsUp className="text-green-600" size={50} />, value: 423432, label: "Erhaltene Likes" },
    { icon: <FaRegThumbsDown className="text-red-600" size={50} />, value: 0, label: "Erhaltene Dislikes" },
  ];

  const COLORS = ['#00008b', '#0000FF', '#0080ff'];

  const initialChartHeight = 400;  // You can adjust this as needed
  const [chartHeight, setChartHeight] = React.useState(initialChartHeight);

  const filteredData = mockupDailyBookings.filter((item: any) => {
    const itemDate = new Date(item.day); // Convert to format "YYYY-MM-DD" for Date object

    if (startDate && endDate) {
      return itemDate >= startDate && itemDate <= endDate;
    }

    return true; // or false, depending on your desired behavior when the dates are null
  });

  const exportComponentAsPDF = (componentId: string, filename: string): void => {
    const input = document.getElementById(componentId);

    if (!input) return;  // Added a check to ensure the element exists.

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");



      const pdfWidth = 297;  // A4 width in landscape mode in mm
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
      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save("filename.pdf");
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

  const chartData: DataEntry[] = view === 'daily'
    ? filteredData
    : view === 'monthly'
      ? consolidateToMonthly(filteredData)
      : view === 'yearly'
        ? consolidateToYearly(filteredData)
        : [];



  function consolidateToMonthly(data: DataEntry[]): DataEntry[] {
    const monthlyData: { [key: number]: DataEntry } = {};

    data.forEach(entry => {
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

    data.forEach(entry => {
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
  const maxY = Math.ceil(Math.max(...chartData.map(item => item.Bookings)) * 1.10);


  return (
    <div className="min-h-screen relative pt-5 pl-5 pr-5 bg-gradient-to-b from-custom-blue to-gray-300"> {/* Added gradient background */}

      <div className="flex justify-between item-center mb-5"> {/* Flex container to position items side by side */}
        <img
          src="/images/HotelLogo4-removebg-preview.png"
          alt="Hotel Logo"
          style={{ width: '350px' }}
          className="h-28"
        />{/* Adjusted width to full */}
        <div className="flex-grow flex space-x-4 mb-4 pr-5 pt-8 pl-80 justify-end">
          <Button className="bg-gradient-to-r from-white to-gray-300 text-white py-5 px-4 w-36 h-15 font-extrabold text-9x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md"><Link to="/HotelPage">Overview</Link></Button>
          <Button className="bg-gradient-to-r from-white to-gray-300 text-white py-2 px-4 w-36 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md"><Link to="/Bookings">Bookings</Link></Button>
          <Button className="bg-gradient-to-r from-white to-gray-300 text-white py-2 px-4 w-36 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md">Guestlist</Button>
          <Button className="bg-gradient-to-r from-white to-gray-300 text-white py-2 px-4 w-36 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md">Rewards</Button>
          <Button className="bg-gradient-to-r from-white to-gray-300 text-white py-2 px-4 w-36 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md"><Link to="/Report">Report</Link></Button>
          <Button className="bg-gradient-to-r from-white to-gray-300 text-white py-2 px-4 w-36 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md">Settings</Button>
        </div>
      </div>



      <div className="flex items-start mb-5 relative"> {/* Flex container to position items side by side */}
        <img
          src="/images/BlueMountain.png"
          alt="Hotel Logo"
          className="w-full h-96"

        />{/* Adjusted width to full */}
        <div className="absolute top-56 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-3xl">
          13
        </div>
        <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-3xl">
          Bookings this week
        </div>
        <div className="absolute top-56 left-2/4 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-3xl">
          67
        </div>
        <div className="absolute top-3/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-3xl">
          Bookings this month
        </div>
        <div className="absolute top-56 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-3xl">
          145
        </div>
        <div className="absolute top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-3xl">
          Bookings this year
        </div>

        {/* This is the text overlay. Adjust the position and styles as needed */}
      </div>

      <div className="flex justify-between items-center">
      <div className="flex space-x-4 justify-center pl-52">
        <span className="text-xl font-bold mb-4 text-white flex-grow">Start Datum:</span>
        <DatePicker className="border rounded border-black"
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <span className="text-xl font-bold mb-4 text-white flex-grow">End Datum:</span>
        <DatePicker className="border rounded border-black"
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div >
        <div className="flex space-x-4 justify-center pb-4">
        <Button onClick={() => exportComponentAsPDF("wrapperdiv", "exported-file.pdf")}>
          Export as PDF
        </Button>
        </div>
      </div>
      <div id="wrapperdiv" className="flex space-x-4">
        {/* Bar Chart */}
        <div id="barChart" className="w-1/2 pl-5 pr-5 rounded border border-black bg-gradient-to-b from-custom-blue to-gray-300">
          <div className="flex justify-between items-center p-3"> {/* This is the flex container */}
            <h2 className="text-xl font-bold mb-4 text-white flex-grow">Monatliche Buchungen:</h2>
            <div>
              <label className="text-white mr-4">
                <input type="radio" name="view" value="daily" checked={view === 'daily'} onChange={() => setView('daily')} />
                Täglich
              </label>
              <label className="text-white pr-5">
                <input type="radio" name="view" value="monthly" checked={view === 'monthly'} onChange={() => setView('monthly')} />
                Monatlich
              </label>
              <label className="text-white mr-4">
                <input type="radio" name="view" value="yearly" checked={view === 'yearly'} onChange={() => setView('yearly')} />
                Jährlich
              </label>
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => exportToExcel(filteredData)}
            >
              Export to Excel
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey={view === 'daily' ? 'day' : view === 'monthly' ? 'month' : 'year'} stroke="#FFFFFF" />
              <YAxis domain={[0, maxY]} stroke="#FFFFFF" />

              <Tooltip />
              <Legend />
              <Bar dataKey="Bookings" fill="#003366">
                <LabelList dataKey="Bookings" position="top" className="text-white" style={{ fill: '#FFFFFF' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Pie Chart */}
        <div className="w-1/4  text-white border pl-5 rounded border-black bg-gradient-to-b from-custom-blue to-gray-300">
          <div className="flex justify-between items-center p-3"> {/* This is the flex container */}
          <h2 className="text-xl font-bold mb-4 text-white pl-3 pt-3 pr-3">Buchungs-Herkunft:</h2>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
                {
                  bookingSourcesData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/4  text-white border pl-5 rounded border-black bg-gradient-to-b from-custom-blue to-gray-300">
          <BoxComponent data={boxData} />
        </div>
      </div>
      <div id="wrapperdiv1" className="flex space-x-4 pt-5 pb-5">
        <div className="w-full rounded border border-black bg-gradient-to-b from-custom-blue to-gray-300 text-white">
          <ResponsiveContainer width="100%" height={300}>
          <StatsBox data={statData} />
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


export default Report;

