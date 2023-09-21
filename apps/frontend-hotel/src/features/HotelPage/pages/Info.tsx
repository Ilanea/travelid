import React from 'react';
import { Link } from "react-router-dom";

function Info() {
  return (
    <div style={{ height: '100vh' }}>
      <div className="flex items-start mb-5"> {/* Flex container to position items side by side */}
        Hallof Fame
      </div>

      <div style={{ position: 'relative', height: '550px' }}> {/* Explicit height for the container */}
        <img
          src="/images/mountains2.jpg"  // Replace with your image path
          alt="Description of Image"
          style={{
            height: '100%',  // Image takes full height of its container
            width: '100%',
            objectFit: 'cover',
            opacity: 0.5  // 50% transparency
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '80%',
            left: '80%',
            color: 'black',
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'rgba(0, 0, 0, 0)', // Black with some transparency
            padding: '5px 10px',
            borderRadius: '5px'
          }}
        >
          540 Bookings this month
        </div>
      </div>
      <div className="flex space-x-4 mb-4 pr-5 bg-gray-200 h-full">
        TEST
      </div>
    </div>
  );
}

export default Info;
