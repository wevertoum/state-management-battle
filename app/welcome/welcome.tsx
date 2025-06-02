import { Link } from 'react-router';

export function Welcome() {
  return (
    <main className='flex items-center justify-center pt-16 pb-4'>
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
        </div>
      </div>
    </main>
  );
}
