import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { AuthUser } from '../types';

type AuthStore = {
  user: AuthUser | null;
  setUser: (user: any) => void;
  logoutUser: () => void;
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        logoutUser: () =>
          set({
            user: null,
          }),
      }),
      {
        name: 'auth-storage',
      }
    )
  )
);
