'use client';

import React, { Suspense } from 'react';
import { TerminalWindow } from '@/components/common/TerminalWindow';
import Command from '@/components/common/Command';
import Banner from '@/components/common/Banner';
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('@/components/contact/ContactForm'), {
  ssr: false,
  loading: () => <div className="command-output">Loading contact form...</div>
});

export default function Contact() {
  return (<>
        <Command command="telnet mrogal.ski 25">
          <Suspense fallback={<div className="command-output">Connecting to SMTP server...</div>}>
            <ContactForm />
          </Suspense>
        </Command>
    </>);
}