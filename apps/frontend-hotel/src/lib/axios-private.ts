import Axios from 'axios';

import { toast } from '@libs/ui-web';

export const axiosPrivate = Axios.create({
  baseURL: 'api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosPrivate.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?._retry) {
      console.log('401');
      // TODO Logout
    } else {
      const message = error.response?.data?.message || error.message;

      toast({
        title: 'Uh oh! Something went wrong.',
        description: message,
        variant: 'destructive',
        duration: 3000,
      });

      return Promise.reject(error);
    }
  }
);
