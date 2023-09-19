import { axios } from '../../../lib/axios';

type SignInDto = {
  email: string;
  password: string;
};

export const signIn = async (data: SignInDto) => {
  const response = await axios.post(`/auth/login`, data);
  return response.data;
};
