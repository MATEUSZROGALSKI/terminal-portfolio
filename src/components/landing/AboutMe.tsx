'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '@/context/AppContext';

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
      <pre className="font-mono">
        <div className="text-terminal-text">Loading system information...</div>
      </pre>
    );
  }

  if (error) {
    return (
      <pre className="font-mono">
        <div className="text-red-400">{error}</div>
        <div className="text-yellow-400 mt-2">Try running: neofetch --help</div>
      </pre>
    );
  }

  // Create a bio from the about data
  const bio = aboutData.map(item => item.content).join(' ');
  const shortBio = bio.length > 300 ? bio.substring(0, 300) + '...' : bio;

  return (
    <div className="command-output">
      <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto">
        {/* ASCII Art Side */}
        <div className="flex-shrink-0 mb-4 lg:mb-0 mx-auto lg:mx-0">
          <pre
            ref={asciiRef}
            className="whitespace-pre font-mono text-xs md:text-sm"
            style={{ lineHeight: '1.2' }}
          >
            {/* Apply gradient colors to ASCII art */}
            {asciiArt.split('\n').map((line, index) => (
              <div
                key={index}
                style={{
                  background: 'linear-gradient(to right, #9d4edd, #ff7b00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block'
                }}
              >
                {line}
              </div>
            ))}
          </pre>
        </div>

        {/* System Info Side */}
        <div className="flex-grow">
          <div className="flex items-center mb-2">
            <span className="text-[#9d4edd] font-bold mr-2">{defaults.companyName}</span>
            <span className="text-terminal-text">@</span>
            <span className="text-[#ff7b00] font-bold ml-2">{defaults.projectName}</span>
          </div>

          <div className="flex items-center mb-2">
            <span className="text-terminal-text text-xs">Welcome to my terminal portfolio! Type 'help' for available commands.</span>
          </div>

          <div className="border-b border-gray-700 mb-2"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {/* System Info */}
            <div className="text-[#9d4edd]">OS:</div>
            <div className="text-terminal-text">
              {techProfile.find(item => item.category === 'os')?.value || 'Windows & Debian Linux'}
            </div>

            <div className="text-[#9d4edd]">Host:</div>
            <div className="text-terminal-text">Terminal Portfolio</div>

            <div className="text-[#9d4edd]">Kernel:</div>
            <div className="text-terminal-text">6.5.9-zen1-1-zen</div>

            <div className="text-[#9d4edd]">Uptime:</div>
            <div className="text-terminal-text">{generateUptime()}</div>

            <div className="text-[#9d4edd]">Packages:</div>
            <div className="text-terminal-text">{generatePackages()} (pacman)</div>

            <div className="text-[#9d4edd]">Shell:</div>
            <div className="text-terminal-text">bash 5.1.16</div>

            <div className="text-[#9d4edd]">Resolution:</div>
            <div className="text-terminal-text">1920x1080</div>

            <div className="text-[#9d4edd]">Terminal:</div>
            <div className="text-terminal-text">portfolio-terminal</div>

            {/* Developer Info */}
            <div className="text-[#9d4edd]">Role:</div>
            <div className="text-terminal-text">Backend Engineer</div>

            <div className="text-[#9d4edd]">Focus:</div>
            <div className="text-terminal-text">
              {techProfile.find(item => item.category === 'focus')?.value || 'Backend Engineering, DevOps, Software Architecture'}
            </div>

            <div className="text-[#9d4edd]">Memory:</div>
            <div className="text-terminal-text">{generateMemory()}</div>

            {/* Tech Stack */}
            <div className="text-[#9d4edd]">Languages:</div>
            <div className="text-terminal-text">
              {techProfile.find(item => item.category === 'languages')?.value || 'C#, Java, JavaScript, C, C++, Go'}
            </div>

            <div className="text-[#9d4edd]">Databases:</div>
            <div className="text-terminal-text">
              {techProfile.find(item => item.category === 'databases')?.value || 'MongoDB, PostgreSQL, SQL Server'}
            </div>

            <div className="text-[#9d4edd]">Tools:</div>
            <div className="text-terminal-text">
              {techProfile.find(item => item.category === 'tools')?.value || 'Visual Studio, VS Code, Docker'}
            </div>

            <div className="text-[#9d4edd]">Specialties:</div>
            <div className="text-terminal-text">
              {techProfile.find(item => item.category === 'specialties')?.value || 'Web APIs, Server Architecture, Security, Pentesting'}
            </div>
          </div>

          <div className="border-b border-gray-700 my-2"></div>

          <div className="text-xs text-terminal-text mt-2">
            <div className="text-[#9d4edd] mb-1">Bio:</div>
            <div>{shortBio}</div>
          </div>

          <div className="mt-4">
            <div className="text-[#9d4edd] mb-1 text-xs">Skills:</div>
            <div className="flex flex-wrap gap-1">
              {/* Skill blocks with different colors */}
              {[
                { name: 'Backend', color: '#ff7b00' },
                { name: 'Security', color: '#9d4edd' },
                { name: 'DevOps', color: '#00a3ff' },
                { name: 'Architecture', color: '#ff5e78' },
                { name: 'API Design', color: '#00c896' },
                { name: 'Pentesting', color: '#118ab2' },
                { name: 'Server Admin', color: '#06d6a0' },
                { name: 'Game Servers', color: '#ffd166' },
              ].map((skill, i) => (
                <div
                  key={i}
                  className="px-2 py-1 rounded-md text-xs text-black font-medium"
                  style={{
                    backgroundColor: skill.color,
                    opacity: 0.8
                  }}
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
                  className="w-6 h-6 rounded-sm"
                  style={{
                    backgroundColor: i < 8
                      ? `hsl(${i * 45}, 70%, 50%)`
                      : `hsl(${(i-8) * 45}, 70%, 30%)`
                  }}
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