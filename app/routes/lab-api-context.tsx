import { MessageListCtx } from '~/components/context-api/MessageListCtx';
import { ChatProvider } from '../context/ChatContext';
import { PromptCtx } from '~/components/context-api/PromptCtx';
import { TitlePageCtx } from '~/components/context-api/TitlePageCtx';

import { getSession } from '~/server/sessions.server';
import { useLoaderData, type LoaderFunctionArgs } from 'react-router';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token') ?? 'Tip: Lab Context API';
  return { token };
}

export default function LabApiContext() {
  const { token } = useLoaderData() as { token: string };

  return (
    <ChatProvider token={token}>
      <main className='flex flex-col h-screen w-screen bg-zinc-900 text-zinc-100'>
        <TitlePageCtx />
        <div className='flex-1 overflow-y-auto px-4 py-6'>
          <MessageListCtx />
        </div>
        <div className='border-t border-zinc-700 p-4 bg-zinc-900 sticky bottom-0'>
          <PromptCtx />
        </div>
      </main>
    </ChatProvider>
  );
}
