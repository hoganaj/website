"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { IoSunnyOutline, IoMoonOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { getStoredTheme, setStoredTheme } from '@/utils/themeUtils';

const Header = ({ dictionary, lang }: { dictionary: { [key: string]: string }; lang: string }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const initializeTheme = () => {
      const storedTheme = getStoredTheme();
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Use stored theme if available, otherwise use system preference
      const theme = storedTheme || (prefersDark ? 'dark' : 'light');
      setTheme(theme);
    };

    initializeTheme();
  }, []);

  const setTheme = (theme: string) => {
    setStoredTheme(theme);
    setIsDarkMode(theme === 'dark');
  };

  const handleThemeSwitch = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={toggleDrawer} />
      <div className="drawer-content">
        {/* Navbar */}
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button lg:hidden">
              <IoMenuOutline className="h-5 w-5" />
            </label>
            <ul className="menu menu-horizontal px-1 hidden lg:flex">
              <li><Link href={`/${lang}`}>{dictionary.home}</Link></li>
              <li><Link href={`/${lang}/about`}>{dictionary.about}</Link></li>
              <li><Link href={`/${lang}/blog`}>{dictionary.blog}</Link></li>
            </ul>
          </div>
          <div className="navbar-center">
          <div className="flex items-center space-x-2">
            <div className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Aidan Hogan
            </div>
            <span className="text-3xl">🧑‍💻</span>
          </div>
        </div>

          <div className='navbar-end'>
            <label className="swap swap-rotate ml-auto">
              <input
                id='theme-switch'
                type="checkbox"
                checked={isDarkMode}
                onChange={handleThemeSwitch}
              />
              <IoSunnyOutline className="swap-off h-10 w-10 fill-current" />
              <IoMoonOutline className="swap-on h-10 w-10 fill-current" />
            </label>
          </div>
        </div>
      </div> 
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200">
          <li className="mb-2">
            <label htmlFor="my-drawer" className="drawer-button lg:hidden">
              <IoCloseOutline className="h-5 w-5" />
            </label>
          </li>
          <li onClick={toggleDrawer}><Link href={`/${lang}`}>{dictionary.home}</Link></li>
          <li onClick={toggleDrawer}><Link href={`/${lang}/about`}>{dictionary.about}</Link></li>
          <li onClick={toggleDrawer}><Link href={`/${lang}/blog`}>{dictionary.blog}</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Header;