import { axios } from '@hotel/lib/axios';
import { UserResponse } from '../types';
import { getUser } from './get-user';
import storage from '@hotel/utils/storage';

export type SignInDto = {
  email: string;
  password: string;
};

export const signIn = async (data: SignInDto): Promise<UserResponse> => {
  const { accessToken } = await axios.post('/auth/login', data, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  storage.setToken(accessToken);

  const user = await getUser();
  const userResponse: UserResponse = {
    accessToken,
    user: user,
  };
  return userResponse;
};
