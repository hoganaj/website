import 'server-only'
 
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  zh: () => import('./dictionaries/zh.json').then((module) => module.default),
}
 
// In getDictionary.ts or wherever getDictionary is defined:
export const getDictionary = async (locale: 'en' | 'zh'): Promise<Dictionary> => {
  return dictionaries[locale]();
};
