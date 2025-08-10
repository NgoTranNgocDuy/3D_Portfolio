import { useState } from 'react';
import { navLinks } from '../constants/index.js';

const NavItems = ({ onClick = () => {} }) => (
  <ul className="flex space-x-4 nav-ul">
    {navLinks.map((item) => (
      <li key={item.id} className="nav-item">
        <a href={item.href} className="nav-link smooth-nav text-lg md:text-xl" onClick={onClick}>
          <i className={`fa ${item.icon}`} aria-hidden="true"></i>
          <span>{item.name}</span>
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 shadow-lg shadow-gray-500">
      <style>
        {`
          .smooth-nav {
            transition: color 0.5s cubic-bezier(0.4,0,0.2,1), border-bottom 0.5s cubic-bezier(0.4,0,0.2,1);
            border-bottom: 2px solid transparent;
          }
          .smooth-nav:hover, .smooth-nav:focus {
            color: #a78bfa;
            border-bottom: 2px solid #a78bfa;
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="/" className="font-extrabold text-4xl md:text-5xl lg:text-6xl transition-colors animated-name" style={{ letterSpacing: '2px' }}>
            Tran Ngoc Duy Ngo
          </a>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
          >
            <img src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt="toggle" className="w-6 h-6" />
          </button>

          <nav className="sm:flex hidden">
            <NavItems />
          </nav>
        </div>
      </div>

      {/* Animated name style */}
      <style>
        {`
          .animated-name {
            color: #a78bfa;
            background: linear-gradient(270deg, #a78bfa, #f472b6, #38bdf8, #a7f3d0);
            background-size: 800% 800%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientMove 8s ease-in-out infinite;
          }
          @keyframes gradientMove {
            0% {background-position:0% 50%}
            50% {background-position:100% 50%}
            100% {background-position:0% 50%}
          }
        `}
      </style>

      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
