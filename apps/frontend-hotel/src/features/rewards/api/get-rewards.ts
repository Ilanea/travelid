import { axios } from '@hotel/lib/axios';
import { axiosPrivate } from '@hotel/lib/axios-private';

import { Rewards } from '../types';

//import { AuthUser } from '../types';

export const getRewards = async (hotelId: string): Promise<Rewards> => {
  console.log('getRewards2');

  const response = await axiosPrivate.get(
    `/reward?hotelId=${hotelId}&page=1&pageSize=50`
  );
  console.log('getRewards3');
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
