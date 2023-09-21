import React from 'react';
import {Link} from "react-router-dom";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LabelList
} from 'recharts';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import { ResizableBox } from 'react-resizable';
import "react-resizable/css/styles.css";
import {Button} from "@libs/ui-web";
import BoxComponent from "../components/BoxComponent";
import {FaAirbnb, FaApple, FaBeer, FaCoffee} from "react-icons/fa"; // Import the styles
import StatsBox  from "../components/StatsBox";


function report() {
  const bookingSourcesData = [
    { source: 'Everyhome', bookings: 1200 },
    { source: 'Mail', bookings: 300 },
    { source: 'Phone', bookings: 20 },
  ];

  const monthlyBookingsData = [
    { month: 'Jan', Bookings: 100 },
    { month: 'Feb', Bookings: 90 },
    { month: 'Mar', Bookings: 95 },
    { month: 'Apr', Bookings: 110 },
    { month: 'May', Bookings: 120 },
    { month: 'Jun', Bookings: 130 },
    { month: 'Jul', Bookings: 125 },
    { month: 'Aug', Bookings: 115 },
    { month: 'Sep', Bookings: 120 },
    { month: 'Oct', Bookings: 105 },
    { month: 'Nov', Bookings: 110 },
    { month: 'Dec', Bookings: 100 },
  ];


  const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3200, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2300, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Aug', uv: 2000, pv: 2400, amt: 2400 },
    { name: 'Sep', uv: 2780, pv: 3200, amt: 2000 },
    { name: 'Oct', uv: 1890, pv: 3500, amt: 2181 },
    { name: 'Nov', uv: 2390, pv: 4700, amt: 2500 },
    { name: 'Dec', uv: 3490, pv: 4200, amt: 2100 }
  ];

  const loyaltyPointsData = [
    { month: 'Jan', earned: 5000, spent: 4500 },
    { month: 'Feb', earned: 5200, spent: 4800 },
    { month: 'Mar', earned: 5400, spent: 5000 },
    { month: 'Apr', earned: 5600, spent: 5300 },
    { month: 'May', earned: 5700, spent: 5200 },
    { month: 'Jun', earned: 5800, spent: 5400 },
    { month: 'Jul', earned: 5900, spent: 5500 },
    { month: 'Aug', earned: 6000, spent: 5700 },
    { month: 'Sep', earned: 6100, spent: 5800 },
    { month: 'Oct', earned: 6200, spent: 5900 },
    { month: 'Nov', earned: 6300, spent: 6000 },
    { month: 'Dec', earned: 6400, spent: 6100 },
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
    { icon: <FaBeer size={50} />, value: 100, label: "Beers" },
    { icon: <FaCoffee size={50} />, value: 200, label: "Coffees" },
    { icon: <FaApple size={50} />, value: 50, label: "Apples" },
    { icon: <FaAirbnb size={50} />, value: 25, label: "Rooms" },
  ];



  const COLORS = ['#00008b', '#0000FF', '#ffa500'];

  const initialChartHeight = 400;  // You can adjust this as needed
  const [chartHeight, setChartHeight] = React.useState(initialChartHeight);



  return (
    <div className="min-h-screen relative pt-5 pl-5 pr-5 bg-gradient-to-b from-custom-blue to-gray-300"> {/* Added gradient background */}

      <div className="flex items-start mb-5"> {/* Flex container to position items side by side */}
        <img
          src="/images/HotelLogo4-removebg-preview.png"
          alt="Hotel Logo"
          style={{ width: '350px' }}
          className="h-28"
        />{/* Adjusted width to full */}
        <div className="flex space-x-4 mb-4 pr-5 pt-8 pl-80">
          <Button className="bg-gradient-to-r from-white to-gray-300 text-white py-5 px-4 w-36 h-15 font-extrabold text-9x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md"><Link to="/HotelPage">Overview</Link></Button>
          <Button className="bg-gradient-to-r from-white to-gray-300 text-white py-2 px-4 w-36 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md"><Link to="/Bookings">Bookings</Link></Button>
          <Button className="bg-gradient-to-r from-white to-gray-300 text-white py-2 px-4 w-36 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md">Guestlist</Button>
          <Button className="bg-gradient-to-r from-white to-gray-300 text-white py-2 px-4 w-36 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md">Rewards</Button>
          <Button className="bg-gradient-to-r from-white to-gray-300 text-white py-2 px-4 w-36 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md"><Link to="/Info">Info</Link></Button>
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



      <div className="flex mt-5 space-x-4">
        {/* Bar Chart */}
          <div className="w-1/2  pl-5 rounded border border-black bg-gradient-to-b from-custom-blue to-gray-300">
            <h2 className="text-xl font-bold mb-4 text-white pl-3 pt-3 pr-3">Monatliche Buchungen:</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyBookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Bookings" fill="#a9a9a9">
                  <LabelList dataKey="bookings" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        {/* Pie Chart */}
        <div className="w-1/4  text-white border pl-5 rounded border-black bg-gradient-to-b from-custom-blue to-gray-300">
          <h2 className="text-xl font-bold mb-4 text-white pl-3 pt-3 pr-3">Buchungs-Herkunft:</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bookingSourcesData}
                cx="50%"
                cy="50%"
                outerRadius={80}
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
      <div className=" justify-center flex mt-5 space-x-4 h-80">
      <div className=" justify-center w-full text-white border pl-5 rounded border-black bg-gradient-to-b from-custom-blue to-gray-300">
        <StatsBox data={statData} />
      </div>
      </div>
    </div>
  );
}

export default report;

