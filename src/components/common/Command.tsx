'use client';

import React, { ReactNode } from 'react';
import { useAppContext } from '@/context/AppContext';
import TerminalPrompt from './TerminalPrompt';

interface CommandProps {
  command: string;
  children?: ReactNode;
}

const Command = ({ command, children }: CommandProps) => {
  const { defaults } = useAppContext();

  return (
    <div className="mb-4 overflow-hidden">
      <div className="command-line" style={{
        position: 'relative',
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        fontSize: '13px',
        lineHeight: '1.5',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {/* Prompt part - will not wrap */}
        <span style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}>
          <TerminalPrompt />
        </span>

        {/* Command part - will continue on same line and wrap naturally */}
        <span style={{
          color: 'var(--prompt-command)',
          marginLeft: '4px',
          wordBreak: 'break-all'
        }}>
          {command}
        </span>
      </div>
      {children && (
        <div
          className="command-output"
          style={{
            color: '#e4e4e4',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '13px',
            lineHeight: '1.5',
            marginTop: '0.25rem',
            paddingLeft: '0', // No padding needed as output should start at beginning of line
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            width: '100%'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

// Add default export for compatibility
export default Command;