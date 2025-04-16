'use client';

import React from 'react';
import { TerminalWindow } from '@/components/common/TerminalWindow';
import Command from '@/components/common/Command';
import Banner from '@/components/common/Banner';

export default function Loading() {
  return (
    <main>
      <Banner />
      
      <TerminalWindow>
        <Command command="cat blog/loading...">
          <div className="command-output">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-48 bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-24 bg-gray-800 animate-pulse rounded ml-auto"></div>
              </div>
              
              <div className="flex gap-2 mb-6">
                <div className="h-6 w-16 bg-gray-800 animate-pulse rounded"></div>
                <div className="h-6 w-20 bg-gray-800 animate-pulse rounded"></div>
                <div className="h-6 w-24 bg-gray-800 animate-pulse rounded"></div>
              </div>
              
              <div className="space-y-3">
                <div className="h-8 w-full bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-5/6 bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-full bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-4/6 bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-5/6 bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-3/4 bg-gray-800 animate-pulse rounded"></div>
              </div>
              
              <div className="h-8 w-full bg-gray-800 animate-pulse rounded mt-4"></div>
              
              <div className="space-y-3 mt-4">
                <div className="h-4 w-full bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-5/6 bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-4/5 bg-gray-800 animate-pulse rounded"></div>
              </div>
              
              <div className="mt-6 flex items-center gap-2">
                <span className="text-terminal-text">Loading blog post</span>
                <span className="blink text-terminal-text">_</span>
              </div>
            </div>
          </div>
        </Command>
      </TerminalWindow>
    </main>
  );
} 