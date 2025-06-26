export const getStoredTheme = (): string => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  return localStorage.getItem('theme') || 'light';
};

export const setStoredTheme = (theme: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
};
