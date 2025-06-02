import { ChatProvider } from '../context/ChatContext';
import { MessageList } from '../components/MessageList';
import { Prompt } from '../components/Prompt';

export default function LabApiContext() {
  return (
    <ChatProvider>
      <main className='flex flex-col h-screen w-screen bg-zinc-900 text-zinc-100'>
        <header className='px-4 py-3 border-b border-zinc-700'>
          <div className='text-center text-white text-lg font-semibold'>
            Tip: Lab Context API
          </div>
        </header>

        <div className='flex-1 overflow-y-auto px-4 py-6'>
          <MessageList />
        </div>

        <div className='border-t border-zinc-700 p-4 bg-zinc-900 sticky bottom-0'>
          <Prompt />
        </div>
      </main>
    </ChatProvider>
  );
}
