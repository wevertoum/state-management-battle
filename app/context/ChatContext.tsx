import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { ChatMessage } from '../types/chat';
import { faker } from '@faker-js/faker';

interface ChatContextType {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (content: string) => void;
  deleteMessage: (id: string) => void;
  titlePage: string;
  setTitlePage: React.Dispatch<React.SetStateAction<string>>;
  token?: string;
}

interface ChatProviderProps {
  children: ReactNode;
  token?: string;
}

const STORAGE_KEY = 'chat_messages';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({
  children,
  token = 'Tip: Lab Context API',
}: ChatProviderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [titlePage, setTitlePage] = useState('Tip: Lab Context API');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: ChatMessage[] = JSON.parse(saved);
        parsed.forEach((msg) => (msg.dateTime = new Date(msg.dateTime)));
        setMessages(parsed);
      } catch (e) {
        console.error('Failed to parse chat from localStorage:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (content: string) => {
    setTitlePage('Novo title após enviar mensagem - ctx');
    const humanMessage: ChatMessage = {
      id: Date.now().toString(),
      content: content + ` - TOKEN: ${token}`,
      author: 'human',
      dateTime: new Date(),
      type: 'text',
    };

    setMessages((prev) => [...prev, humanMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: faker.hacker.phrase(),
        author: 'bot',
        dateTime: new Date(),
        type: 'text',
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        deleteMessage,
        isTyping,
        titlePage,
        setTitlePage,
        token,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within a ChatProvider');
  return ctx;
}
