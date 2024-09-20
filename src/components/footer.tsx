import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex flex-wrap justify-between items-center p-4 text-neutral-content">
      <div className="flex-grow mr-4 mb-2 sm:mb-0">
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </div>
      <nav className="flex flex-wrap items-center gap-4">
        <h6 className="footer-title hover:text-neutral-950 m-0">中文</h6>
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