import { useEffect } from 'react';
import { useChatStore } from '../stores/useChatStore';
import { MessageListZtd } from '~/components/zustand/MessageListZtd';
import { PromptZtd } from '~/components/zustand/PromptZtd';

export default function LabZustand() {
  const loadMessagesFromStorage = useChatStore(
    (s) => s.loadMessagesFromStorage
  );

  useEffect(() => {
    loadMessagesFromStorage();
  }, [loadMessagesFromStorage]);

  return (
    <main className='flex flex-col h-screen w-screen bg-zinc-900 text-zinc-100'>
      <header className='px-4 py-3 border-b border-zinc-700'>
        <div className='text-center text-white text-lg font-semibold'>
          Tip: Lab Zustand
        </div>
      </header>

      <div className='flex-1 overflow-y-auto px-4 py-6'>
        <MessageListZtd />
      </div>

      <div className='border-t border-zinc-700 p-4 bg-zinc-900 sticky bottom-0'>
        <PromptZtd />
      </div>
    </main>
  );
}
