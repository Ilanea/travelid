import { createContext, useState } from 'react';
import { UserResponse } from '../types';
import storage from '@hotel/utils/storage';

type AuthContextType = {
  auth?: UserResponse;
  setAuth: (auth: UserResponse) => void;
};

const AuthContext = createContext<AuthContextType>({ setAuth: () => {} });

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<UserResponse>();

  console.log('auth root', auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
