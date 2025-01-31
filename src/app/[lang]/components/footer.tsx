'use client';
import i18nConfig from '@/i18nConfig';
import { getStoredTheme } from '@/utils/themeUtils';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = ({ dictionary, lang }: { dictionary: string; lang: string }) => {

  const currentLocale = lang;
  const router = useRouter();
  const currentPathname = usePathname();
  
  const handleLangChange = (newLocale: string) => {
     // Store current theme before navigation
     getStoredTheme();

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  const otherLocale = currentLocale === 'en' ? 'zh' : 'en';
  const buttonLabel = currentLocale === 'en' ? '中文' : 'English';

  return (
    <footer className="flex items-center justify-between px-4 py-3 text-neutral-content">
      <div className="text-sm whitespace-nowrap">
        <p>Copyright © {new Date().getFullYear()} - {dictionary}</p>
      </div>
      <nav className="flex items-center space-x-3">
      <a
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleLangChange(otherLocale);
          }}
          href="#"
          className="footer-title hover:text-neutral-950 m-0 cursor-pointer text-sm"
        >
          {buttonLabel}
        </a>
        <a aria-label="Github" href="https://github.com/hoganaj" target="_blank" className="flex items-center">
          <FaGithub size={24} className="fill-current hover:fill-neutral-950" />
        </a>
        <a aria-label="Linkedin" href="https://www.linkedin.com/in/aidanjhogan/" target="_blank" className="flex items-center">
          <FaLinkedin size={24} className="fill-current hover:fill-blue-600" />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;