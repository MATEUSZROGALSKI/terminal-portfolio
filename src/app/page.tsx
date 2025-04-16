'use client';

import React from 'react';
import Command from '@/components/common/Command';
import AboutMe from '@/components/landing/AboutMe';
import Timeline from '@/components/landing/Timeline';
import Apps from '@/components/landing/Apps';

export default function Home() {
  return (<>
        <Command command="neofetch">
          <AboutMe />
        </Command>

        <Command command="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit">
          <Timeline />
        </Command>

        <Command command="htop -p projects">
          <Apps />
        </Command>
      </>);
}