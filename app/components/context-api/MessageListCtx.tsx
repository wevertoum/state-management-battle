import { useChat } from '../../context/ChatContext';
import { useEffect, useMemo, useRef, memo } from 'react';

const MessageListCtx = memo(function MessageListCtx() {
  const { messages, isTyping, deleteMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const renderedMessages = useMemo(() => {
    return messages.map((msg, i) => (
      <div
        key={i}
        className={`flex items-center gap-2 max-w-[90%] ${
          msg.author === 'human' ? 'self-end' : 'self-start'
        }`}
      >
        <div
          className={`whitespace-pre-wrap rounded-xl px-4 py-3 text-sm ${
            msg.author === 'human'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-800 border border-zinc-700'
          }`}
        >
          {msg.content}
          <button
            onClick={() => deleteMessage(msg.id)}
            className='text-red-500 hover:text-red-700 text-sm p-2 cursor-pointer'
            aria-label='Delete message'
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }, [messages, deleteMessage]);

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
