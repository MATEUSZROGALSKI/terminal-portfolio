'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaStackOverflow, FaSteam } from 'react-icons/fa';

const Banner = () => {
  return (
    <div className="terminal-header px-4 py-8" style={{
      backgroundColor: '#0c0c16'
    }}>
      <div className="flex flex-col items-center justify-center mb-8">
        <h1
          className="text-4xl md:text-5xl font-bold tracking-wide"
          style={{
            background: 'linear-gradient(to right, #9d4edd, #ff7b00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}
        >
          MRogal.ski
        </h1>
        <p
          className="text-base md:text-lg mt-2"
          style={{
            background: 'linear-gradient(to right, #9d4edd 30%, #ff7b00 70%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            opacity: 0.8,
            display: 'inline-block'
          }}
        >
          software engineering and architecture
        </p>
      </div>

      <div className="flex justify-center gap-8">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transform transition-transform duration-300"
          style={{
            background: 'linear-gradient(to right, #9d4edd, #ff7b00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transform transition-transform duration-300"
          style={{
            background: 'linear-gradient(to right, #9d4edd, #ff7b00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://stackoverflow.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transform transition-transform duration-300"
          style={{
            background: 'linear-gradient(to right, #9d4edd, #ff7b00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <FaStackOverflow size={24} />
        </a>
        <a
          href="https://steamcommunity.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transform transition-transform duration-300"
          style={{
            background: 'linear-gradient(to right, #9d4edd, #ff7b00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <FaSteam size={24} />
        </a>
      </div>
    </div>
  );
};

export default Banner;