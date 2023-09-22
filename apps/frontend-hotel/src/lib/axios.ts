import Axios from 'axios';

import { toast } from '@libs/ui-web';

export const axios = Axios.create({
  baseURL: 'api',
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    toast({
      title: 'Uh oh! Something went wrong.',
      description: message,
      variant: 'destructive',
      duration: 3000,
    });

    return Promise.reject(error);
  }
);
