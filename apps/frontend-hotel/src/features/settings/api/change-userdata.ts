import { axios } from "@hotel/lib/axios";
import { AuthUser } from '../types';

export type EditUserDto = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
};

export const changeData = async (userId: number, data: EditUserDto): Promise<AuthUser> => {
  return await axios.patch(`/users/${userId.toString()}/`, data);
};
