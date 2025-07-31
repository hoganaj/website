import { webcrypto } from 'node:crypto';

// Polyfill crypto for Jest environment
Object.defineProperty(globalThis, 'crypto', {
  value: webcrypto,
});