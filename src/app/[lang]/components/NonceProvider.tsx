'use client';

import { createContext, useContext } from 'react';

// Create a context for the nonce
const NonceContext = createContext<string>('');

// Provider component
export function NonceProvider({ 
  children, 
  nonce 
}: { 
  children: React.ReactNode; 
  nonce: string;
}) {
  return (
    <NonceContext.Provider value={nonce}>
      {children}
    </NonceContext.Provider>
  );
}

// Hook to use the nonce
export function useNonce() {
  return useContext(NonceContext);
}