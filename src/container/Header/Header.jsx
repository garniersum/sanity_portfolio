import { memo, useState, useEffect } from 'react';
import { motion, useReducedMotion, useAnimation } from 'framer-motion';

import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import './Header.scss';

import { FaGithub } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

const TECH_ICONS = [
  { src: images.react,   alt: 'React'   },
  { src: images.nextjs,  alt: 'Next.js' },
  { src: images.sassiso, alt: 'Sass'    },
];

const Header = memo(() => {
  const reduce = useReducedMotion();

  const slideVariants = {
    hidden:  { x: reduce ? 0 : -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: reduce ? 0 : 0.5, type: 'spring' } },
  };

  const fadeVariants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.6, delay: 0.2 } },
  };

  const scaleVariants = {
    hidden:  { scale: reduce ? 1 : 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: reduce ? 0 : 1, ease: 'easeInOut', delay: 0.4 } },
  };

  const floatVariants = {
    hidden:  { y: 0 },
    visible: { 
      y: [-10, 10, -10],
      transition: { 
        duration: 3, 
        repeat: Infinity, 
        ease: 'easeInOut' 
      }
    },
  };

  return (
    <div className="app__header app__flex">

      <motion.div
        variants={slideVariants}
        initial="hidden"
        whileInView="visible"
        //viewport={{ once: true }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span role="img" aria-label="Waving hand">👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, I am</p>
              <h1 className="head-text">Carlos</h1>
            </div>
          </div>
        </div>
        <div className="app__header-CTA">
          <div className="tag-resume">
            <a href="/resume.pdf" target="_blank">Resume</a>       
          </div>
          <div className="tag-github">
            <a href="https://github.com/garniersum/portfolio/" target="_blank" className="p-text" aria-label="GitHub profile Carlos Gómez">
              <FaGithub />
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        //viewport={{ once: true }}
        className="app__header-img"
      >
        <motion.div
          variants={floatVariants}
          initial="hidden"
          animate="visible"
          className="profile-wrapper"
        >
          <picture>
            <source srcSet={images.profile2} type="image/webp" />
            <img
              src={images.profile2}
              alt="Carlos Gómez, Frontend Developer"
              width="100%"
              height="100%"
              fetchPriority="high"
              decoding="async"
              className="app__header-img"
            />
          </picture>
        </motion.div>
        <motion.img
          variants={scaleVariants}
          initial="hidden"
          whileInView="visible"
          //viewport={{ once: true }}
          src={images.circle}
          alt=""
          aria-hidden="true"
          className="overlay_circle"
          width={200}
          height={200}
          decoding="async"
        />
      </motion.div>

      <motion.div
        variants={scaleVariants}
        initial="hidden"
        whileInView="visible"
        //viewport={{ once: true }}
        className="app__header-circles"
      >
        {TECH_ICONS.map(({ src, alt }) => (
          <div className="circle-cmp app__flex" key={alt}>
            <img
              src={src}
              alt={alt}
              width={128}
              height={128}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </motion.div>

    </div>
  );
});

Header.displayName = 'Header';

export default AppWrap(Header, 'home');