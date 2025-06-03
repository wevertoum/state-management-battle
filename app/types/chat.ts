export type Author = 'human' | 'bot';
export type MessageType = 'text' | 'image';

export interface ChatMessage {
  id: string;
  content: string;
  author: Author;
  dateTime: Date;
  type: MessageType;
}
