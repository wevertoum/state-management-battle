import { useState, Suspense, lazy } from 'react';
import { ErrorBoundary } from '../../../components/ErrorBoundary';

async function delayForDemo(promise: any) {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  return promise;
}

const LazySlow = lazy(() =>
  delayForDemo(import('../../../components/lazy/SlowComponent'))
);
const LazyError = lazy(() =>
  delayForDemo(import('../../../components/lazy/ErrorComponent'))
);

export default function PageB() {
  const [showComponents, setShowComponents] = useState(false);

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-2xl font-semibold'>Page B - Suspense & Lazy</h1>
      <label>
        <input
          type='checkbox'
          checked={showComponents}
          onChange={(e) => setShowComponents(e.target.checked)}
          className='mr-2'
        />
        Show Components
      </label>
      {showComponents && (
        <>
          <Suspense
            fallback={
              <p className='text-yellow-400'>
                ⏳ Carregando componente lento...
              </p>
            }
          >
            <LazySlow />
          </Suspense>

          <ErrorBoundary
            fallback={
              <p className='text-red-400'>🚨 Algo deu errado ao carregar!</p>
            }
          >
            <Suspense
              fallback={
                <p className='text-yellow-400'>
                  ⏳ Carregando componente com erro...
                </p>
              }
            >
              <LazyError />
            </Suspense>
          </ErrorBoundary>
        </>
      )}
    </div>
  );
}
