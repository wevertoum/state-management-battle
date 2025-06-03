import { type ActionFunctionArgs, redirect } from 'react-router';
import { getSession, commitSession } from '~/server/sessions.server';

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const formData = await request.formData();
  const token = formData.get('token');

  if (!token || typeof token !== 'string') {
    throw new Response('Token inválido', { status: 400 });
  }

  session.set('token', token);
  console.log('Token set in session:', token);

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}
