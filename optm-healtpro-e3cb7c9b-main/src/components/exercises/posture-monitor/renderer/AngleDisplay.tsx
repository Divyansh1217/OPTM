
import React from 'react';
import { AngleDisplayProps } from './types';

export const AngleDisplay: React.FC<AngleDisplayProps> = ({
  pose,
  angle,
  label,
  keypoint,
  scaleX,
  scaleY,
  minPartConfidence,
  offsetX = 10,
  offsetY = 0
}) => {
  if (angle === null) return null;
  
  const kp = pose.keypoints.find(kp => kp.part === keypoint);
  if (!kp || kp.score <= minPartConfidence) return null;
  
  // This component is used to organize the drawing logic for angle displays
  return null;
};
