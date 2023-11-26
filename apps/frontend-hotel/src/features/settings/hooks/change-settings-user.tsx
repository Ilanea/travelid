import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '../store/auth';
import { changePassword } from "../api/change-password";
import { changeData } from "../api/change-userdata";

const useChangeUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const authUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  // separate the functions for changePassword and changeUsername in two hooks
  const changeUser = async (signData: any, type: 'changePassword' | 'changeUserData') => {
    setIsLoading(true);
    try {
      let userResponse;
      const userId = authUser?.id!;

      if (type === 'changePassword') {
        console.log("TODO: change password");
        userResponse = await changePassword(userId, signData);
        console.log('response', userResponse);
        setIsLoading(false);
      } else if (type === 'changeUserData') {
        userResponse = await changeData(userId, signData);
        window.location.reload();
        setIsLoading(false);
      }

      setAuthUser(userResponse);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };

  return { isLoading, changeUser };
};

export default useChangeUser;
