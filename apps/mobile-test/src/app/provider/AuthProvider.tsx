import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface User {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AuthProps {
  authState?: { user: User | null; authenticated: boolean | null };
  onSignup?: (userData: any) => Promise<User>;
  onLogin?: (email: string, password: string) => Promise<User>;
  onLogout?: () => Promise<any>;
  clearAuthState?: () => void;
}

export const API_URL = 'http://192.168.178.41:3333';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export class AuthProviderClass {
  private authState: { user: User | null; authenticated: boolean | null } = {
    user: null,
    authenticated: null,
  };

  public async init(): Promise<void> {
    await this.loadToken();
  }

  private async loadToken(): Promise<void>{
    try {
      // Check if a session cookie exists
      const result = await axios.get(`${API_URL}/api/auth/verify-session`, {
        withCredentials: true,
      });
  
      console.log("loadToken Result:", result.data);
      
      if(!result.data) {
        console.log('No Cookie exists, please login...');

        this.authState = {
          user: null,
          authenticated: false,
        };
  
      } else {
        console.log('Cookie exists, verifying session...');
  
        // Set user data in the state after verifying the session
        this.authState = {
          user: result.data,
          authenticated: true,
        };
    
        // Save User Info in SecureStore
        await SecureStore.setItemAsync('userInfo', JSON.stringify(result.data));
      }
    } catch (error) {
      console.error('Session verification failed:', error);
  
      this.authState = {
        user: null,
        authenticated: false,
      };
    }
  }

  public async signup(userData: any) {
    console.log(userData)
    try {
      const result = await axios.post(`${API_URL}/api/auth/signup`, userData, { withCredentials: true });

      // Set user data in the state after signup
      this.authState = {
        user: result.data.user,
        authenticated: true,
      };

      // Save User Info in SecureStore
      await SecureStore.setItemAsync('userInfo', JSON.stringify(result.data));

      return result.data;
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  }

  public async login(email: string, password: string) {
    try {
      const result = await axios.post(`${API_URL}/api/auth/login`, { email, password }, { withCredentials: true });

      //console.log('Show the cookie:', result.headers['set-cookie'])

      this.authState = {
        user: result.data,
        authenticated: true,
      };

      // Save User Info in SecureStore
      await SecureStore.setItemAsync('userInfo', JSON.stringify(result.data));

      return result.data;
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  }

  public async logout() {
    // Delete User Data from Secure Store
    await SecureStore.deleteItemAsync('userInfo');

    // Delete the Session Cookie
    await axios.get(`${API_URL}/api/auth/logout`, { withCredentials: true });

    // Reset State
    this.authState = {
      user: null,
      authenticated: false,
    };
  }

  public clearAuthState() {
    this.authState = {
      user: null,
      authenticated: null,
    };
  }

  public getAuthState() {
    return this.authState;
  }
}


export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState({
    user: null,
    authenticated: null,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  const authProvider = useMemo(() => new AuthProviderClass(), []);
  const value = {
    onSignup: authProvider.signup.bind(authProvider),
    onLogin: authProvider.login.bind(authProvider),
    onLogout: authProvider.logout.bind(authProvider),
    clearAuthState: authProvider.clearAuthState.bind(authProvider),
    authState,
  };

  useEffect(() => {
    const initializeAuthProvider = async () => {
      await authProvider.init();
      setIsInitialized(true);
    };
  
    initializeAuthProvider();
  }, [authProvider]);
  
  useEffect(() => {
    if (isInitialized) {
      setAuthState(authProvider.getAuthState());
    }
  }, [isInitialized, authProvider]);

  console.log('AuthProvider - authState:', authState);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};