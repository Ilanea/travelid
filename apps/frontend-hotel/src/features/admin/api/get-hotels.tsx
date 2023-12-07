import { axiosPrivate } from '@hotel/lib/axios-private';

//import { AuthUser } from '../types';

export const getHotels = async (): Promise<any> => {
  const response = await axiosPrivate.get(`/hotels?page=1&pageSize=100`);
  /*  const bookings = response.map((booking) => {
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
  }); */
  return response;
};
