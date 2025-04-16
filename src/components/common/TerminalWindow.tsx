'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Footer from './Footer';
import { useAppContext } from '@/context/AppContext';
import Command from './Command';
import { FaTimes } from 'react-icons/fa';
import './TerminalWindow.css';

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
}

export const TerminalWindow = ({ children }: TerminalWindowProps) => {
  const { defaults } = useAppContext();
  const [activeTab, setActiveTab] = useState(0);
  const pathname = usePathname();

  // Create tab titles with paths
  const homeTabTitle = `${defaults.companyName.toLowerCase()}@homepage: ~ ./landing`;
  const contactTabTitle = `${defaults.companyName.toLowerCase()}@homepage: ~ ./smtp-client`;
  const blogTabTitle = `${defaults.companyName.toLowerCase()}@homepage: ~ ./blog`;

  // Set active tab based on current path
  useEffect(() => {
    if (pathname === '/') {
      setActiveTab(0);
    } else if (pathname === '/contact') {
      setActiveTab(1);
    } else if (pathname.startsWith('/blog')) {
      setActiveTab(2);
    }
  }, [pathname]);

  return (
    <div className="terminal-window">
      {/* Terminal title bar with tabs - Garuda Mokka/Dr4gonized style */}
      <div className="terminal-titlebar flex items-center">
        <div className="terminal-buttons flex items-center mr-2">
          <div className="terminal-button terminal-button-close"></div>
          <div className="terminal-button terminal-button-minimize"></div>
          <div className="terminal-button terminal-button-maximize"></div>
        </div>

        {/* Terminal tabs inline with title bar */}
        <div className="flex h-full">
          <Link
            href="/"
            className={`terminal-tab flex items-center justify-between px-3 text-xs h-full ${activeTab === 0 ? 'text-purple-400 border-b border-purple-400' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <span>{homeTabTitle}</span>
            <span className="ml-2 text-gray-500 opacity-50 hover:opacity-100">
              <FaTimes size={8} />
            </span>
          </Link>
          <Link
            href="/contact"
            className={`terminal-tab flex items-center justify-between px-3 text-xs h-full ${activeTab === 1 ? 'text-purple-400 border-b border-purple-400' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <span>{contactTabTitle}</span>
            <span className="ml-2 text-gray-500 opacity-50 hover:opacity-100">
              <FaTimes size={8} />
            </span>
          </Link>
          <Link
            href="/blog"
            className={`terminal-tab flex items-center justify-between px-3 text-xs h-full ${activeTab === 2 ? 'text-purple-400 border-b border-purple-400' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <span>{blogTabTitle}</span>
            <span className="ml-2 text-gray-500 opacity-50 hover:opacity-100">
              <FaTimes size={8} />
            </span>
          </Link>
        </div>
      </div>

      <div className="terminal-content">
        <Command command="clear" />
        {children}
        <Footer />
      </div>
    </div>
  );
};