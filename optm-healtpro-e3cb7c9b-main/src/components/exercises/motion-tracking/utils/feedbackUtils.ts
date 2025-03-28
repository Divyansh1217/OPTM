
// Import the shared FeedbackType to ensure consistency
import { FeedbackType as SharedFeedbackType } from '@/lib/human/types';

// Export FeedbackType using the same values as the shared type
export enum FeedbackType {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

// Map between different feedback types
export const mapFeedbackType = (type: SharedFeedbackType): FeedbackType => {
  switch (type) {
    case SharedFeedbackType.INFO:
      return FeedbackType.INFO;
    case SharedFeedbackType.SUCCESS:
      return FeedbackType.SUCCESS;
    case SharedFeedbackType.WARNING:
      return FeedbackType.WARNING;
    case SharedFeedbackType.ERROR:
      return FeedbackType.ERROR;
    default:
      return FeedbackType.INFO;
  }
};

// Create feedback messages
export const createFeedback = (message: string, type: FeedbackType) => {
  return {
    message,
    type
  };
};

// Feedback for motion states
export const getMotionFeedback = (
  isGoodForm: boolean,
  formFeedback: string,
  isFirstRep: boolean
) => {
  if (isGoodForm) {
    return createFeedback(
      isFirstRep 
        ? "Great start! Maintain this form for your next rep." 
        : "Excellent form! Keep going with this technique.",
      FeedbackType.SUCCESS
    );
  } else {
    return createFeedback(formFeedback, FeedbackType.WARNING);
  }
};

// Detection status feedback
export const getDetectionFeedback = (isDetecting: boolean, confidence: number | null) => {
  if (!isDetecting) {
    return createFeedback(
      "Motion detection is paused. Resume to continue tracking.", 
      FeedbackType.INFO
    );
  }
  
  if (confidence === null) {
    return createFeedback(
      "No body detected. Position yourself in the camera view.", 
      FeedbackType.WARNING
    );
  }
  
  if (confidence < 0.5) {
    return createFeedback(
      "Detection confidence is low. Try adjusting your position or lighting.", 
      FeedbackType.WARNING
    );
  }
  
  return createFeedback(
    "Motion detection active. Perform your exercise.", 
    FeedbackType.INFO
  );
};
