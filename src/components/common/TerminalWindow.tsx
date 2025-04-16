'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Footer from './Footer';
import { useAppContext } from '@/context/AppContext';
import Command from './Command';
import { FaTimes } from 'react-icons/fa';

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
}

export const TerminalWindow = ({ children, title }: TerminalWindowProps) => {
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
    <div className="terminal-window" style={{
      backgroundColor: '#0c0c16',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(157, 78, 221, 0.1), 0 0 0 3px rgba(255, 123, 0, 0.05)',
      height: 'calc(100vh - 200px)', /* Adjusted for banner */
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto 10px auto',
      width: '90%',
      maxWidth: '1000px'
    }}>
      {/* Terminal title bar with tabs - Garuda Mokka/Dr4gonized style */}
      <div className="terminal-titlebar flex items-center" style={{
        background: '#0c0c16',
        borderBottom: '1px solid rgba(157, 78, 221, 0.3)',
        height: '32px',
        padding: '0 0 0 8px',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px'
      }}>
        <div className="terminal-buttons flex items-center mr-2">
          <div className="terminal-button terminal-close"></div>
          <div className="terminal-button terminal-minimize"></div>
          <div className="terminal-button terminal-maximize"></div>
        </div>

        {/* Terminal tabs inline with title bar */}
        <div className="flex h-full">
          <Link
            href="/"
            className={`flex items-center justify-between px-3 text-xs h-full ${activeTab === 0 ? 'text-purple-400 border-b border-purple-400' : 'text-gray-400 hover:text-gray-200'}`}
            style={{
              transition: 'all 0.2s ease',
              minWidth: '180px'
            }}
          >
            <span>{homeTabTitle}</span>
            <span className="ml-2 text-gray-500 opacity-50 hover:opacity-100">
              <FaTimes size={8} />
            </span>
          </Link>
          <Link
            href="/contact"
            className={`flex items-center justify-between px-3 text-xs h-full ${activeTab === 1 ? 'text-purple-400 border-b border-purple-400' : 'text-gray-400 hover:text-gray-200'}`}
            style={{
              transition: 'all 0.2s ease',
              minWidth: '180px'
            }}
          >
            <span>{contactTabTitle}</span>
            <span className="ml-2 text-gray-500 opacity-50 hover:opacity-100">
              <FaTimes size={8} />
            </span>
          </Link>
          <Link
            href="/blog"
            className={`flex items-center justify-between px-3 text-xs h-full ${activeTab === 2 ? 'text-purple-400 border-b border-purple-400' : 'text-gray-400 hover:text-gray-200'}`}
            style={{
              transition: 'all 0.2s ease',
              minWidth: '180px'
            }}
          >
            <span>{blogTabTitle}</span>
            <span className="ml-2 text-gray-500 opacity-50 hover:opacity-100">
              <FaTimes size={8} />
            </span>
          </Link>
        </div>
      </div>

      <div className="terminal-content" style={{
        background: '#0c0c16',
        borderBottomLeftRadius: '6px',
        borderBottomRightRadius: '6px',
        flex: '1',
        overflowY: 'auto'
      }}>
        <Command command="clear" />
        {children}
        <Footer />
      </div>
    </div>
  );
};