
import React from 'react';
import { SkeletonProps } from './types';

export const SkeletonRenderer: React.FC<SkeletonProps> = ({
  pose,
  scaleX,
  scaleY,
  minPartConfidence
}) => {
  // This component doesn't directly render DOM elements but is used to organize the drawing logic
  return null;
};

// Define connections for drawing skeleton
export const adjacentKeyPoints = [
  ['nose', 'leftEye'], ['leftEye', 'leftEar'], ['nose', 'rightEye'],
  ['rightEye', 'rightEar'], ['nose', 'leftShoulder'],
  ['leftShoulder', 'leftElbow'], ['leftElbow', 'leftWrist'],
  ['leftShoulder', 'leftHip'], ['leftHip', 'leftKnee'],
  ['leftKnee', 'leftAnkle'], ['nose', 'rightShoulder'],
  ['rightShoulder', 'rightElbow'], ['rightElbow', 'rightWrist'],
  ['rightShoulder', 'rightHip'], ['rightHip', 'rightKnee'],
  ['rightKnee', 'rightAnkle'],
  // Connect shoulders and hips to form torso
  ['leftShoulder', 'rightShoulder'],
  ['leftHip', 'rightHip']
];
