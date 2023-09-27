import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '../store/auth';
import { changePassword } from "../api/change-password";

const useChangeUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  // separate the functions for changePassword and changeUsername in two hooks
  const changeUser = async (signData: any, type: 'changePassword' | 'changeUsername') => {
    setIsLoading(true);
    try {
      let userResponse;
      if (type === 'changePassword') {
        userResponse = await changePassword(signData);
        console.log('response', userResponse);
      } else if (type === 'changeUsername') {
        console.log("TODO: change username")
      }
      setAuthUser(userResponse);
      navigate(from, { replace: true });
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };

  return { isLoading, changeUser };
};

export default useChangeUser;
