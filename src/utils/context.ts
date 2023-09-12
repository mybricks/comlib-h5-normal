import { createContext, useContext } from 'react';

export const ComEnvContext = createContext<RuntimeParams>({} as RuntimeParams);

export function useComEnv<T extends RuntimeParams>(): T {
  return useContext(ComEnvContext) as any;
}
