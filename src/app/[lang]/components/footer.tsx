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
    <footer className="flex flex-wrap justify-between items-center p-4 text-neutral-content">
      <div className="flex-grow mr-4 mb-2 sm:mb-0">
        <p>Copyright © {new Date().getFullYear()} - {dictionary}</p>
      </div>
      <nav className="flex flex-wrap items-center gap-4">
      <a
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleLangChange(otherLocale);
          }}
          href="#"
          className="footer-title hover:text-neutral-950 m-0 cursor-pointer"
        >
          {buttonLabel}
        </a>
        <a aria-label="Github" href="https://github.com/hoganaj" target="_blank" className="flex items-center">
          <FaGithub size={24} className="fill-current hover:fill-neutral-950" />
        </a>
        <a aria-label="Linkedin" href="https://www.linkedin.com/in/aidan-hogan-7b378a177/" target="_blank" className="flex items-center">
          <FaLinkedin size={24} className="fill-current hover:fill-blue-600" />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;