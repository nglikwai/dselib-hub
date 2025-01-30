import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Tokens } from '@/types/auth.type';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  isLoading: boolean;
  setTokens: (tokens: Tokens) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  signout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      accessToken: null,
      refreshToken: null,
      error: null,
      isLoading: false,
      setTokens: tokens =>
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        }),
      setError: error => set({ error }),
      setLoading: isLoading => set({ isLoading }),
      signout: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
