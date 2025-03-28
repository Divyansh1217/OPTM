
import React from 'react';

const HumanBodyOutline: React.FC = () => (
  <div className="h-80 w-full flex justify-center">
    <svg viewBox="0 0 100 200" className="h-full">
      {/* Simple human body outline */}
      <circle cx="50" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="1" /> {/* Head */}
      <line x1="50" y1="40" x2="50" y2="120" stroke="currentColor" strokeWidth="1" /> {/* Torso */}
      <line x1="50" y1="60" x2="20" y2="90" stroke="currentColor" strokeWidth="1" /> {/* Left arm */}
      <line x1="50" y1="60" x2="80" y2="90" stroke="currentColor" strokeWidth="1" /> {/* Right arm */}
      <line x1="50" y1="120" x2="30" y2="180" stroke="currentColor" strokeWidth="1" /> {/* Left leg */}
      <line x1="50" y1="120" x2="70" y2="180" stroke="currentColor" strokeWidth="1" /> {/* Right leg */}
    </svg>
  </div>
);

export default HumanBodyOutline;
