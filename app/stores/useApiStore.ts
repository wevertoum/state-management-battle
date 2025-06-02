import { create } from 'zustand';

interface ApiStore {
  isTyping: boolean;
  setIsTyping: (val: boolean) => void;
}

export const useApiStore = create<ApiStore>((set) => ({
  isTyping: false,
  setIsTyping: (val) => set({ isTyping: val }),
}));
