import React from 'react';
import {Link} from "react-router-dom";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';


function HotelPage() {
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

  const pieData = [
    { name: 'Phone', value: 400 },
    { name: 'E-Mail', value: 300 },
    { name: 'Online', value: 300 },
    { name: 'Other', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


  return (
    <div className="min-h-screen relative pt-5 pl-5 bg-gradient-to-tr from-cyan-300 to-sky-300"> {/* Added gradient background */}


      <div className="flex items-start mb-5"> {/* Flex container to position items side by side */}
        <img
          src="/images/hotel-logo-transparent.png"
          alt="Hotel Logo"
          style={{ width: '350px' }}
          className="h-28"
        />{/* Adjusted width to full */}
      </div>
      <div className="flex space-x-4 mb-4 pr-5">
        <button className="bg-gradient-to-r from-cyan-300 to-blue-400 text-white py-5 px-4 w-72 h-15 font-extrabold text-9x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md"><Link to="/HotelPage">Overview</Link></button>
        <button className="bg-gradient-to-r from-cyan-300 to-blue-400 text-white py-2 px-4 w-72 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md"><Link to="/Bookings">Bookings</Link></button>
        <button className="bg-gradient-to-r from-cyan-300 to-blue-400 text-white py-2 px-4 w-72 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md">Guestlist</button>
        <button className="bg-gradient-to-r from-cyan-300 to-blue-400 text-white py-2 px-4 w-72 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md">Rewards</button>
        <button className="bg-gradient-to-r from-cyan-300 to-blue-400 text-white py-2 px-4 w-72 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md">Info</button>
        <button className="bg-gradient-to-r from-cyan-300 to-blue-400 text-white py-2 px-4 w-72 h-15 font-extrabold text-6x1 rounded-full transform transition duration-150 hover:scale-105 border border-black shadow-md">Settings</button>
      </div>

      <div className="flex mt-5 space-x-4 pr-5">

        {/* Line Chart */}
        <div className="w-1/2 border border-black bg-gradient-to-tr from-white to-cyan-400">
          <h2 className="text-xl font-bold mb-4">Monthly Performance (Line):</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="w-1/2 border border-black bg-gradient-to-tr from-white to-cyan-400">
          <h2 className="text-xl font-bold mb-4">Monthly Performance (Bar):</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="flex mt-5 space-x-4 pr-5">

        {/* Pie Chart */}
        <div className="w-1/2 border border-black bg-gradient-to-tr from-white to-cyan-400">
          <h2 className="text-xl font-bold mb-4">Category Distribution:</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {
                  pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="w-1/2 border border-black bg-gradient-to-tr from-white to-cyan-400">
          <h2 className="text-xl font-bold mb-4">Monthly Performance (Area):</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="black" />
              <YAxis stroke="black" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default HotelPage;

