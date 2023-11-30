import { axios } from '@hotel/lib/axios';
import { axiosPrivate } from '@hotel/lib/axios-private';

import { PropertyCategory } from '../types';

//import { AuthUser } from '../types';

export const getPropertyCategories = async (): Promise<PropertyCategory[]> => {
  const response = await axiosPrivate.get(`/properties`);
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
