import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user, isAuthLoading: false }),
  clearUser: () => set({ user: null, isAuthenticated: false, isAuthLoading: false }),
}));