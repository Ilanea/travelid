import storage from '@hotel/utils/storage';
import { axios } from '../../../lib/axios';
import { AuthUser } from '../types';
import { getUser } from './get-user';

export type changePassData = {
  oldPassword: string;
  newPassword: string;
};

export const changePassword = async (userId: number, data: changePassData): Promise<AuthUser> => {
  const user = await axios.patch(`/users/${userId.toString()}/password`, data);
  return user;
};