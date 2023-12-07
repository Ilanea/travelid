import { axiosPrivate } from '@hotel/lib/axios-private';

//import { AuthUser } from '../types';

export const createProperty = async (data: any): Promise<any> => {
  console.log('updateHotelProfile', data);

  const response = await axiosPrivate.post(`/properties`, data);
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
