import Axios, { InternalAxiosRequestConfig } from 'axios';

import { toast } from '@libs/ui-web';

import { refreshToken } from '@hotel/features/auth/api/refresh-token';
import storage from '@hotel/utils/storage';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const accessToken = storage.getToken();
  if (config.headers) {
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    config.headers.Accept = 'application/json';
  }
  return config;
}

export const axiosPrivate = Axios.create({
  baseURL: 'api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(authRequestInterceptor);
axiosPrivate.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const prevRequest = error?.config;
    console.log('error', error);
    console.log('prevRequest', prevRequest);
    if (error?.response?.status === 401 && !prevRequest?._retry) {
      prevRequest._retry = true;
      refreshToken()
        .then((newAccessToken) => {
          console.log('newAccessToken', newAccessToken);
          storage.setToken(newAccessToken);
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate.request(prevRequest);
        })
        .catch((err) => {
          console.log('err', err);
        });
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
