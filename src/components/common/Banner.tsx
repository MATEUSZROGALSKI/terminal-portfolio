'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaStackOverflow, FaSteam } from 'react-icons/fa';
import './Banner.css';

const Banner = () => {
  return (
    <div className="terminal-header px-4 py-8">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="banner-title text-4xl md:text-5xl font-bold tracking-wide">
          MRogal.ski
        </h1>
        <p className="banner-subtitle text-base md:text-lg mt-2">
          software engineering and architecture
        </p>
      </div>

      <div className="social-icons">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon hover:scale-110 transform transition-transform duration-300"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon hover:scale-110 transform transition-transform duration-300"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://stackoverflow.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon hover:scale-110 transform transition-transform duration-300"
        >
          <FaStackOverflow size={24} />
        </a>
        <a
          href="https://steamcommunity.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon hover:scale-110 transform transition-transform duration-300"
        >
          <FaSteam size={24} />
        </a>
      </div>
    </div>
  );
};

export default Banner;