import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

export type Message = {
	id: string;
	author: "human" | "bot";
	content: string;
};

type ChatState = {
	messages: Message[];
	isTyping: boolean;
	titlePage: string;
};

type ChatActions = {
	addMessage: (message: Omit<Message, "id">) => void;
	updateLastMessage: (chunk: string) => void;
	deleteMessage: (id: string) => void;
	setIsTyping: (isTyping: boolean) => void;
	clearChat: () => void;
};

type ChatStore = ChatState & {
	actions: ChatActions;
};

const initialState: ChatState = {
	messages: [],
	isTyping: false,
	titlePage: "Lab: OpenAI + Zustand + React Query",
};

export const useChatStore = create<ChatStore>((set) => ({
	...initialState,
	actions: {
		addMessage: (message) => {
			set((state) => ({
				messages: [...state.messages, { id: uuidv4(), ...message }],
			}));
		},
		updateLastMessage: (chunk) => {
			set((state) => {
				const currentMessages = state.messages;
				if (
					currentMessages.length === 0 ||
					currentMessages[currentMessages.length - 1].author !== "bot"
				) {
					return state;
				}

				return {
					messages: currentMessages.map((msg, index) =>
						index === currentMessages.length - 1
							? { ...msg, content: msg.content + chunk }
							: msg,
					),
				};
			});
		},
		deleteMessage: (id) => {
			set((state) => ({
				messages: state.messages.filter((msg) => msg.id !== id),
			}));
		},
		setIsTyping: (isTyping) => {
			set({ isTyping });
		},
		clearChat: () => {
			set({ messages: [] });
		},
	},
}));

export const useChatMessages = () => useChatStore((state) => state.messages);
export const useChatIsTyping = () => useChatStore((state) => state.isTyping);
export const useChatTitlePage = () => useChatStore((state) => state.titlePage);

export const useChatActions = () => useChatStore((state) => state.actions);
