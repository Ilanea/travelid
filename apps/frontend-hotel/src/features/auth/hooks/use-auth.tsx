import AuthContext from '@hotel/features/auth/context/auth-provider';
import { useContext } from 'react';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
