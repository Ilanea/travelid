
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
  ResponsiveContainer,
} from 'recharts';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Button } from '@libs/ui-web';
import BookingOriginChart from '@hotel/features/HotelPage/components/BookingOriginChart';
import { getDailyBookings } from '../api/daily-bookings';
import BedIcon from '../components/BedIcon';
import BookingBarChart from '../components/BookingBarChart';
import BoxComponent from '../components/BoxComponent';
// Import the styles
import StatsBox from '../components/StatsBox';
import ListReport from "@hotel/features/HotelPage/components/ListReport";
import WorldMapBookings from "@hotel/features/HotelPage/components/WorldMapBookings";
import {DateRangePicker} from "@hotel/features/HotelPage/components/DateRangePicker";
import {DateRange} from "react-day-picker";
import {addDays} from "date-fns";
import {AiFillCreditCard} from "react-icons/ai";
import DashboardCardMini from "@hotel/components/DashboardCardMini";

function Report() {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(new Date().getFullYear(), 0, 1)
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [view, setView] = useState<'daily' | 'monthly' | 'yearly'>('daily');
  const [dailyBookings, setDailyBookings] = useState<DataEntry[]>([]);
  const [tabIndex, setTabIndex] = useState(0);

  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -90),
    to: new Date(),
  })
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

    if (date) {
      return itemDate >= date.from && itemDate <= date.to;
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
  const bookings = [
    // Adding some mock bookings with the new data fields
    {
      id: "1",
      guestName: "John Doe",
      roomNumber: 101,
      checkInDate: "2023-10-01",
      checkOutDate: "2023-10-05",
      bookingDate: "2023-09-01",
      numberOfNights: 4,
      numberOfGuests: 2,
      roomType: "Double",
      paymentStatus: "Paid",
        loyaltyPointsUsed: 'Yes',
        amountOfLoyalPoints: 321,
      totalAmount: 500,
      specialRequests: "Near elevator",
      contactNumber: "+1 123-456-7890",
      emailAddress: "john@example.com",
      bookingOrigin: "Phone",
    },  {
      id: "2",
      guestName: "Jane Smith",
      roomNumber: 102,
      checkInDate: "2023-10-06",
      checkOutDate: "2023-10-10",
      bookingDate: "2023-09-15",
      numberOfNights: 4,
      numberOfGuests: 1,
      roomType: "Single",
      paymentStatus: "Paid",
          loyaltyPointsUsed: 'No',
          amountOfLoyalPoints: 0,
      totalAmount: 400,
      specialRequests: "Quiet area",
      contactNumber: "+1 123-456-7891",
      emailAddress: "jane@example.com",
      bookingOrigin: "Bon Away",
    },
    {
      id: "3",
      guestName: "Michael Johnson",
      roomNumber: 103,
      checkInDate: "2023-10-12",
      checkOutDate: "2023-10-15",
      bookingDate: "2023-09-20",
      numberOfNights: 3,
      numberOfGuests: 2,
      roomType: "Double",
      paymentStatus: "Pending",
        loyaltyPointsUsed: 'Yes',
        amountOfLoyalPoints: 100,
      totalAmount: 600,
      specialRequests: "Near gym",
      contactNumber: "+1 123-456-7892",
      emailAddress: "michael@example.com",
      bookingOrigin: "Bon Away",

    },
    {
      id: "4",
      guestName: "Emily Taylor",
      roomNumber: 104,
      checkInDate: "2023-10-18",
      checkOutDate: "2023-10-25",
      bookingDate: "2023-09-10",
      numberOfNights: 7,
      numberOfGuests: 2,
      roomType: "Suite",
      paymentStatus: "Paid",
      loyaltyPointsUsed: 'Yes',
      amountOfLoyalPoints: 100,
      totalAmount: 1400,
      specialRequests: "Higher floor",
      contactNumber: "+1 123-456-7893",
      emailAddress: "emily@example.com",
      bookingOrigin: "Bon Away",
    },
    {
      id: "5",
      guestName: "Rachel Green",
      roomNumber: 105,
      checkInDate: "2023-10-05",
      checkOutDate: "2023-10-10",
      bookingDate: "2023-09-04",
      numberOfNights: 5,
      numberOfGuests: 1,
      roomType: "Single",
      paymentStatus: "Cancelled",
        loyaltyPointsUsed: 'No',
        amountOfLoyalPoints: 0,
      totalAmount: 400,
      specialRequests: "Near pool",
      contactNumber: "+1 124-456-7894",
      emailAddress: "rachel@example.com",
      bookingOrigin: "Bon Away",
    },
    {
      id: "6",
      guestName: "Ross Geller",
      roomNumber: 106,
      checkInDate: "2023-10-11",
      checkOutDate: "2023-10-15",
      bookingDate: "2023-09-03",
      numberOfNights: 4,
      numberOfGuests: 1,
      roomType: "Single",
      paymentStatus: "Paid",
        loyaltyPointsUsed: 'Yes',
        amountOfLoyalPoints: 220,
      totalAmount: 320,
      specialRequests: "Lower floor",
      contactNumber: "+1 125-456-7895",
      emailAddress: "ross@example.com",
      bookingOrigin: "Mail",
    },
    {
      id: "7",
      guestName: "Monica Geller",
      roomNumber: 107,
      checkInDate: "2023-10-20",
      checkOutDate: "2023-10-25",
      bookingDate: "2023-09-07",
      numberOfNights: 5,
      numberOfGuests: 2,
      roomType: "Double",
      paymentStatus: "Pending",
        loyaltyPointsUsed: 'Yes',
        amountOfLoyalPoints: 100,
      totalAmount: 700,
      specialRequests: "Near restaurant",
      contactNumber: "+1 126-456-7896",
      emailAddress: "monica@example.com",
      bookingOrigin: "Mail",

    },
    {
      id: "8",
      guestName: "Chandler Bing",
      roomNumber: 108,
      checkInDate: "2023-10-18",
      checkOutDate: "2023-10-20",
      bookingDate: "2023-09-12",
      numberOfNights: 2,
      numberOfGuests: 2,
      roomType: "Suite",
      paymentStatus: "Paid",
        loyaltyPointsUsed: 'Yes',
        amountOfLoyalPoints: 100,
      totalAmount: 600,
      specialRequests: "Quiet area",
      contactNumber: "+1 127-456-7897",
      emailAddress: "chandler@example.com",
      bookingOrigin: "Mail",

    },
    {
      id: "9",
      guestName: "Phoebe Buffay",
      roomNumber: 109,
      checkInDate: "2023-10-01",
      checkOutDate: "2023-10-03",
      bookingDate: "2023-09-01",
      numberOfNights: 2,
      numberOfGuests: 1,
      roomType: "Single",
      paymentStatus: "Paid",
        loyaltyPointsUsed: 'Yes',
        amountOfLoyalPoints: 500,
      totalAmount: 200,
      specialRequests: "Extra towels",
      contactNumber: "+1 128-456-7898",
      emailAddress: "phoebe@example.com",
      bookingOrigin: "Phone",
    },
    {
      id: "10",
      guestName: "Joey Tribbiani",
      roomNumber: 110,
      checkInDate: "2023-10-08",
      checkOutDate: "2023-10-10",
      bookingDate: "2023-09-05",
      numberOfNights: 2,
      numberOfGuests: 1,
      roomType: "Single",
      paymentStatus: "Pending",
        loyaltyPointsUsed: 'No',
        amountOfLoyalPoints: 0,
      totalAmount: 220,
      specialRequests: "Early check-in",
      contactNumber: "+1 129-456-7899",
      emailAddress: "joey@example.com",
      bookingOrigin: "Bon Away",
    },
    {
      id: "11",
      guestName: "John Doe!!",
      roomNumber: 101,
      checkInDate: "2023-10-01",
      checkOutDate: "2023-10-05",
      bookingDate: "2023-09-01",
      numberOfNights: 4,
      numberOfGuests: 2,
      roomType: "Double",
      paymentStatus: "Paid",
        loyaltyPointsUsed: 'No',
        amountOfLoyalPoints: 0,
      totalAmount: 500,
      specialRequests: "Near elevator",
      contactNumber: "+1 123-456-7890",
      emailAddress: "test@mail.com",
      bookingOrigin: "Bon Away",
    }
  ];

  return (
    <div className="min-h-screen relative pl-5 pr-5">
      {' '}
      {/* Tabs */}
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="p-6 bg-white rounded-lg shadow-lg mx-auto mt-10">
        <TabList className="flex mb-4 border-gray-300">
          <Tab className="mr-2 py-2 px-4 cursor-pointer font-semibold text-gray-600 hover:text-blue-500 focus:outline-none" selectedClassName="border-b-2 border-blue-500 text-blue-500">
            Report Dashboard
          </Tab>
          <Tab className="mr-2 py-2 px-4 cursor-pointer font-semibold text-gray-600 hover:text-blue-500 focus:outline-none" selectedClassName="border-b-2 border-blue-500 text-blue-500">
            Bookings Report
          </Tab>
          <Tab className="py-2 px-4 cursor-pointer font-semibold text-gray-600 hover:text-blue-500 focus:outline-none" selectedClassName="border-b-2 border-blue-500 text-blue-500">
            World Map View
          </Tab>
        </TabList>

        <TabPanel>
          <div className="flex justify-end space-x-4 mb-5">
            {/* Bookings this week */}
            <DashboardCardMini title="Bookings this week" amount="+13" amountLong="+ 13% seit der letzten Woche" icon={<BedIcon className="text-primary" />} />
            {/* Bookings this month */}
            <DashboardCardMini title="Bookings this month" amount="+67" amountLong="+ 33% seit der letzten Woche" icon={<BedIcon className="text-primary" />} />
            {/* Bookings this year */}
            <DashboardCardMini title="Bookings this month" amount="+189" amountLong="+ 89% seit der letztem Jahr" icon={<BedIcon className="text-primary" />} />
            {/* Total bookings */}
            <DashboardCardMini title="Bookings total" amount="+456" amountLong="+ 189% total" icon={<BedIcon className="text-primary" />} />

          </div>
          <div className="flex justify-between items-center w-full pb-5">
            {/* Container for DateRangePicker that takes up the available space */}
            <div className="flex-grow flex justify-start">
              <DateRangePicker date={date} setDate={setDate}/>
            </div>

            {/* Container for Button that is pushed to the far right */}
            <div className="flex justify-end">
              <Button
                onClick={() =>
                  exportComponentAsPDF('wrapperdiv', 'exported-file.pdf')
                }
              >
                Export as PDF
              </Button>
            </div>
          </div>

          <div id="wrapperdiv" className="flex space-x-4">
            {/* Bar Chart */}
            {dailyBookings ? (
              <BookingBarChart  filteredData={filteredData}/>
            ) : (
              <div>loading...</div>
            )}
            {/* Pie Chart */}
            <BookingOriginChart filteredData={filteredData}/>
            <div className="rounded-xl border bg-card text-card-foreground shadow w-full w-1/4">
              <BoxComponent data={boxData} />
            </div>
          </div>
          <div id="wrapperdiv1" className="flex space-x-4 pt-5 pb-5">
            <div className="rounded-xl border bg-card text-card-foreground shadow w-full">
              <ResponsiveContainer width="100%" height={300}>
                <StatsBox data={statData} />
              </ResponsiveContainer>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <ListReport bookings={bookings} />
        </TabPanel>

        <TabPanel>
          <WorldMapBookings bookingsData={bookings} />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Report;
