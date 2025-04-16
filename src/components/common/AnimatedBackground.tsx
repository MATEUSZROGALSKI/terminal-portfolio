'use client';

import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="animated-background">
      <div className="gradient-orb purple-orb"></div>
      <div className="gradient-orb orange-orb"></div>
      <div className="gradient-orb blue-orb"></div>
      <div className="gradient-overlay"></div>
    </div>
  );
};

export default AnimatedBackground;
