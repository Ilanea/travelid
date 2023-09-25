import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { signIn } from '../api/sign-in';
import { signUp } from '../api/sign-up';
import { useAuthStore } from '../store/auth';

const useSignInUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const signUser = async (signData: any, type: 'signIn' | 'signUp') => {
    setIsLoading(true);
    try {
      let userResponse;
      if (type === 'signIn') {
        userResponse = await signIn(signData);
        console.log('response', userResponse);
      } else if (type === 'signUp') {
        userResponse = await signUp(signData);
      }
      setAuthUser(userResponse);
      navigate(from, { replace: true });
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };

  return { isLoading, signUser };
};

export default useSignInUp;
