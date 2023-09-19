import { axios } from '../../../lib/axios';

type SignUpData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const signUp = async (data: SignUpData) => {
  const response = await axios.post(`/auth/signup`, data);
  return response.data;
};
