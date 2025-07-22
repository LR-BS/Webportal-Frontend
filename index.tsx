import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { App } from '@/App';

import { theme } from './chakraui.config';

import '@/styles/index.pcss';

const container = document.getElementById('app');

if (container === null) {
  throw new Error('Root not found');
}

const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
);
