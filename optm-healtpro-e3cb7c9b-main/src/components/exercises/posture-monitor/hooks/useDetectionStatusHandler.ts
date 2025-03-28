
import { useState } from 'react';
import { DetectionStatus } from '../types';

export const useDetectionStatusHandler = () => {
  const [detectionStatus, setDetectionStatus] = useState<DetectionStatus>({
    isDetecting: false,
    fps: null,
    confidence: null,
    detectedKeypoints: 0,
    lastDetectionTime: 0
  });
  
  return {
    detectionStatus,
    setDetectionStatus
  };
};

