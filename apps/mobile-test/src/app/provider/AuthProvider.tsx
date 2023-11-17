import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';

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

  constructor() {
    this.loadToken();
  }

  public async init(): Promise<void> {
    await this.loadToken();
  }

  private async loadToken(): Promise<void>{
    // Check if a session cookie exists
    const cookie = await SecureStore.getItemAsync('connect.sid');

    if (cookie) {
      console.log('Cookie exists, verifying session...')
      try {
        // Make a request to the server to fetch user data
        const response = await axios.get(`${API_URL}/api/auth/verify-session`, {
          withCredentials: true,
        });

        // Assuming the response contains the user ID
        const userId = response.data.userId;

        // Fetch user data using the user ID
        const userDataResponse = await axios.get(`${API_URL}/api/users/${userId}`, {
          withCredentials: true,
        });

        // Set user data in the state after verifying the session
        this.authState = {
          user: userDataResponse.data,
          authenticated: true,
        };
      } catch (error) {
        // Handle the error, e.g., session verification or user data fetching failed
        console.error('Session verification failed:', error);
        // Reset the authentication state if verification fails
        this.authState = {
          user: null,
          authenticated: false,
        };
      }
    } else {
      console.log('No Cookie exists, please login...')
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

      return result.data;
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  }

  public async login(email: string, password: string) {
    try {
      const result = await axios.post(`${API_URL}/api/auth/login`, { email, password }, { withCredentials: true });

      // Store the session cookie
      console.log('Show the cookie:', result.headers['set-cookie'])
      //await SecureStore.setItemAsync('connect.sid', result.headers['set-cookie']);

      this.authState = {
        user: result.data,
        authenticated: true,
      };

      console.log('AUTHSTATE IN CLASS:', this.authState?.user)

      return result.data;
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  }

  public async logout() {
    // Delete the session cookie
    await SecureStore.deleteItemAsync('connect.sid');

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
  const authProvider = new AuthProviderClass();

  const value = {
    onSignup: authProvider.signup.bind(authProvider),
    onLogin: authProvider.login.bind(authProvider),
    onLogout: authProvider.logout.bind(authProvider),
    clearAuthState: authProvider.clearAuthState.bind(authProvider),
    authState: authProvider.getAuthState(),
  };

  useEffect(() => {
    // Ensure to clear auth state when the component unmounts
    return () => {
      authProvider.clearAuthState();
    };
  }, [authProvider]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
