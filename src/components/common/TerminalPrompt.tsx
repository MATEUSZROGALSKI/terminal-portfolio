'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import './TerminalPrompt.css';

interface TerminalPromptProps {
  path?: string;
}

const TerminalPrompt: React.FC<TerminalPromptProps> = ({ path = '~' }) => {
  const { defaults } = useAppContext();

  return (
    <span className="terminal-prompt">
      <span className="prompt-base prompt-brackets">
        {`[${defaults.companyName.toLowerCase()}@homepage:`}
      </span>
      <span className="prompt-base prompt-path">
        {path}
      </span>
      <span className="prompt-base prompt-brackets">
        {`]`}
      </span>
      <span className="prompt-base prompt-dollar ml-1">
        $
      </span>
    </span>
  );
};

export default TerminalPrompt;
