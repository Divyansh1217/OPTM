
import { MotionState } from '@/lib/human/types';

// Determine the current motion state based on knee angle
export const determineMotionState = (kneeAngle: number | null): MotionState => {
  if (kneeAngle === null) {
    return MotionState.STANDING;
  }
  
  if (kneeAngle > 160) {
    return MotionState.STANDING;
  } else if (kneeAngle < 100) {
    return MotionState.FULL_MOTION;
  } else {
    return MotionState.MID_MOTION;
  }
};

// Check if a repetition has been completed
export const isRepCompleted = (newState: MotionState, prevState: MotionState): boolean => {
  return prevState === MotionState.FULL_MOTION && newState === MotionState.STANDING;
};

// Check if motion is in progress
export const isMotionInProgress = (state: MotionState): boolean => {
  return state === MotionState.MID_MOTION || state === MotionState.FULL_MOTION;
};
