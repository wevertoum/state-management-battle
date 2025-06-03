import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ChatMessage } from '../types/chat';
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

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      titlePage: 'Tip: Lab Zustand',
      isTyping: false,
      actions: {
        sendMessage: async (content: string) => {
          const currentToken = useAuthStore.getState().token;
          const messageContentWithToken = currentToken
            ? `${content} - TOKEN: ${currentToken}`
            : content;

          set({ titlePage: 'Novo title após enviar mensagem - ztd' });

          const humanMessage: ChatMessage = {
            id: Date.now().toString(),
            content: messageContentWithToken,
            author: 'human',
            dateTime: new Date(),
            type: 'text',
          };

          set((state) => ({ messages: [...state.messages, humanMessage] }));
          set({ isTyping: true });

          try {
            const response = await fetch(
              'https://jsonplaceholder.typicode.com/posts',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  title: 'User Message',
                  body: content,
                  userId: 1,
                }),
              }
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const botMessage: ChatMessage = {
              id: (Date.now() + 1).toString(),
              content: `Bot received your message! API response: Post ID ${data.id}`,
              author: 'bot',
              dateTime: new Date(),
              type: 'text',
            };

            set((state) => ({ messages: [...state.messages, botMessage] }));
          } catch (error) {
            const errorMessage: ChatMessage = {
              id: (Date.now() + 1).toString(),
              content: `Error calling API: ${
                error instanceof Error ? error.message : String(error)
              }`,
              author: 'bot',
              dateTime: new Date(),
              type: 'text',
            };
            set((state) => ({ messages: [...state.messages, errorMessage] }));
          } finally {
            set({ isTyping: false });
          }
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
