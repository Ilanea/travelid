import { axios } from '@hotel/lib/axios';

export const refreshToken = async (): Promise<string> => {
  const { accessToken } = await axios.get('/auth/refresh');
  return accessToken;
};
