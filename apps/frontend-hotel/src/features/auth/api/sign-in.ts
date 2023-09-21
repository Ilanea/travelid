import { axios } from '@hotel/lib/axios';
import storage from '@hotel/utils/storage';

import { AuthUser } from '../types';
import { getUser } from './get-user';

export type SignInDto = {
  email: string;
  password: string;
};

export const signIn = async (data: SignInDto): Promise<AuthUser> => {
  const response = await axios.post('/auth/login', data, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  storage.setToken(response.accessToken);

  return response;
};
