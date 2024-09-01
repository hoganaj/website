import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer text-neutral-content items-center p-4">
            <aside className="grid-flow-col items-center">
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <h6 className="footer-title hover:text-neutral-950">中文</h6>
                <a aria-label="Github">
                    <FaGithub size={24} className="fill-current hover:fill-neutral-950" />
                </a>
                <a aria-label="Linkedin">
                    <FaLinkedin size={24} className="fill-current hover:fill-blue-600" />
                </a>
            </nav>
        </footer>
    );
};

export default Footer;
