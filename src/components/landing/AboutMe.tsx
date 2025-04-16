'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '@/context/AppContext';
import './AboutMe.css';

interface AboutProps {
  _id: string;
  content: string;
}

interface TechProfileProps {
  _id: string;
  category: string;
  value: string;
}

const AboutMe = () => {
  const { defaults } = useAppContext();
  const [aboutData, setAboutData] = useState<AboutProps[]>([]);
  const [techProfile, setTechProfile] = useState<TechProfileProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [asciiArt, setAsciiArt] = useState<string>('');
  const asciiRef = useRef<HTMLPreElement>(null);

  // Fetch ASCII art from the text file
  useEffect(() => {
    fetch('/ascii-profile.txt')
      .then(response => response.text())
      .then(text => {
        setAsciiArt(text);
      })
      .catch(err => {
        console.error('Error loading ASCII art:', err);
      });
  }, []);

  // Fetch about data and tech profile from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch about data
        const aboutResponse = await fetch('/api/v1/about');
        if (!aboutResponse.ok) {
          throw new Error(`Failed to fetch about data: ${aboutResponse.statusText}`);
        }
        const aboutData = await aboutResponse.json();
        setAboutData(aboutData.items);

        // Fetch tech profile data
        const techProfileResponse = await fetch('/api/v1/tech-profile');
        if (!techProfileResponse.ok) {
          throw new Error(`Failed to fetch tech profile data: ${techProfileResponse.statusText}`);
        }
        const techProfileData = await techProfileResponse.json();
        setTechProfile(techProfileData.items);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load information. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate a random uptime
  const generateUptime = () => {
    const days = Math.floor(Math.random() * 365) + 1;
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${days} days, ${hours} hours, ${minutes} minutes`;
  };

  // Generate a random number of packages
  const generatePackages = () => {
    return Math.floor(Math.random() * 1000) + 500;
  };

  // Generate a random memory usage
  const generateMemory = () => {
    const used = Math.floor(Math.random() * 8) + 2;
    const total = 16;
    return `${used}GB / ${total}GB`;
  };

  if (isLoading) {
    return (
      <pre className="font-mono terminal-font">
        <div className="text-terminal-text">Loading system information...</div>
      </pre>
    );
  }

  if (error) {
    return (
      <pre className="font-mono terminal-font">
        <div className="text-red-400">{error}</div>
        <div className="text-yellow-400 mt-2">Try running: neofetch --help</div>
      </pre>
    );
  }

  // Create a bio from the about data
  const bio = aboutData.map(item => item.content).join(' ');
  const shortBio = bio.length > 300 ? bio.substring(0, 300) + '...' : bio;

  return (
    <div className="command-output terminal-font">
      <div className="neofetch-container">
        {/* ASCII Art Side */}
        <div className="ascii-container">
          <pre
            ref={asciiRef}
            className="ascii-art font-mono"
          >
            {/* Apply gradient colors to ASCII art */}
            {asciiArt.split('\n').map((line, index) => (
              <div
                key={index}
                className="ascii-line"
              >
                {line}
              </div>
            ))}
          </pre>
        </div>

        {/* System Info Side */}
        <div className="info-container">
          <div className="info-line mb-2">
            <span className="info-label">{defaults.companyName}</span>
            <span className="info-value">@</span>
            <span className="info-highlight ml-2">{defaults.projectName}</span>
          </div>

          <div className="info-line mb-2">
            <span className="info-value">Welcome to my terminal portfolio! Type 'help' for available commands.</span>
          </div>

          <div className="border-b border-gray-700 mb-2"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
            {/* System Info */}
            <div className="info-label">OS:</div>
            <div className="info-value">
              {techProfile.find(item => item.category === 'os')?.value || 'Windows & Debian Linux'}
            </div>

            <div className="info-label">Host:</div>
            <div className="info-value">Terminal Portfolio</div>

            <div className="info-label">Kernel:</div>
            <div className="info-value">6.5.9-zen1-1-zen</div>

            <div className="info-label">Uptime:</div>
            <div className="info-value">{generateUptime()}</div>

            <div className="info-label">Packages:</div>
            <div className="info-value">{generatePackages()} (pacman)</div>

            <div className="info-label">Shell:</div>
            <div className="info-value">bash 5.1.16</div>

            <div className="info-label">Resolution:</div>
            <div className="info-value">1920x1080</div>

            <div className="info-label">Terminal:</div>
            <div className="info-value">portfolio-terminal</div>

            {/* Developer Info */}
            <div className="info-label">Role:</div>
            <div className="info-value">Backend Engineer</div>

            <div className="info-label">Focus:</div>
            <div className="info-value">
              {techProfile.find(item => item.category === 'focus')?.value || 'Backend Engineering, DevOps, Software Architecture'}
            </div>

            <div className="info-label">Memory:</div>
            <div className="info-value">{generateMemory()}</div>

            {/* Tech Stack */}
            <div className="info-label">Languages:</div>
            <div className="info-value">
              {techProfile.find(item => item.category === 'languages')?.value || 'C#, Java, JavaScript, C, C++, Go'}
            </div>

            <div className="info-label">Databases:</div>
            <div className="info-value">
              {techProfile.find(item => item.category === 'databases')?.value || 'MongoDB, PostgreSQL, SQL Server'}
            </div>

            <div className="info-label">Tools:</div>
            <div className="info-value">
              {techProfile.find(item => item.category === 'tools')?.value || 'Visual Studio, VS Code, Docker'}
            </div>

            <div className="info-label">Specialties:</div>
            <div className="info-value">
              {techProfile.find(item => item.category === 'specialties')?.value || 'Web APIs, Server Architecture, Security, Pentesting'}
            </div>
          </div>

          <div className="border-b border-gray-700 my-2"></div>

          <div className="mt-2">
            <div className="info-label mb-1">Bio:</div>
            <div className="info-value">{shortBio}</div>
          </div>

          <div className="mt-4">
            <div className="info-label mb-1">Skills:</div>
            <div className="flex flex-wrap gap-1">
              {/* Skill blocks with different colors */}
              {[
                { name: 'Backend', className: 'skill-tag-backend' },
                { name: 'Security', className: 'skill-tag-security' },
                { name: 'DevOps', className: 'skill-tag-devops' },
                { name: 'Architecture', className: 'skill-tag-architecture' },
                { name: 'API Design', className: 'skill-tag-api-design' },
                { name: 'Pentesting', className: 'skill-tag-pentesting' },
                { name: 'Server Admin', className: 'skill-tag-server-admin' },
                { name: 'Game Servers', className: 'skill-tag-game-servers' },
              ].map((skill, i) => (
                <div
                  key={i}
                  className={`skill-tag ${skill.className}`}
                >
                  {skill.name}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              {/* Color Blocks - 2 rows of 8 colors */}
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`color-block color-block-${i}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;