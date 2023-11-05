import React, {useEffect, useState} from 'react';
import { exportToExcel } from '@hotel/utils/exports'
import {Button} from "@libs/ui-web";

interface Booking {
  id: string;
  guestName: string;
  roomNumber: number;
  checkInDate: Date;
  checkOutDate: Date;
  bookingDate: Date;
  numberOfNights: number;
  numberOfGuests: number;
  roomType: string;
  paymentStatus: string;
  loyaltyPointsUsed: string;
  amountOfLoyalPoints: number;
  totalAmount: number;
  specialRequests: string;
  contactNumber: string;
  emailAddress: string;
  bookingOrigin: string;
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
    const [isColumnSelectorVisible, setIsColumnSelectorVisible] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState<string[]>(Object.keys(bookings[0] || {}));

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
    if (!showFilterModal || !isKeyOfBooking(columnToFilter)) {
      console.error('Invalid filter column!!:', columnToFilter);
      return;
    }

    // String filter
    const stringFilter = (bookingValue: string, filterVal: string) =>
      bookingValue.toLowerCase().includes(filterVal.toLowerCase());

    // Number filter
    const numberFilter = (bookingValue: number, filterVal: string | number | Date) => {
      const numFilterValue = Number(filterVal);
      return !isNaN(numFilterValue) && bookingValue === numFilterValue;
    };

    // Date filter
    const dateFilter = (bookingValue: any, filterVal: string | number | Date) => {
      if (!["checkInDate", "checkOutDate", "bookingDate"].includes(columnToFilter)) return true;

      if (!(bookingValue instanceof Date || typeof bookingValue === 'string' || typeof bookingValue === 'number')) return false;

      const formattedBookingValue = new Date(bookingValue).toISOString().split('T')[0];
      const formattedFilterValue = new Date(filterVal).toISOString().split('T')[0];

      return formattedBookingValue === formattedFilterValue;
    };

    const filterFn = (booking: Booking) => {
      const bookingValue = booking[columnToFilter];
      if (typeof bookingValue === 'string' && typeof filterValue === 'string') {
        return stringFilter(bookingValue, filterValue);
      } else if (typeof bookingValue === 'number') {
        return numberFilter(bookingValue, filterValue);
      } else {
        return dateFilter(bookingValue, filterValue);
      }
    };

    setFilteredBookings(bookings.filter(filterFn));
    setShowFilterModal(false);
  };



  useEffect(() => {
        if (filterType === '') {
            setFilteredBookings(
                bookings.filter(booking =>
                    String((booking as any)[filterType]).toLowerCase().includes(filter.toLowerCase())
                )
            );
        }
    }, [filter, filterDate, bookings, filterType]);

    const resetFilter = () => {
        setFilter('');
        setColumnToFilter('');
        setFilterType('');
        setFilterValue('');
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
        "Loyalty Points Used": "loyaltyPointsUsed",
        "Amount of Loyalty Points": "amountOfLoyalPoints",
        "Total Amount": "totalAmount",
        "Special Requests": "specialRequests",
        "Contact Number": "contactNumber",
        "Email Address": "emailAddress",
        "Booking Origin": "bookingOrigin",
    };

  const reverseFilterMapping = Object.fromEntries(
    Object.entries(filterMapping).map(([label, key]) => [key, label])
  );
  function isKeyOfBooking(key: string): key is keyof Booking {
      console.log('Column to Filter:', columnToFilter);

      return key in BookingPrototype;
  }

  const BookingPrototype: Booking = {
    id: "",
    guestName: '',
    roomNumber: 1,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    bookingDate: new Date(),
    numberOfNights: 1,
    numberOfGuests: 1,
    roomType: '',
    paymentStatus: '',
    loyaltyPointsUsed: '',
    amountOfLoyalPoints: 1,
    totalAmount: 1,
    specialRequests: '',
    contactNumber: '',
    emailAddress: '',
    bookingOrigin: '',
      };

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
    const toggleColumn = (columnName: string) => {
        setVisibleColumns(prev =>
            prev.includes(columnName)
                ? prev.filter(col => col !== columnName)
                : [...prev, columnName]
        );
    };
    useEffect(() => {
        setVisibleColumns(Object.keys(bookings[0] || {}));
    }, [bookings]);

    const toggleColumnSelector = () => {
        setIsColumnSelectorVisible(prev => !prev);
    };


    return (
    <div className="bg-gray-100 p-6 rounded-lg w-full mx-auto mt-10 overflow-x-auto">
        <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-semibold mb-4">Guest Bookings</h2>
        <div>
            <Button
                onClick={() => setShowFilterModal(true)}
                className={`bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none mr-1 ${filteredBookings.length < bookings.length ? 'relative' : ''}`}
            >
                Filter By
                {filteredBookings.length < bookings.length && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs">
            !
        </span>
                )}
            </Button>
            <Button
                onClick={resetFilter}
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 focus:outline-none mr-4"
            >
                Reset Filter
            </Button>
            <Button
                onClick={handleExportToExcel}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none"
            >
                Export to Excel
            </Button>
            <Button
                onClick={toggleColumnSelector}
                className=" ml-2 bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:border-purple-700 focus:ring focus:ring-purple-200 active:bg-purple-700 transition duration-150 ease-in-out"
            >
                Select Visible Columns
            </Button>
            {isColumnSelectorVisible && (
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg z-50 border border-black"
                >
                    <div className="border-b border-gray-300 pb-2 mb-4">
                        <h3 className="text-lg font-semibold">Select Visible Columns</h3>
                    </div>

                    {Object.keys(bookings[0] || {}).map(column => (
                        <div key={column} className="flex items-center my-2">
                            <input
                                type="checkbox"
                                id={column}
                                checked={visibleColumns.includes(column)}
                                onChange={() => toggleColumn(column)}
                                className="mr-2"
                            />
                            <label htmlFor={column} className="cursor-pointer">
                                {reverseFilterMapping[column]}
                            </label>
                        </div>
                    ))}

                    <button
                        onClick={toggleColumnSelector}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none mt-4"
                    >
                        Done
                    </button>
                </div>
            )}
        </div>
        </div>
      <div className="mb-4 flex justify-between items-center">
          {showFilterModal && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-8 rounded-lg">
                      <h2 className="text-2xl mb-4">Filter Options</h2>
                    <select
                      value={reverseFilterMapping[filterType]}
                      onChange={(e) => {
                        const selectedFilter = filterMapping[e.target.value];
                        setColumnToFilter(selectedFilter)
                        if (selectedFilter) {
                          setFilterType(selectedFilter);
                          console.log('Filter Type Updated to:', selectedFilter);
                        }
                      }}
                      className="mb-4 p-2 border rounded-lg focus:outline-none focus:border-blue-500 w-full"
                    >
                      {Object.keys(filterMapping).map((filterLabel) => (
                        <option key={filterLabel} value={filterLabel}>
                          {filterLabel}
                        </option>
                      ))}
                    </select>
                      {showFilterModal && (
                          <input
                              type={['checkInDate', 'checkOutDate', 'bookingDate'].includes(columnToFilter) ? 'date' : 'text'}
                              placeholder={`Filter by ${columnToFilter}`}
                              value={(filterValue instanceof Date) ? filterValue.toISOString().split('T')[0] : String(filterValue)}
                              onChange={(e) => {
                                setFilterValue(e.target.value);
                                console.log('Filter Value Updated to:', e.target.value);
                              }}
                              className="p-2 border rounded-lg focus:outline-none focus:border-blue-500 w-full"
                          />
                      )}
                    <div className="mt-4 flex justify-end">
                          <button
                              onClick={() => {
                                setShowFilterModal(false)
                                console.log('Filter Modal Closed');
                              }}
                              className="bg-red-500 text-white p-2 ml-2 rounded-lg hover:bg-red-600 focus:outline-none"
                          >
                              Cancel
                          </button>
                          <button
                              onClick={() => {
                                handleFilter();
                                console.log('Filter Applied');
                              }}
                              className="bg-green-500 text-white p-2 ml-2 rounded-lg hover:bg-green-600 focus:outline-none"
                              //disabled={!columnToFilter || filterValue === ''}
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
            {Object.keys(bookings[0] || {}).map(column => (
                visibleColumns.includes(column) && (
                    <th key={column} className="py-2 px-4">
                        {reverseFilterMapping[column]}
                    </th>
                )
            ))}
        </tr>
        </thead>
        <tbody>
        {currentBookings.map((booking) => (
          <tr key={booking.id} className="border-t border-gray-200">
              {Object.keys(booking).map((column) => (
                  visibleColumns.includes(column) && (
                  <td key={column} className="py-2 px-4">
                      {column.includes('Date') ?
                          new Date((booking as any)[column]).toLocaleDateString() :
                          (booking as any)[column]
                      }
                  </td>
                  )
              ))}
          </tr>
        ))}
        </tbody>
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
      </table>
    </div>

  );

};


export default GuestBookings;
