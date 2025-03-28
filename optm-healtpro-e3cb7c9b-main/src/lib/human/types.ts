
// BodyAngles interface for use in pose detection
export interface BodyAngles {
  kneeAngle: number | null;
  hipAngle: number | null;
  shoulderAngle: number | null;
  elbowAngle: number | null;
  ankleAngle: number | null;
  neckAngle: number | null;
}

// Feedback types
export enum FeedbackType {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

// FeedbackMessage type
export interface FeedbackMessage {
  message: string | null;
  type: FeedbackType;
}

// Motion state for exercise tracking
export enum MotionState {
  STANDING = 'STANDING',
  DESCENDING = 'DESCENDING',
  MID_MOTION = 'MID_MOTION',
  FULL_MOTION = 'FULL_MOTION',
  ASCENDING = 'ASCENDING'
}

// Squat states
export enum SquatState {
  STANDING = 'STANDING',
  DESCENDING = 'DESCENDING',
  BOTTOM = 'BOTTOM',
  ASCENDING = 'ASCENDING'
}

// Detection status for tracking
export interface DetectionStatus {
  isDetecting: boolean;
  fps: number | null;
  confidence: number | null;
  detectedKeypoints?: number;
}

// Stats tracking
export interface MotionStats {
  lastUpdated: number;
  totalReps: number;
  goodReps: number;
  badReps: number;
  accuracy: number;
  currentStreak: number;
  bestStreak: number;
  caloriesBurned: number;
}
