import { memo } from 'react';
import { useChatTitlePage } from '~/stores/useChatStore';
import { useAuthStore } from '~/stores/useAuthStore';

const TitlePageZtd = memo(function TitlePageZtd() {
  const titlePage = useChatTitlePage();
  const token = useAuthStore((state) => state.token);

  return (
    <header className='px-4 py-3 border-b border-zinc-700'>
      <div className='text-center text-white text-lg font-semibold'>
        {titlePage} - {token}
      </div>
    </header>
  );
});

export { TitlePageZtd };
