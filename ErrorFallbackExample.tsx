import type { FC } from 'react';

import type { FallbackProps } from 'react-error-boundary';

interface ErrorFallbackProps extends Omit<FallbackProps, 'error'> {
  error: Error;
}

export const ErrorFallbackExample: FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
  <div role='alert'>
    <p>Something went wrong:</p>

    <pre>{error.message}</pre>

    <button
      type='button'
      onClick={resetErrorBoundary}
    >
      Try again
    </button>
  </div>
);
