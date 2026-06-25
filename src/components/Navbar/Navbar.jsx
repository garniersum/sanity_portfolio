import React, { useState, useCallback } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

import { images } from '../../constants';
import './Navbar.scss';

const NAV_ITEMS = ['home', 'about', 'work', 'skills', 'contact'];

const menuVariants = {
  hidden: { x: 300, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.85, ease: 'easeOut' } },
  exit: { x: 300, opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } },
};

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const openMenu = useCallback(() => setToggle(true), []);
  const closeMenu = useCallback(() => setToggle(false), []);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo" />
      </div>

      <ul className="app__navbar-links">
        {NAV_ITEMS.map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={openMenu} />

        <AnimatePresence>
          {toggle && (
            <motion.div
              key="mobile-menu"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <HiX onClick={closeMenu} />
              <ul>
                {NAV_ITEMS.map((item) => (
                  <li key={item}>
                    <a href={`#${item}`} onClick={closeMenu}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
