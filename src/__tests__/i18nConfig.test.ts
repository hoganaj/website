import i18nConfig from '../i18nConfig';

describe('i18nConfig', () => {
  it('should export a configuration object', () => {
    expect(i18nConfig).toBeDefined();
    expect(typeof i18nConfig).toBe('object');
  });

  it('should have the correct locales', () => {
    expect(i18nConfig.locales).toEqual(['en', 'zh']);
    expect(Array.isArray(i18nConfig.locales)).toBe(true);
    expect(i18nConfig.locales).toHaveLength(2);
  });

  it('should have the correct default locale', () => {
    expect(i18nConfig.defaultLocale).toBe('en');
  });

  it('should include default locale in locales array', () => {
    expect(i18nConfig.locales).toContain(i18nConfig.defaultLocale);
  });

  it('should have all required properties', () => {
    expect(i18nConfig).toHaveProperty('locales');
    expect(i18nConfig).toHaveProperty('defaultLocale');
  });

  it('should not have any extra properties', () => {
    const expectedKeys = ['locales', 'defaultLocale'];
    const actualKeys = Object.keys(i18nConfig);
    expect(actualKeys).toEqual(expectedKeys);
  });
});
