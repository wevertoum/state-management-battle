import { memo, useEffect, useRef } from "react";
import { useChatIsTyping, useChatMessages } from "~/stores/useChatOpenAiStore";
import { MessageItemOpenAi } from "./MessageItemOpenAi";

const MessageListOpenAi = memo(function MessageListOpenAi() {
	const messages = useChatMessages();
	const isTyping = useChatIsTyping();
	const bottomRef = useRef<HTMLDivElement | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: its ok
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isTyping]);

	if (messages.length === 0 && !isTyping) {
		return (
			<div className="flex-1 flex items-center justify-center">
				<div className="text-center text-zinc-500">
					No messages yet. Start the conversation below! 👇
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 max-w-3xl mx-auto">
			{messages.map((msg) => (
				<MessageItemOpenAi key={msg.id} message={msg} />
			))}

			{isTyping && (
				<div className="self-start italic text-sm text-zinc-400 animate-pulse">
					Bot is typing...
				</div>
			)}
			<div ref={bottomRef} />
		</div>
	);
});

export { MessageListOpenAi };
