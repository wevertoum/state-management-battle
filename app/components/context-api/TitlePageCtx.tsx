import { memo } from 'react';
import { useChat } from '../../context/ChatContext';

const TitlePageCtx = memo(function TitlePageCtx() {
  const { titlePage, token } = useChat();

  return (
    <header className='px-4 py-3 border-b border-zinc-700'>
      <div className='text-center text-white text-lg font-semibold'>
        {titlePage} - {token}
      </div>
    </header>
  );
});

export { TitlePageCtx };
