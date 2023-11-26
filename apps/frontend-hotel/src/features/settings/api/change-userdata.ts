import { axios } from "@hotel/lib/axios";
import { AuthUser } from '../types';
import { getUser } from './get-user';
import { axiosPrivate } from "@hotel/lib/axios-private";

export type EditUserDto = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
};

export const changeData = async (userId: number, data: EditUserDto): Promise<AuthUser> => {
  const user =  await axiosPrivate.patch(`/users/${userId.toString()}/`, data);
  return user;
};
