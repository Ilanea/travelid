import { axios } from '@hotel/lib/axios';
import { axiosPrivate } from '@hotel/lib/axios-private';
import { AuthUser } from '../types';

export const getUser = async (userId: string,): Promise<AuthUser> => {
  return axiosPrivate.get(`/users/${userId}`);
};
