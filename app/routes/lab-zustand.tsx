import { useEffect } from 'react';
import { MessageListZtd } from '~/components/zustand/MessageListZtd';
import { PromptZtd } from '~/components/zustand/PromptZtd';
import { TitlePageZtd } from '~/components/zustand/TitlePageZtd';
import { getSession } from '~/server/sessions.server';
import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { useAuthStore } from '~/stores/useAuthStore';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token') ?? 'Tip: Lab Context API';
  return { token };
}

export default function LabZustand() {
  const { token } = useLoaderData() as { token: string };
  const initializeToken = useAuthStore((s) => s.initializeToken);

  useEffect(() => {
    initializeToken(token);
  }, [token, initializeToken]); // Inclui dependências para evitar chamadas desnecessárias

  return (
    <main className='flex flex-col h-screen w-screen bg-zinc-900 text-zinc-100'>
      <TitlePageZtd />
      <div className='flex-1 overflow-y-auto px-4 py-6'>
        <MessageListZtd />
      </div>
      <div className='border-t border-zinc-700 p-4 bg-zinc-900 sticky bottom-0'>
        <PromptZtd />
      </div>
    </main>
  );
}
