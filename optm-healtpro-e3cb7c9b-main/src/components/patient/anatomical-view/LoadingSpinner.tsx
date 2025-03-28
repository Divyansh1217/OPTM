
import React from 'react';
import { Html } from '@react-three/drei';

const LoadingSpinner: React.FC = () => {
  return (
    <Html center className="z-50 visible-content">
      <div className="flex items-center justify-center h-32 w-32 bg-white/90 dark:bg-gray-800/90 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">Loading model</p>
        </div>
      </div>
    </Html>
  );
};

export default LoadingSpinner;
