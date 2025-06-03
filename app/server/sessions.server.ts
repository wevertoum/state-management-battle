import { createCookieSessionStorage } from 'react-router';

export type SessionTest = {
  token: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionTest>({
    cookie: {
      name: '__chat_session',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
      secure: false,
    },
  });

export { getSession, commitSession, destroySession };
