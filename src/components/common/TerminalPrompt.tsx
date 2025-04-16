'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';

interface TerminalPromptProps {
  path?: string;
}

const TerminalPrompt: React.FC<TerminalPromptProps> = ({ path = '~' }) => {
  const { defaults } = useAppContext();

  // Common style for all prompt parts
  const baseStyle = {
    fontFamily: 'var(--font-jetbrains-mono), monospace',
    fontSize: '13px',
    whiteSpace: 'nowrap' as const
  };

  return (
    <span className="terminal-prompt" style={{ whiteSpace: 'nowrap', flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}>
      <span
        style={{
          ...baseStyle,
          color: 'var(--prompt-brackets)',
          fontWeight: 'bold'
        }}
      >
        {`[${defaults.companyName.toLowerCase()}@homepage:`}
      </span>
      <span
        style={{
          ...baseStyle,
          color: 'var(--prompt-path)',
          fontWeight: 'bold'
        }}
      >
        {path}
      </span>
      <span
        style={{
          ...baseStyle,
          color: 'var(--prompt-brackets)',
          fontWeight: 'bold'
        }}
      >
        {`]`}
      </span>
      <span
        className="ml-1"
        style={{
          ...baseStyle,
          color: 'var(--prompt-dollar)'
        }}
      >
        $
      </span>
    </span>
  );
};

export default TerminalPrompt;
