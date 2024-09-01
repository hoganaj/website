"use client";

import { useState, useEffect } from 'react';
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(defaultTheme);
  }, []);

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
  };

  const handleThemeSwitch = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    setTheme(newTheme);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <ul className="menu menu-horizontal px-1">
        <li><a>Home</a></li>
        <li><a>About</a></li>
        <li><a>Blog</a></li>
        </ul>
      </div>
    <div className="navbar-center">
        <a className="text-xl">Aidan Hogan</a>
    </div>
    <div className='navbar-end'>
        <label className="swap swap-rotate ml-auto">
            <input
            type="checkbox"
            checked={isDarkMode}
            onChange={handleThemeSwitch}
            />
            <IoSunnyOutline className="swap-off h-10 w-10 fill-current" />
            <IoMoonOutline className="swap-on h-10 w-10 fill-current" />
        </label>
    </div>
    </div>
  );
}

export default Header;
