
import { FeedbackType } from '@/lib/human/types';

export interface CustomFeedback {
  message: string | null;
  type: FeedbackType;
}

export interface DetectionStatus {
  isDetecting: boolean;
  fps: number | null;
  confidence: number | null;
  detectedKeypoints?: number;
  lastDetectionTime?: number;
}
