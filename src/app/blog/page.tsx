'use client';

import React, { useState } from 'react';
import Command from '@/components/common/Command';
import BlogList from '@/components/blog/BlogList';

export default function Blog() {
  const [command, setCommand] = useState('exa -la --icons --git --color=always /var/www/blog');

  return (<>
        <Command command={command}>
          <div className="command-output">
            <BlogList updateCommand={setCommand} />
          </div>
        </Command>
      </>);
}