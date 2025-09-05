import { useMutation } from "@tanstack/react-query";
import { type Message, useChatStore } from "~/stores/useChatOpenAiStore";

const API_URL = "http://localhost:3000/api/chat-stream";

type SendMessagePayload = {
	message: string;
	token: string;
	signal: AbortSignal;
};

type OpenAIMessage = {
	role: "system" | "user" | "assistant";
	content: string;
};

const formatMessagesForOpenAI = (
	messages: Message[],
	newMessage: string,
): OpenAIMessage[] => {
	const systemPrompt: OpenAIMessage = {
		role: "system",
		content:
			"Você é um assistente prestativo. Mantenha um contexto da conversa para responder a perguntas de acompanhamento.",
	};

	const conversationHistory: OpenAIMessage[] = messages.map((msg) => {
		return {
			role: msg.author === "human" ? "user" : "assistant",
			content: msg.content,
		};
	});

	const finalMessages: OpenAIMessage[] = [
		systemPrompt,
		...conversationHistory,
		{ role: "user", content: newMessage },
	];

	return finalMessages;
};

async function streamChatCompletion({
	message,
	token,
	signal,
}: SendMessagePayload) {
	const { messages, actions } = useChatStore.getState();
	const { addMessage, updateLastMessage, setIsTyping } = actions;

	addMessage({ author: "human", content: message });
	addMessage({ author: "bot", content: "" });
	setIsTyping(true);

	try {
		const formattedMessages = formatMessagesForOpenAI(messages, message);

		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-hostname": "state-management-battle",
				"accept-language": "pt-BR",
			},
			body: JSON.stringify({
				messages: formattedMessages,
				token,
			}),
			signal,
		});

		if (!response.ok || !response.body) {
			throw new Error(`API Error: ${response.statusText}`);
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let buffer = "";

		while (true) {
			const { value, done } = await reader.read();
			if (done) break;

			buffer += decoder.decode(value, { stream: true });
			const parts = buffer.split("\n\n");
			buffer = parts.pop() ?? "";

			for (const part of parts) {
				if (part.startsWith("data: ")) {
					const data = part.slice(6);
					if (data === "[DONE]") return;
					try {
						const json = JSON.parse(data);
						const chunk = json.choices?.[0]?.delta?.content;
						if (chunk) {
							updateLastMessage(chunk);
						}
					} catch (error) {
						console.warn("Invalid JSON chunk:", { part, error });
					}
				}
			}
		}
	} catch (error: any) {
		if (error.name === "AbortError") {
			console.log("Stream cancelled by user.");
			updateLastMessage("\n\n*Geração interrompida pelo usuário.*");
		} else {
			console.error("Streaming failed:", error);
			updateLastMessage(
				`\n\n**Error:** Houve um problema ao conectar com a API. Por favor, tente novamente.`,
			);
		}
	} finally {
		setIsTyping(false);
	}
}

export function useSendMessage() {
	return useMutation({
		mutationFn: streamChatCompletion,
	});
}
