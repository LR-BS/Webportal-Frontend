import type { FC } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';

import { ErrorFallbackExample } from '@/ErrorFallbackExample';
import { router } from '@/router';

import { ApiUrlProvider } from './ApiUrlProvider';

export const App: FC = () => (
  <ApiUrlProvider>
    <ErrorBoundary FallbackComponent={ErrorFallbackExample}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </ApiUrlProvider>
);
