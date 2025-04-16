'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import TerminalPrompt from './TerminalPrompt';

const Footer = () => {
  const { defaults } = useAppContext();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update the year if needed (in case the component stays mounted across year change)
    const interval = setInterval(() => {
      const year = new Date().getFullYear();
      if (year !== currentYear) {
        setCurrentYear(year);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [currentYear]);

  return (
    <div className="mt-6 pt-4 border-t border-gray-800">
      <div className="command-line">
        <span className="prompt">
          <TerminalPrompt />
        </span>
        <span
          className="command ml-1"
          style={{
            color: 'var(--prompt-command)',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '13px'
          }}
        >
          {`echo "© ${currentYear} ${defaults.companyName}. All rights reserved."`}
        </span>
      </div>
      <div className="command-output mb-4">
        © {currentYear} {defaults.companyName}. All rights reserved. | <a href={defaults.url} className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">{defaults.url}</a>
      </div>
      <div className="command-line">
        <span className="prompt">
          <TerminalPrompt />
        </span>
        <span
          className="command ml-1"
          style={{
            color: 'var(--prompt-command)',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '13px'
          }}
        >
          exit
        </span>
        <span className="blink text-terminal-text ml-1">_</span>
      </div>
    </div>
  );
};

export default Footer;