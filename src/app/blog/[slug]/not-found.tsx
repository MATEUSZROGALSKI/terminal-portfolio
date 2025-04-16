'use client';

import React from 'react';
import { TerminalWindow } from '@/components/common/TerminalWindow';
import Command from '@/components/common/Command';
import Banner from '@/components/common/Banner';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <Banner />

      <TerminalWindow>
        <Command command="cat blog/not-found.txt">
          <div className="command-output">
            <h1 className="text-xl font-bold mb-4">Error: Blog post not found</h1>
            <p className="mb-4">The blog post you're looking for could not be found. This could be due to:</p>

            <ul className="list-disc ml-8 mb-6">
              <li>An incorrect URL</li>
              <li>A post that has been removed</li>
              <li>A typo in the blog post identifier</li>
            </ul>

            <div className="mt-6">
              <p className="mb-2">You can try:</p>
              <div className="pl-4">
                <p className="mb-2">$ <Link href="/blog" className="text-blue-400 hover:underline">cd /blog</Link> - Return to blog list</p>
                <p>$ <Link href="/" className="text-blue-400 hover:underline">cd /home</Link> - Go to homepage</p>
              </div>
            </div>
          </div>
        </Command>
      </TerminalWindow>
    </main>
  );
}