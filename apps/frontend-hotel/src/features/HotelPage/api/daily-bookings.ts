const mockupDailyBookings = [
  { day: '2023-01-01', Bookings: 12, BookingsViaPhone: 5, BookingsViaMail: 1, BookingsViaBonAway: 6 },
  { day: '2023-01-02', Bookings: 8, BookingsViaPhone: 3, BookingsViaMail: 2, BookingsViaBonAway: 3 },
  { day: '2023-01-03', Bookings: 10, BookingsViaPhone: 4, BookingsViaMail: 3, BookingsViaBonAway: 3 },
  { day: '2023-01-04', Bookings: 15, BookingsViaPhone: 6, BookingsViaMail: 4, BookingsViaBonAway: 5 },
  { day: '2023-01-05', Bookings: 9,  BookingsViaPhone: 3, BookingsViaMail: 2, BookingsViaBonAway: 4 },
  { day: '2023-01-06', Bookings: 7,  BookingsViaPhone: 2, BookingsViaMail: 2, BookingsViaBonAway: 3 },
  { day: '2023-02-07', Bookings: 10, BookingsViaPhone: 4, BookingsViaMail: 3, BookingsViaBonAway: 3 },
  { day: '2023-02-08', Bookings: 13, BookingsViaPhone: 5, BookingsViaMail: 3, BookingsViaBonAway: 5 },
  { day: '2023-02-09', Bookings: 8,  BookingsViaPhone: 3, BookingsViaMail: 2, BookingsViaBonAway: 3 },
  { day: '2023-03-10', Bookings: 11, BookingsViaPhone: 4, BookingsViaMail: 3, BookingsViaBonAway: 4 },
  { day: '2023-03-11', Bookings: 14, BookingsViaPhone: 5, BookingsViaMail: 4, BookingsViaBonAway: 5 },
  { day: '2023-04-12', Bookings: 6,  BookingsViaPhone: 2, BookingsViaMail: 2, BookingsViaBonAway: 2 },
  { day: '2023-04-13', Bookings: 10, BookingsViaPhone: 4, BookingsViaMail: 3, BookingsViaBonAway: 3 },
  { day: '2023-05-14', Bookings: 12, BookingsViaPhone: 5, BookingsViaMail: 3, BookingsViaBonAway: 4 },
  { day: '2023-05-15', Bookings: 8,  BookingsViaPhone: 3, BookingsViaMail: 2, BookingsViaBonAway: 3 },
  { day: '2023-05-16', Bookings: 9,  BookingsViaPhone: 3, BookingsViaMail: 3, BookingsViaBonAway: 3 },
  { day: '2023-06-17', Bookings: 13, BookingsViaPhone: 5, BookingsViaMail: 4, BookingsViaBonAway: 4 },
  { day: '2023-06-18', Bookings: 15, BookingsViaPhone: 6, BookingsViaMail: 4, BookingsViaBonAway: 5 },
  { day: '2023-06-19', Bookings: 10, BookingsViaPhone: 4, BookingsViaMail: 3, BookingsViaBonAway: 3 },
  { day: '2023-07-20', Bookings: 12, BookingsViaPhone: 5, BookingsViaMail: 3, BookingsViaBonAway: 4 },
  { day: '2023-07-21', Bookings: 8,  BookingsViaPhone: 3, BookingsViaMail: 2, BookingsViaBonAway: 3 },
  { day: '2023-07-22', Bookings: 9,  BookingsViaPhone: 3, BookingsViaMail: 3, BookingsViaBonAway: 3 },
  { day: '2023-08-23', Bookings: 13, BookingsViaPhone: 5, BookingsViaMail: 4, BookingsViaBonAway: 4 },
  { day: '2023-08-24', Bookings: 15, BookingsViaPhone: 6, BookingsViaMail: 4, BookingsViaBonAway: 5 },
  { day: '2023-08-25', Bookings: 10, BookingsViaPhone: 4, BookingsViaMail: 3, BookingsViaBonAway: 3 },
  { day: '2023-09-26', Bookings: 12, BookingsViaPhone: 5, BookingsViaMail: 3, BookingsViaBonAway: 4 },
  { day: '2023-09-27', Bookings: 8,  BookingsViaPhone: 3, BookingsViaMail: 2, BookingsViaBonAway: 3 },
];

export const getDailyBookings = async () => {
  // TODO Backend Request

  setTimeout(() => {
    console.log('Delayed for 1 second.');
  }, 10000);

  return mockupDailyBookings;
};
