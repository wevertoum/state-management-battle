import { memo, useEffect, useRef, useState } from "react";
import { useSendMessage } from "~/hooks/useSendMessageOpenAi";

type PromptOpenAiProps = {
	apiToken: string;
};

const PromptOpenAi = memo(function PromptOpenAi({
	apiToken,
}: PromptOpenAiProps) {
	const [input, setInput] = useState("");
	const { mutate, isPending } = useSendMessage();

	const abortControllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		return () => {
			abortControllerRef.current?.abort();
		};
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const message = input.trim();
		if (!message) return;

		const controller = new AbortController();
		abortControllerRef.current = controller;

		mutate({ message, token: apiToken, signal: controller.signal });
		setInput("");
	};

	const handleStop = () => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
			abortControllerRef.current = null;
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex items-center gap-3 max-w-3xl mx-auto"
		>
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				className="flex-1 rounded-lg bg-zinc-800 text-white border border-zinc-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Send a message..."
				disabled={isPending}
			/>

			{isPending ? (
				<button
					type="button"
					onClick={handleStop}
					className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
					aria-label="Stop generating"
				>
					Stop
				</button>
			) : (
				<button
					type="submit"
					className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-900 disabled:cursor-not-allowed"
					disabled={isPending}
				>
					Send
				</button>
			)}
		</form>
	);
});

export { PromptOpenAi };
