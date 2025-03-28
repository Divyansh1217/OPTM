
import React from 'react';
import { KeypointProps } from './types';

export const KeypointRenderer: React.FC<KeypointProps> = ({ 
  keypoint, 
  scaleX, 
  scaleY, 
  minPartConfidence 
}) => {
  if (keypoint.score <= minPartConfidence) {
    return null;
  }
  
  // Determine color based on keypoint type
  let color = 'aqua';
  if (keypoint.part.includes('Shoulder') || keypoint.part.includes('Hip')) {
    color = 'yellow';
  } else if (keypoint.part.includes('Knee')) {
    color = 'lime';
  } else if (keypoint.part.includes('Ankle')) {
    color = 'orange'; 
  }
  
  return (
    <div style={{ position: 'absolute' }}>
      {/* This is a rendering component that returns null. The actual drawing happens in the main PoseRenderer */}
    </div>
  );
};
