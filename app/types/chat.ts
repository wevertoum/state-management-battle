export type Author = "human" | "bot";
export type MessageType = "text" | "image";

export interface ChatMessage {
  content: string;
  author: Author;
  dateTime: Date;
  type: MessageType;
}
