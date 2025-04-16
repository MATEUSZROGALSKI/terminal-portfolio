'use client';

import React from 'react';
import { TerminalWindow } from '@/components/common/TerminalWindow';
import Command from '@/components/common/Command';
import Banner from '@/components/common/Banner';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log the error to monitoring service
    console.error(error);
  }, [error]);

  return (
    <main>
      <Banner />

      <TerminalWindow>
        <Command command="cat blog/error.log">
          <div className="command-output">
            <pre className="text-red-400 font-mono mb-6">
              {`
 _______  _______  _______  _______  _______  ___
|       ||       ||       ||       ||       ||   |
|    ___||    ___||    _  ||    _  ||   _   ||   |
|   |___ |   |___ |   |_| ||   |_| ||  | |  ||   |
|    ___||    ___||    ___||    ___||  |_|  ||   |
|   |    |   |___ |   |    |   |    |       ||   |
|___|    |_______||___|    |___|    |_______||___|

              `}
            </pre>
            <h1 className="text-xl text-red-400 font-bold mb-4">Something went wrong</h1>
            <p className="mb-4">An error occurred while trying to load this blog post.</p>

            <div className="bg-gray-900 p-4 rounded-md my-4 border border-red-900">
              <code className="text-red-400">Error: {error.message || "Unknown error"}</code>
              {error.digest && (
                <div className="text-gray-400 mt-2">
                  Digest: {error.digest}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <button
                onClick={() => reset()}
                className="bg-blue-900 text-blue-100 py-2 px-4 rounded hover:bg-blue-800 transition-colors w-fit"
              >
                $ retry
              </button>

              <div className="text-green-400 mt-4">
                <pre className="mb-2">Or try:</pre>
                <div className="pl-4">
                  <p className="mb-2">$ <Link href="/blog" className="text-blue-400 hover:underline">cd /blog</Link></p>
                  <p>$ <Link href="/" className="text-blue-400 hover:underline">cd /home</Link></p>
                </div>
              </div>
            </div>
          </div>
        </Command>
      </TerminalWindow>
    </main>
  );
}