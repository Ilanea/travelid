import { axios } from '@hotel/lib/axios';
import { axiosPrivate } from '@hotel/lib/axios-private';

import { Booking } from '../types';

//import { AuthUser } from '../types';

export const getBookings = async (hotelId: string): Promise<Booking> => {
  const response = await axiosPrivate.get(`/hotels/${hotelId}/bookings`);
  const bookings = response.map((booking) => {
    return {
      // TODO - string?
      id: booking.id.toString(),
      startDate: booking.startDate,
      endDate: booking.endDate,
      type: booking.type,
      status: booking.status,
      fullName: booking.user.firstName + ' ' + booking.user.lastName,
      email: booking.user.email,
    };
  });
  return bookings;
};
