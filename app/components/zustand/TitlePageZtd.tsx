import { memo } from 'react';
import { useChatStore } from '~/stores/useChatStore';

const TitlePageZtd = memo(function TitlePageZtd() {
  const titlePage = useChatStore((state) => state.titlePage);

  return (
    <header className='px-4 py-3 border-b border-zinc-700'>
      <div className='text-center text-white text-lg font-semibold'>
        {titlePage}
      </div>
    </header>
  );
});

export { TitlePageZtd };
