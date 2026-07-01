import React, { useState, useCallback } from 'react';
import { HiMenuAlt4, HiX, HiMoon, HiSun, HiViewGrid, HiHome, HiUser, HiBriefcase, HiCode, HiMail } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

import { images } from '../../constants';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.scss';

const NAV_ITEMS = ['home', 'about', 'work', 'skills', 'contact'];

const NAV_ICONS = {
  home: HiHome,
  about: HiUser,
  work: HiBriefcase,
  skills: HiCode,
  contact: HiMail,
};

const menuVariants = {
  hidden: { y: 300, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { y: 300, opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const openMenu = useCallback(() => setToggle(true), []);
  const closeMenu = useCallback(() => setToggle(false), []);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo" />
        <span className="app__navbar-logo-text">Carlos</span>
      </div>

      <ul className="app__navbar-links">
        {NAV_ITEMS.map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {isDark ? <HiSun /> : <HiMoon />}
        </button>
        <div className="app__navbar-menu">
          <HiViewGrid onClick={openMenu} aria-label="Open menu" />

          <AnimatePresence>
            {toggle && (
              <motion.div
                key="mobile-menu"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mobile-menu-container"
              >
                <ul className="mobile-menu-items">
                  {NAV_ITEMS.map((item) => {
                    const Icon = NAV_ICONS[item];
                    return (
                      <li key={item}>
                        <a href={`#${item}`} onClick={closeMenu}>
                          <Icon />
                          <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <button
                  className="mobile-menu-close"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <HiX />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
