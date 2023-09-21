import storage from '@hotel/utils/storage';
import { axios } from '../../../lib/axios';
import { getUser } from './get-user';
import { UserResponse } from '../types';

export type SignUpDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const signUp = async (data: SignUpDto) => {
  const { accessToken } = await axios.post(`/auth/signup`, data);

  storage.setToken(accessToken);

  const user = await getUser();
  const userResponse: UserResponse = {
    accessToken,
    user: user,
  };
  return userResponse;
};
