import { create } from 'zustand';
import type { ChatMessage } from '../types/chat';
import { faker } from '@faker-js/faker';
import { useApiStore } from './useApiStore';

const STORAGE_KEY = 'chat_messages';

interface ChatStore {
  messages: ChatMessage[];
  sendMessage: (content: string) => void;
  loadMessagesFromStorage: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],

  loadMessagesFromStorage: () => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: ChatMessage[] = JSON.parse(saved);
        parsed.forEach((msg) => (msg.dateTime = new Date(msg.dateTime)));
        set({ messages: parsed });
      } catch (e) {
        console.error('Failed to parse chat from localStorage:', e);
      }
    }
  },

  sendMessage: (content: string) => {
    const humanMessage: ChatMessage = {
      content,
      author: 'human',
      dateTime: new Date(),
      type: 'text',
    };

    const newMessages = [...get().messages, humanMessage];
    set({ messages: newMessages });
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
    }

    useApiStore.getState().setIsTyping(true);

    setTimeout(() => {
      const botMessage: ChatMessage = {
        content: faker.hacker.phrase(),
        author: 'bot',
        dateTime: new Date(),
        type: 'text',
      };
      const updatedMessages = [...get().messages, botMessage];
      set({ messages: updatedMessages });
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
      }
      useApiStore.getState().setIsTyping(false);
    }, 1500);
  },
}));
