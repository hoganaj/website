import { webcrypto } from 'node:crypto';

// Polyfill crypto for Jest environment
Object.defineProperty(global, 'crypto', {
  value: webcrypto,
});
