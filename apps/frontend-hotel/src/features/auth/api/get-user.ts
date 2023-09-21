import { axios } from '@hotel/lib/axios';
import { AuthUser } from '../types';

export const getUser = async (): Promise<AuthUser> => {
  return axios.get('/users/me');
};
