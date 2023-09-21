import storage from '@hotel/utils/storage';

import { axios } from '../../../lib/axios';
import { AuthUser } from '../types';
import { getUser } from './get-user';

export type SignUpDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const signUp = async (data: SignUpDto) => {
  const user = await axios.post(`/auth/signup`, data);
  storage.setToken(user.accessToken);
  return user;
};
