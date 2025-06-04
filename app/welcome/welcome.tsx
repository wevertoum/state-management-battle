import { Form, Link } from 'react-router';

export function Welcome() {
  return (
    <main className='flex items-center justify-center pt-16 pb-4 h-screen bg-zinc-900'>
      <div className='flex flex-col items-center gap-6'>
        <h1 className='text-2xl font-semibold'>Choose a Lab</h1>

        <div className='flex gap-4'>
          <Link
            to='/lab-api-context'
            className='rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          >
            Lab: API Context
          </Link>
          <Link
            to='/lab-zustand'
            className='rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700'
          >
            Lab: Zustand
          </Link>
          <Link
            to='/page-a'
            className='rounded-xl bg-purple-600 px-4 py-2 text-white hover:bg-purple-700'
          >
            Lab: Code Splitting
          </Link>
        </div>

        <Form method='post' action='/login' className='flex flex-col gap-2'>
          <input
            type='text'
            name='token'
            placeholder='Digite o token'
            className='rounded-md border border-gray-300 px-3 py-2 text-sm'
            required
          />
          <button
            type='submit'
            className='rounded-xl bg-gray-950 px-4 py-2 text-white hover:bg-gray-900 cursor-pointer'
          >
            Setar token teste no cookie
          </button>
        </Form>
      </div>
    </main>
  );
}

export default Welcome;
