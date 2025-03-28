
import { FeedbackType, SquatState } from './types';

export interface PoseDetectionConfig {
  minPoseConfidence: number;
  minPartConfidence: number;
  inputResolution: {
    width: number;
    height: number;
  };
  scoreThreshold: number;
}

export interface SquatEvaluation {
  isGoodForm: boolean;
  feedback: string;
  feedbackType: FeedbackType;
}

export interface FeedbackResult {
  feedback: string;
  feedbackType: FeedbackType;
}

export interface PostureAnalysis {
  feedback: {
    message: string;
    type: FeedbackType;
  };
  kneeAngle: number | null;
  hipAngle: number | null;
  newSquatState: SquatState;
  repComplete: boolean;
  evaluation: SquatEvaluation | null;
}
