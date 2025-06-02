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
  titlePage: string;
  setTitlePage: React.Dispatch<React.SetStateAction<string>>;
}

const STORAGE_KEY = 'chat_messages';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
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
    const humanMessage: ChatMessage = {
      content,
      author: 'human',
      dateTime: new Date(),
      type: 'text',
    };

    setMessages((prev) => [...prev, humanMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: ChatMessage = {
        content: faker.hacker.phrase(),
        author: 'bot',
        dateTime: new Date(),
        type: 'text',
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <ChatContext.Provider
      value={{ messages, sendMessage, isTyping, titlePage, setTitlePage }}
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
