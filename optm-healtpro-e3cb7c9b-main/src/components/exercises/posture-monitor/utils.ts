
import { SquatState } from './types';

// Determine the squat state based on knee angle and current state
export const determineSquatState = (kneeAngle: number, currentState: SquatState): SquatState => {
  // Standing to descending transition
  if (currentState === SquatState.STANDING && kneeAngle < 160) {
    return SquatState.DESCENDING;
  }
  
  // Descending to bottom transition
  if (currentState === SquatState.DESCENDING && kneeAngle < 100) {
    return SquatState.BOTTOM;
  }
  
  // Bottom to ascending transition
  if (currentState === SquatState.BOTTOM && kneeAngle > 110) {
    return SquatState.ASCENDING;
  }
  
  // Ascending to standing transition
  if (currentState === SquatState.ASCENDING && kneeAngle > 160) {
    return SquatState.STANDING;
  }
  
  // Default: return current state if no transition criteria met
  return currentState;
};

// Evaluate squat quality
export const evaluateSquatQuality = (kneeAngle: number, hipAngle: number | null = null): { isGood: boolean; message: string } => {
  if (kneeAngle > 130) {
    return { isGood: false, message: "Try to squat deeper for better results" };
  }
  
  if (hipAngle !== null && hipAngle < 90) {
    return { isGood: false, message: "Keep your back straighter during the squat" };
  }
  
  return { isGood: true, message: "Great form! Keep it up." };
};
