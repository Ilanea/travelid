import { axiosPrivate } from '@hotel/lib/axios-private';

export const signOut = async () => {
  const response = await axiosPrivate.get('/auth/logout');
  return response;
};
