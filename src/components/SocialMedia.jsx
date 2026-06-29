import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";


const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="/resume.pdf" target="_blank" aria-label="Resume Carlos Gómez">  
        <IoDocumentTextOutline />
      </a>
    </div>
    <div>
      <a href="https://github.com/garniersum/portfolio/" target="_blank" aria-label="GitHub profile Carlos Gómez">
        <FaGithub />
      </a>
    </div>
    <div>
      <a href="https://www.linkedin.com/in/garniersum/" target="_blank" aria-label="LinkedIn profile Carlos Gómez">
        <FaLinkedin />
      </a>
    </div>
  </div>
);

export default SocialMedia;
