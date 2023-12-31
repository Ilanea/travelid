import storage from '@hotel/utils/storage';
import { axios } from '../../../lib/axios';
import { AuthUser } from '../types';
import { getUser } from './get-user';
import { axiosPrivate } from "@hotel/lib/axios-private";

export type changePasswordDto = {
  oldPassword: string;
  newPassword: string;
};

export const changePassword = async (userId: number, data: changePasswordDto): Promise<AuthUser> => {
  const user = await axiosPrivate.patch(`/users/${userId.toString()}/password`, data);
  return user;
};
