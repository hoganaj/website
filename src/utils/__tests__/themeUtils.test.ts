import { getStoredTheme, setStoredTheme } from '../themeUtils';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock document
const documentMock = {
  documentElement: {
    setAttribute: jest.fn(),
  },
};

// Mock window and document for Node environment
Object.defineProperty(global, 'window', {
  value: {
    localStorage: localStorageMock,
  },
  writable: true,
});

Object.defineProperty(global, 'document', {
  value: documentMock,
  writable: true,
});

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('themeUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window mock
    Object.defineProperty(global, 'window', {
      value: {
        localStorage: localStorageMock,
      },
      writable: true,
    });
  });

  describe('getStoredTheme', () => {
    it('should return "light" when window is undefined (SSR)', () => {
      // Mock server-side environment
      const originalWindow = global.window;
      delete (global as any).window;

      const theme = getStoredTheme();
      expect(theme).toBe('light');

      // Restore window
      global.window = originalWindow;
    });

    it('should return stored theme from localStorage', () => {
      localStorageMock.getItem.mockReturnValue('dark');

      const theme = getStoredTheme();
      expect(theme).toBe('dark');
      expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
    });

    it('should return "light" as default when no theme is stored', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const theme = getStoredTheme();
      expect(theme).toBe('light');
      expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
    });

    it('should return "light" as default when localStorage returns empty string', () => {
      localStorageMock.getItem.mockReturnValue('');

      const theme = getStoredTheme();
      expect(theme).toBe('light');
      expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
    });
  });

  describe('setStoredTheme', () => {
    it('should do nothing when window is undefined (SSR)', () => {
      // Clear mocks first
      jest.clearAllMocks();

      // Mock server-side environment by setting window to undefined
      Object.defineProperty(global, 'window', {
        value: undefined,
        writable: true,
      });

      setStoredTheme('dark');

      expect(localStorageMock.setItem).not.toHaveBeenCalled();
      expect(documentMock.documentElement.setAttribute).not.toHaveBeenCalled();

      // Restore window
      Object.defineProperty(global, 'window', {
        value: {
          localStorage: localStorageMock,
        },
        writable: true,
      });
    });

    it('should set theme in localStorage and update document attribute', () => {
      setStoredTheme('dark');

      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
      expect(documentMock.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'dark'
      );
    });

    it('should handle different theme values', () => {
      const themes = ['light', 'dark', 'auto', 'custom-theme'];

      themes.forEach((theme) => {
        jest.clearAllMocks();
        setStoredTheme(theme);

        expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', theme);
        expect(documentMock.documentElement.setAttribute).toHaveBeenCalledWith(
          'data-theme',
          theme
        );
      });
    });

    it('should handle empty string theme', () => {
      setStoredTheme('');

      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', '');
      expect(documentMock.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        ''
      );
    });
  });
});
