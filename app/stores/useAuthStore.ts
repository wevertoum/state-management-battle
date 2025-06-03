import { create } from 'zustand';

interface TokenStore {
  token: string | null;
  initializeToken: (token: string) => void;
}

export const useAuthStore = create<TokenStore>((set) => ({
  token: null,
  initializeToken: (token: string) => set({ token }),
}));
