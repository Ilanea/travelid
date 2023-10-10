import React, {useEffect, useState} from 'react';
import { exportToExcel } from '@hotel/utils/exports'

interface Booking {
    [key: string]: string | number | Date | boolean;
    id: string;
    guestName: string;
    roomNumber: number;
    checkInDate: string;
    checkOutDate: string;
    bookingDate: string;
    numberOfNights: number;
    numberOfGuests: number;
    roomType: string;
    paymentStatus: string;
    totalAmount: number;
    specialRequests: string;
    contactNumber: string;
    emailAddress: string;
}


interface GuestBookingsProps {
  bookings: Booking[];
}

const GuestBookings: React.FC<GuestBookingsProps> = ({ bookings }) => {
    const [filter, setFilter] = useState('');
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>(bookings);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterType, setFilterType] = useState<keyof Booking | ''>('');
    const [filterDate, setFilterDate] = useState(new Date());
    const [columnToFilter, setColumnToFilter] = useState<keyof Booking | ''>('');
    const [filterValue, setFilterValue] = useState<string | number | Date>('');
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage, setBookingsPerPage] = useState(10);

  const [rowsPerPageOptions, setRowsPerPageOptions] = useState([5, 10, 15, 20]);

  const handleExportToExcel = () => {
        exportToExcel(filteredBookings, 'FilteredBookings');
    };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBookingsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page whenever rows per page changes
  };

    // Implement logic to handle page change
    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };

  // Logic to get current bookings
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredBookings.length / bookingsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleFilter = () => {
        if (
            columnToFilter &&
            isKeyOfBooking(columnToFilter) &&
            (typeof filterValue === "string" ? filterValue !== "" : true)
        ) {
            // Implement dynamic filtering based on the column and type of filterValue
            setFilteredBookings(bookings.filter(booking => {
                const bookingValue = booking[columnToFilter];
                if (typeof bookingValue === 'string') {
                    if (typeof filterValue === 'string') {
                        return bookingValue.toLowerCase().includes(filterValue.toLowerCase());
                    }
                } else if (typeof bookingValue === 'number') {
                    const numFilterValue = Number(filterValue);
                    if (!isNaN(numFilterValue)) {
                        return bookingValue === numFilterValue;
                    }
                }else if (
                    ["checkInDate", "checkOutDate", "bookingDate"].includes(columnToFilter as string) &&
                    typeof filterValue === 'string'
                ) {
                    if (
                        (bookingValue instanceof Date || typeof bookingValue === 'string' || typeof bookingValue === 'number')
                    ) {
                        const formattedBookingValue = new Date(bookingValue).toISOString().split('T')[0];
                        const formattedFilterValue = new Date(filterValue).toISOString().split('T')[0];
                        return formattedBookingValue === formattedFilterValue;
                    }
                }

                return true;
            }));
            setShowFilterModal(false);
        }
    };


    useEffect(() => {
        if (filterType === 'Name') {
            setFilteredBookings(
                bookings.filter(booking =>
                    String((booking as any)[filterType]).toLowerCase().includes(filter.toLowerCase())
                )
            );
        } else if (filterType === 'Date') {
            setFilteredBookings(
                bookings.filter(booking =>
                    new Date(booking.checkInDate).toDateString() === filterDate.toDateString() ||
                    new Date(booking.checkOutDate).toDateString() === filterDate.toDateString()
                )
            );
        }
    }, [filter, filterDate, bookings, filterType]);

    const resetFilter = () => {
        setFilter('');
        setFilterType('Name');
        setFilterDate(new Date());
        setFilteredBookings(bookings);
    };


    const filterMapping: Record<string, keyof Booking> =  {
        "ID": "id",
        "Guest Name": "guestName",
        "Room Number": "roomNumber",
        "Check-in Date": "checkInDate",
        "Check-out Date": "checkOutDate",
        "Booking Date": "bookingDate",
        "Number of Nights": "numberOfNights",
        "Number of Guests": "numberOfGuests",
        "Room Type": "roomType",
        "Payment Status": "paymentStatus",
        "Total Amount": "totalAmount",
        "Special Requests": "specialRequests",
        "Contact Number": "contactNumber",
        "Email Address": "emailAddress"
    };
    function isKeyOfBooking(key: string | number | symbol): key is keyof Booking {
        return key in {
            id: true,
            guestName: true,
            roomNumber: true,
            checkInDate: true,
            checkOutDate: true,
            bookingDate: true,
            numberOfNights: true,
            numberOfGuests: true,
            roomType: true,
            paymentStatus: true,
            totalAmount: true,
            specialRequests: true,
            contactNumber: true,
            emailAddress: true
        };
    }


    useEffect(() => {
        // Ensure filterType is a key of Booking before proceeding with filtering.
        if (!filterType) {
            console.error("Invalid filter type:", filterType);
            return;
        }

        setFilteredBookings(
            bookings.filter(booking =>
                String(booking[filterType])
                    .toLowerCase()
                    .includes(filter.toLowerCase())
            )
        );
    }, [filter, bookings, filterType]);


    return (
    <div className="bg-gray-100 p-6 rounded-lg w-full mx-auto mt-10 overflow-x-auto">
        <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-semibold mb-4">Guest Bookings</h2>
        <div>
            <button
                onClick={() => setShowFilterModal(true)}
                className={`bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none mr-1 ${filteredBookings.length < bookings.length ? 'relative' : ''}`}
            >
                Filter By
                {filteredBookings.length < bookings.length && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs">
            !
        </span>
                )}
            </button>
            <button
                onClick={resetFilter}
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 focus:outline-none mr-4"
            >
                Reset Filter
            </button>
            <button
                onClick={handleExportToExcel}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none"
            >
                Export to Excel
            </button>
        </div>
        </div>
      <div className="mb-4 flex justify-between items-center">
          {showFilterModal && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-8 rounded-lg">
                      <h2 className="text-2xl mb-4">Filter Options</h2>
                      <select
                          value={filterType}
                          onChange={(e) => {
                              const selectedFilter = filterMapping[e.target.value];
                              if (selectedFilter) {
                                  setFilterType(selectedFilter);
                              }
                          }}
                          className="mb-4 p-2 border rounded-lg focus:outline-none focus:border-blue-500 w-full"
                      >
                          <option value="">Select Column</option>
                          {Object.keys(filterMapping).map((displayName) => (
                              <option value={displayName} key={displayName}>
                                  {displayName}
                              </option>
                          ))}
                      </select>

                      {columnToFilter && (
                          <input
                              type={['checkInDate', 'checkOutDate', 'bookingDate'].includes(columnToFilter) ? 'date' : 'text'}
                              placeholder={`Filter by ${columnToFilter}`}
                              value={(filterValue instanceof Date) ? filterValue.toISOString().split('T')[0] : String(filterValue)}
                              onChange={(e) => setFilterValue(e.target.value)}
                              className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 w-full"
                          />
                      )}


                    <div className="mt-4 flex justify-end">
                          <button
                              onClick={() => setShowFilterModal(false)}
                              className="bg-red-500 text-white p-2 ml-2 rounded-lg hover:bg-red-600 focus:outline-none"
                          >
                              Cancel
                          </button>
                          <button
                              onClick={handleFilter}
                              className="bg-green-500 text-white p-2 ml-2 rounded-lg hover:bg-green-600 focus:outline-none"
                              disabled={!columnToFilter || filterValue === ''}
                          >
                              Apply Filter
                          </button>
                      </div>
                  </div>
              </div>
          )}
      </div>
      <table className="w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-primary text-white">
        <tr>
          <th className="py-2 px-4">ID</th>
          <th className="py-2 px-4">Guest Name</th>
          <th className="py-2 px-4">Room</th>
          <th className="py-2 px-4">Check-in</th>
          <th className="py-2 px-4">Check-out</th>
          <th className="py-2 px-4">Booked on</th>
          <th className="py-2 px-4">Nights</th>
          <th className="py-2 px-4">Guests</th>
          <th className="py-2 px-4">Room Type</th>
          <th className="py-2 px-4">Payment</th>
          <th className="py-2 px-4">Total</th>
          <th className="py-2 px-4">Requests</th>
          <th className="py-2 px-4">Contact</th>
          <th className="py-2 px-4">Email</th>
        </tr>
        </thead>
        <tbody>
        {currentBookings.map((booking) => (
          <tr key={booking.id} className="border-t border-gray-200">
            <td className="py-2 px-4">{booking.id}</td>
            <td className="py-2 px-4">{booking.guestName}</td>
            <td className="py-2 px-4">{booking.roomNumber}</td>
            <td className="py-2 px-4">{new Date(booking.checkInDate).toLocaleDateString()}</td>
            <td className="py-2 px-4">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
            <td className="py-2 px-4">{new Date(booking.bookingDate).toLocaleDateString()}</td>
            <td className="py-2 px-4">{booking.numberOfNights}</td>
            <td className="py-2 px-4">{booking.numberOfGuests}</td>
            <td className="py-2 px-4">{booking.roomType}</td>
            <td className="py-2 px-4">{booking.paymentStatus}</td>
            <td className="py-2 px-4">${booking.totalAmount}</td>
            <td className="py-2 px-4">{booking.specialRequests}</td>
            <td className="py-2 px-4">{booking.contactNumber}</td>
            <td className="py-2 px-4">{booking.emailAddress}</td>
          </tr>
        ))}
        </tbody>
      </table>
      {/* Adding Pagination */}
        <tfoot>
        <tr>
            <td colSpan={14} className="py-2">
                <div className="flex justify-center items-center mr-4">
                    <span className="mr-2">Rows per page:</span>
                    <select
                        value={bookingsPerPage}
                        onChange={handleRowsPerPageChange}
                        className="p-1 border rounded mr-4"
                    >
                        {rowsPerPageOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {pageNumbers.map((num) => (
                        <button
                            key={num}
                            onClick={() => handlePageChange(num)}
                            className={`p-2 m-1 ${
                                currentPage === num ? 'bg-primary text-white' : 'text-primary'
                            }`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </td>
        </tr>
        </tfoot>
    </div>

  );

};


export default GuestBookings;
