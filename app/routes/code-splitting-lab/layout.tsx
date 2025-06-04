import { Outlet, useLocation, useNavigate } from 'react-router';

export default function CodeSplittingLabLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      label: 'Page A',
      active: location.pathname.includes('page-a'),
      onNavItemClick: () => navigate('/page-a'),
    },
    {
      label: 'Page B',
      active: location.pathname.includes('page-b'),
      onNavItemClick: () => navigate('/page-b'),
    },
    {
      label: 'Page C',
      active: location.pathname.includes('page-c'),
      onNavItemClick: () => navigate('/page-c'),
    },
  ];

  return (
    <main className='flex flex-col h-screen w-screen bg-zinc-900 text-zinc-100'>
      <header className='border-b border-zinc-700 bg-zinc-800 p-4 sticky top-0 z-10'>
        <nav className='flex justify-center'>
          <ul className='flex gap-6'>
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={item.onNavItemClick}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    item.active
                      ? 'bg-zinc-700 text-zinc-100'
                      : 'text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <section className='flex-1 overflow-y-auto px-6 py-8'>
        <Outlet />
      </section>
      <footer className='border-t border-zinc-700 bg-zinc-800 p-4 text-center text-sm text-zinc-400'>
        Code Splitting Lab - Built for Lazy Loading, Suspense, and ErrorBoundary
      </footer>
    </main>
  );
}
