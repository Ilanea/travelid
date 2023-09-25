import { axios } from '@hotel/lib/axios';

import { AuthUser } from '../types';

export type SignInDto = {
  email: string;
  password: string;
};

export const signIn = async (data: SignInDto): Promise<AuthUser> => {
  const response = await axios.post('/auth/login', data);
  return response;
};
