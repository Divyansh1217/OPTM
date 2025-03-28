
import React from 'react';
import { Link } from 'react-router-dom';
import StandaloneMotionTracker from '@/components/exercises/motion-tracking/StandaloneMotionTracker';

export default function MotionAnalysisPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Motion Analysis</h1>
        <Link 
          to="/login" 
          className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          Back to Login
        </Link>
      </div>
      
      <div className="motion-analysis-container">
        <StandaloneMotionTracker />
      </div>
    </div>
  );
}
