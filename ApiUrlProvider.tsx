import { type FC, type ReactNode, createContext } from 'react';

export const ApiUrlContext = createContext<string | undefined>(undefined);

interface ApiUrlProviderProps {
  children: ReactNode;
}

export const ApiUrlProvider: FC<ApiUrlProviderProps> = ({ children }) => {
  type NodeEnvMode = 'development' | 'production' | 'none' | undefined;

  const nodeEnv = process.env.NODE_ENV as NodeEnvMode;

  let apiUrl = process.env.DEV_API_URL;

  if (nodeEnv === 'production') {
    apiUrl = process.env.PROD_API_URL;
  }

  return <ApiUrlContext.Provider value={apiUrl}>{children}</ApiUrlContext.Provider>;
};
