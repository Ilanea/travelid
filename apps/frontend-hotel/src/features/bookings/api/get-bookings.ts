import { axios } from '@hotel/lib/axios';
import { axiosPrivate } from '@hotel/lib/axios-private';

import { Booking } from '../types';

//import { AuthUser } from '../types';

export const getUser = async (userId: string): Promise<Booking> => {
  return axiosPrivate.get(`/users/${userId}`);
};
