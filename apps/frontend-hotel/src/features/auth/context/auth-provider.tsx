import { createContext, useState } from 'react';

import storage from '@hotel/utils/storage';

import { AuthUser } from '../types';

type AuthContextType = {
  auth?: AuthUser;
  setAuth: (auth: AuthUser) => void;
};

const AuthContext = createContext<AuthContextType>({ setAuth: () => {} });

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthUser>();

  console.log('auth root', auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
