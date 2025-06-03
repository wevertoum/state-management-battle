import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ChatMessage } from '../types/chat';
import { faker } from '@faker-js/faker';
import { useAuthStore } from './useAuthStore';

interface ChatActions {
  sendMessage: (content: string) => void;
}

interface ChatStore {
  messages: ChatMessage[];
  titlePage: string;
  isTyping: boolean;
  actions: ChatActions;
}

const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      titlePage: 'Tip: Lab Zustand',
      isTyping: false,
      actions: {
        sendMessage: (content: string) => {
          const currentToken = useAuthStore.getState().token;
          const messageContentWithToken = currentToken
            ? `${content} - TOKEN: ${currentToken}`
            : content;

          set({ titlePage: 'Novo title após enviar mensagem - ztd' });

          const humanMessage: ChatMessage = {
            content: messageContentWithToken,
            author: 'human',
            dateTime: new Date(),
            type: 'text',
          };

          set((state) => ({ messages: [...state.messages, humanMessage] }));
          set({ isTyping: true });

          setTimeout(() => {
            const botMessage: ChatMessage = {
              content: faker.hacker.phrase(),
              author: 'bot',
              dateTime: new Date(),
              type: 'text',
            };
            set((state) => ({ messages: [...state.messages, botMessage] }));
            set({ isTyping: false });
          }, 1500);
        },
      },
    }),
    {
      name: 'chat_messages',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ messages: state.messages }),
      onRehydrateStorage: () => (state) => {
        if (state?.messages) {
          state.messages.forEach(
            (msg) => (msg.dateTime = new Date(msg.dateTime))
          );
        }
      },
    }
  )
);

export const useChatTitlePage = () => useChatStore((state) => state.titlePage);
export const useChatMessages = () => useChatStore((state) => state.messages);
export const useChatIsTyping = () => useChatStore((state) => state.isTyping);
export const useChatActions = () => useChatStore((state) => state.actions);
