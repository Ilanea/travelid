import Axios, { InternalAxiosRequestConfig } from 'axios';

import storage from '@hotel/utils/storage';
import { toast } from '@libs/ui-web';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken();

  if (config.headers) {
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    config.headers.Accept = 'application/json';
  }
  return config;
}

export const axios = Axios.create({
  baseURL: 'api',
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    /*  useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    }); */

    toast({
      title: 'Uh oh! Something went wrong.',
      description: message,
      variant: 'destructive',
      duration: 3000,
    });

    return Promise.reject(error);
  }
);
