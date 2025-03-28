
import { useState, useRef } from 'react';
import { MotionState } from '@/lib/human/types';

export const useDetectionState = () => {
  const [motionState, setMotionState] = useState<MotionState>(MotionState.STANDING);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionConfidence, setDetectionConfidence] = useState<number | null>(null);
  const lastProcessTime = useRef<number>(0);

  const updateMotionState = (newState: MotionState) => {
    setMotionState(newState);
  };

  const startDetection = () => {
    setIsDetecting(true);
  };

  const stopDetection = () => {
    setIsDetecting(false);
  };

  const updateConfidence = (confidence: number | null) => {
    setDetectionConfidence(confidence);
  };

  return {
    motionState,
    isDetecting,
    detectionConfidence,
    lastProcessTime,
    updateMotionState,
    startDetection,
    stopDetection,
    updateConfidence
  };
};
