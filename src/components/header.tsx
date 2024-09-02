"use client";

import React, { useState, useEffect } from 'react';
import { IoSunnyOutline, IoMoonOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(defaultTheme);
  }, []);

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
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
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200">
          <li className="mb-2">
            <label htmlFor="my-drawer" className="drawer-button lg:hidden">
              <IoCloseOutline className="h-5 w-5" />
            </label>
          </li>
          <li><a>Home</a></li>
          <li><a>About</a></li>
          <li><a>Blog</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Header;