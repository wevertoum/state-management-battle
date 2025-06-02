import { useChat } from '../../context/ChatContext';
import { useEffect, useMemo, useRef, memo } from 'react';

const MessageListCtx = memo(function MessageListCtx() {
  const { messages, isTyping } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const renderedMessages = useMemo(() => {
    return messages.map((msg, i) => (
      <div
        key={i}
        className={`whitespace-pre-wrap rounded-xl px-4 py-3 text-sm ${
          msg.author === 'human'
            ? 'bg-blue-600 text-white self-end'
            : 'bg-zinc-800 border border-zinc-700 self-start'
        }`}
      >
        {msg.content}
      </div>
    ));
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className='text-center text-zinc-500 mt-8'>
        No messages yet. Start the conversation below! 👇
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 max-w-3xl mx-auto'>
      {renderedMessages}
      {isTyping && (
        <div className='italic text-sm text-zinc-400 animate-pulse'>
          Bot is typing...
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
});

export { MessageListCtx };
