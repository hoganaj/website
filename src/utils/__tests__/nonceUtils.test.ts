import { generateNonce } from '../nonceUtils';

describe('nonceUtils', () => {
  describe('generateNonce', () => {
    it('should generate a nonce string', () => {
      const nonce = generateNonce();
      expect(typeof nonce).toBe('string');
      expect(nonce.length).toBeGreaterThan(0);
    });

    it('should generate unique nonces', () => {
      const nonce1 = generateNonce();
      const nonce2 = generateNonce();
      expect(nonce1).not.toBe(nonce2);
    });

    it('should generate base64url-encoded strings', () => {
      const nonce = generateNonce();
      // Base64url should not contain +, /, or = characters
      expect(nonce).not.toMatch(/[+/=]/);
      // Should only contain valid base64url characters
      expect(nonce).toMatch(/^[A-Za-z0-9_-]+$/);
    });

    it('should generate nonces of consistent length', () => {
      const nonces = Array.from({ length: 10 }, () => generateNonce());
      const lengths = nonces.map(n => n.length);
      const uniqueLengths = new Set(lengths);
      // All nonces should have similar length (within 1-2 chars due to base64 padding removal)
      expect(uniqueLengths.size).toBeLessThanOrEqual(2);
    });

    it('should use crypto.getRandomValues', () => {
      const originalGetRandomValues = crypto.getRandomValues;
      const mockGetRandomValues = jest.fn().mockImplementation((arr) => {
        // Fill with predictable values for testing
        for (let i = 0; i < arr.length; i++) {
          arr[i] = i;
        }
        return arr;
      });
      
      Object.defineProperty(crypto, 'getRandomValues', {
        value: mockGetRandomValues,
        writable: true
      });

      generateNonce();
      expect(mockGetRandomValues).toHaveBeenCalledWith(expect.any(Uint8Array));
      expect(mockGetRandomValues).toHaveBeenCalledTimes(1);

      // Restore original implementation
      Object.defineProperty(crypto, 'getRandomValues', {
        value: originalGetRandomValues,
        writable: true
      });
    });
  });
});