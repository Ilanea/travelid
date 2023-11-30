import { axios } from '@hotel/lib/axios';
import { axiosPrivate } from '@hotel/lib/axios-private';

import { HotelProfile, PropertyCategory } from '../types';

//import { AuthUser } from '../types';

export const updateHotelProfile = async (
  hotelId: number,
  data: HotelProfile
): Promise<HotelProfile> => {
  console.log('updateHotelProfile', data);

  const response = await axiosPrivate.patch(`/hotels/${hotelId}`, data);
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
