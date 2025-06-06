import { useState, memo } from 'react';
import { useChat } from '../../context/ChatContext';

const PromptCtx = memo(function PromptCtx() {
  const { sendMessage } = useChat();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex items-center gap-3 max-w-3xl mx-auto'
    >
      <input
        autoFocus
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className='flex-1 rounded-lg bg-zinc-800 text-white border border-zinc-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Send a message...'
      />
      <button
        type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
      >
        Send
      </button>
    </form>
  );
});

export { PromptCtx };
