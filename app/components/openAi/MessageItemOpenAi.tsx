import { memo, Suspense } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import type { Message } from "~/stores/useChatOpenAiStore";
import { useChatActions } from "~/stores/useChatOpenAiStore";
import "highlight.js/styles/github-dark.css";

type MessageItemProps = {
	message: Message;
};

const MarkdownContent = memo(({ content }: { content: string }) => {
	return (
		<div className="prose prose-invert prose-sm max-w-none">
			<Markdown
				rehypePlugins={[rehypeHighlight]}
				remarkPlugins={[remarkGfm]}
				components={{
					code({ node, className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || "");
						return match ? (
							<div className="relative my-4 rounded-lg bg-zinc-700 font-sans text-sm">
								<div className="flex items-center justify-between rounded-t-lg px-4 py-1.5">
									<span className="text-zinc-300">{match[1]}</span>
								</div>
								<pre className="overflow-x-auto p-4">
									<code {...props} className={className}>
										{children}
									</code>
								</pre>
							</div>
						) : (
							<code
								{...props}
								className="rounded bg-zinc-700 px-1.5 py-0.5 font-mono text-sm"
							>
								{children}
							</code>
						);
					},
					table({ children }) {
						return (
							<div className="overflow-x-auto">
								<table className="my-4 w-full text-left">{children}</table>
							</div>
						);
					},
					thead({ children }) {
						return (
							<thead className="border-b border-zinc-600">{children}</thead>
						);
					},
					th({ children }) {
						return <th className="px-4 py-2 font-semibold">{children}</th>;
					},
					td({ children }) {
						return (
							<td className="border-t border-zinc-700 px-4 py-2">{children}</td>
						);
					},
				}}
			>
				{content}
			</Markdown>
		</div>
	);
});

const MessageItemOpenAi = memo(function MessageItem({
	message,
}: MessageItemProps) {
	const { deleteMessage } = useChatActions();

	return (
		<div
			className={`flex items-start gap-3 w-full max-w-full ${
				message.author === "human" ? "self-end justify-end" : "self-start"
			}`}
		>
			<div
				className={`rounded-xl px-4 py-3 text-sm transition-colors duration-300 max-w-[90%] ${
					message.author === "human"
						? "bg-blue-600 text-white"
						: "bg-zinc-800 border border-zinc-700"
				}`}
			>
				<div className="flex flex-col">
					{message.author === "bot" ? (
						<Suspense
							fallback={
								<div className="leading-relaxed">{message.content}</div>
							}
						>
							<MarkdownContent content={message.content} />
						</Suspense>
					) : (
						<span className="leading-relaxed whitespace-pre-wrap">
							{message.content}
						</span>
					)}
					<button
						type="button"
						onClick={() => deleteMessage(message.id)}
						className="self-end text-red-400/70 hover:text-red-400 text-xs pt-2 cursor-pointer transition-colors"
						aria-label="Delete message"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
});

export { MessageItemOpenAi };
