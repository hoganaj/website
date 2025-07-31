import { getDictionary } from '../dictionaries';

// Mock the JSON imports
jest.mock('../dictionaries/en.json', () => ({
  header: { home: 'Home', about: 'About', blog: 'Blog' },
  footer: 'Footer',
  home: {
    title: 'Title',
    job: 'Job',
    location: 'Location',
    stack: 'Stack',
    hobbies: 'Hobbies',
  },
  about: {
    intro: 'Intro',
    uni: { title: 'University', desc: 'Description' },
    netbuilder: { title: 'Netbuilder', desc: 'Description' },
    gfk: { title: 'GfK', desc: 'Description' },
  },
  blog: { title: 'Blog', back: 'Back' },
  errors: { notFound: 'Not Found', resourceNotFound: 'Resource Not Found', returnHome: 'Return Home' },
  metadata: {
    layout: { title: 'Layout Title', desc: 'Layout Description' },
    home: { title: 'Home Title', desc: 'Home Description' },
    about: { title: 'About Title', desc: 'About Description' },
    blog: { title: 'Blog Title', desc: 'Blog Description' },
  },
  breadcrumbs: { home: 'Home', labels: { about: 'About', blog: 'Blog' } },
}), { virtual: true });

jest.mock('../dictionaries/zh.json', () => ({
  header: { home: '首页', about: '关于', blog: '博客' },
  footer: '页脚',
  home: {
    title: '标题',
    job: '工作',
    location: '位置',
    stack: '技术栈',
    hobbies: '爱好',
  },
  about: {
    intro: '介绍',
    uni: { title: '大学', desc: '描述' },
    netbuilder: { title: 'Netbuilder', desc: '描述' },
    gfk: { title: 'GfK', desc: '描述' },
  },
  blog: { title: '博客', back: '返回' },
  errors: { notFound: '未找到', resourceNotFound: '资源未找到', returnHome: '返回首页' },
  metadata: {
    layout: { title: '布局标题', desc: '布局描述' },
    home: { title: '首页标题', desc: '首页描述' },
    about: { title: '关于标题', desc: '关于描述' },
    blog: { title: '博客标题', desc: '博客描述' },
  },
  breadcrumbs: { home: '首页', labels: { about: '关于', blog: '博客' } },
}), { virtual: true });

describe('dictionaries', () => {
  describe('getDictionary', () => {
    it('should return English dictionary for "en" locale', async () => {
      const dictionary = await getDictionary('en');
      
      expect(dictionary).toBeDefined();
      expect(dictionary.header.home).toBe('Home');
      expect(dictionary.home.title).toBe('Title');
    });

    it('should return Chinese dictionary for "zh" locale', async () => {
      const dictionary = await getDictionary('zh');
      
      expect(dictionary).toBeDefined();
      expect(dictionary.header.home).toBe('首页');
      expect(dictionary.home.title).toBe('标题');
    });

    it('should return a properly typed Dictionary object', async () => {
      const dictionary = await getDictionary('en');
      
      // Check required properties exist
      expect(dictionary).toHaveProperty('header');
      expect(dictionary).toHaveProperty('footer');
      expect(dictionary).toHaveProperty('home');
      expect(dictionary).toHaveProperty('about');
      expect(dictionary).toHaveProperty('blog');
      expect(dictionary).toHaveProperty('errors');
      expect(dictionary).toHaveProperty('metadata');
      
      // Check nested structure
      expect(dictionary.header).toHaveProperty('home');
      expect(dictionary.header).toHaveProperty('about');
      expect(dictionary.header).toHaveProperty('blog');
      
      expect(dictionary.home).toHaveProperty('title');
      expect(dictionary.home).toHaveProperty('job');
      expect(dictionary.home).toHaveProperty('location');
      expect(dictionary.home).toHaveProperty('stack');
      expect(dictionary.home).toHaveProperty('hobbies');
    });

    it('should handle both supported locales', async () => {
      const enDict = await getDictionary('en');
      const zhDict = await getDictionary('zh');
      
      expect(enDict).toBeDefined();
      expect(zhDict).toBeDefined();
      
      // They should have the same structure but different content
      expect(enDict.header.home).not.toBe(zhDict.header.home);
      expect(typeof enDict.header.home).toBe('string');
      expect(typeof zhDict.header.home).toBe('string');
    });

    it('should return Promise<Dictionary>', async () => {
      const promise = getDictionary('en');
      expect(promise).toBeInstanceOf(Promise);
      
      const result = await promise;
      expect(result).toMatchObject({
        header: expect.objectContaining({
          home: expect.any(String),
          about: expect.any(String),
          blog: expect.any(String),
        }),
        footer: expect.any(String),
        home: expect.objectContaining({
          title: expect.any(String),
          job: expect.any(String),
          location: expect.any(String),
          stack: expect.any(String),
          hobbies: expect.any(String),
        }),
      });
    });

    it('should include breadcrumbs property when present', async () => {
      const dictionary = await getDictionary('en');
      
      if (dictionary.breadcrumbs) {
        expect(dictionary.breadcrumbs).toHaveProperty('home');
        expect(dictionary.breadcrumbs).toHaveProperty('labels');
        expect(typeof dictionary.breadcrumbs.labels).toBe('object');
      }
    });
  });
});