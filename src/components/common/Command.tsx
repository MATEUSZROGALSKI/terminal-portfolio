'use client';

import React, { ReactNode } from 'react';
import TerminalPrompt from './TerminalPrompt';
import './Command.css';

interface CommandProps {
  command: string;
  children?: ReactNode;
}

const Command = ({ command, children }: CommandProps) => {

  return (
    <div className="mb-4 overflow-hidden">
      <div className="command-line">
        {/* Prompt part - will not wrap */}
        <span className="command-prompt">
          <TerminalPrompt />
        </span>

        {/* Command part - will continue on same line and wrap naturally */}
        <span className="command-text">
          {command}
        </span>
      </div>
      {children && (
        <div className="command-output command-output-container">
          {children}
        </div>
      )}
    </div>
  );
};

// Add default export for compatibility
export default Command;