
// Definition of shared types for posture monitoring

export { FeedbackType } from '@/lib/human/types';

export enum SquatState {
  STANDING = 'standing',
  DESCENDING = 'descending',
  BOTTOM = 'bottom',
  ASCENDING = 'ascending'
}

export enum MotionState {
  STANDING = 'standing',
  MID_MOTION = 'mid_motion',
  FULL_MOTION = 'full_motion'
}

export interface MotionStats {
  totalReps: number;
  goodReps: number;
  badReps: number;
  accuracy: number;
  currentStreak: number;
  bestStreak: number;
  lastUpdated?: number;
}

export interface BodyAngles {
  kneeAngle: number | null;
  hipAngle: number | null;
  shoulderAngle: number | null;
  elbowAngle: number | null;
  ankleAngle: number | null;
  neckAngle: number | null;
}

export interface DetectionStatus {
  isDetecting: boolean;
  fps: number;
  confidence: number | null;
  detectedKeypoints?: number;
  lastDetectionTime?: number;
}

export interface FeedbackMessage {
  message: string | null;
  type: import('@/lib/human/types').FeedbackType;
}
