
import { human } from '@/lib/human/core';
import { BodyAngles, FeedbackType } from '@/lib/human/types';
import { calculateBodyAngles } from '@/lib/human/angles';
import { DetectionResult } from '../hooks/types';

// Helper function to map feedback type
export const mapFeedbackType = (type: FeedbackType): FeedbackType => {
  return type;
};

// Helper to check if detection is confident
export const isDetectionConfident = (confidence: number | null): boolean => {
  if (confidence === null) return false;
  return confidence > 0.5; // 50% confidence threshold
};

// Extract body angles from pose data
export const getBodyAngles = (pose: any): BodyAngles => {
  if (!pose) {
    return {
      kneeAngle: null,
      hipAngle: null,
      shoulderAngle: null,
      elbowAngle: null,
      ankleAngle: null,
      neckAngle: null
    };
  }
  
  return calculateBodyAngles(pose);
};

// Simple function to estimate calories burned based on exercise duration and intensity
export const estimateCaloriesBurned = (exerciseDuration: number, intensity: number): number => {
  // Average MET (Metabolic Equivalent of Task) for moderate exercise is about 5
  const MET = 3 + (intensity * 4); // Scale intensity from 0-1 to 3-7 MET
  const weight = 70; // Default weight in kg
  
  // Formula: MET * weight * time in hours
  return (MET * weight * (exerciseDuration / 3600)).toFixed(1) as unknown as number;
};

// Function to get feedback based on body alignment
export const getPostureFeedback = (angles: BodyAngles): { message: string, type: FeedbackType } => {
  // Default feedback
  let feedback = {
    message: "Maintain good posture during exercise",
    type: FeedbackType.INFO
  };
  
  // Check for knee issues (if knee angle exists)
  if (angles.kneeAngle !== null) {
    if (angles.kneeAngle < 90) {
      feedback = {
        message: "Be careful not to bend your knees too much",
        type: FeedbackType.WARNING
      };
    }
  }
  
  // Check for hip alignment
  if (angles.hipAngle !== null && angles.hipAngle < 140) {
    feedback = {
      message: "Try to keep your back straighter",
      type: FeedbackType.WARNING
    };
  }
  
  return feedback;
};

// Implement the performDetection function
export const performDetection = async (
  videoElement: HTMLVideoElement | null
): Promise<DetectionResult> => {
  if (!videoElement) {
    return { 
      result: null, 
      error: "Missing video element",
      angles: {
        kneeAngle: null,
        hipAngle: null,
        shoulderAngle: null,
        elbowAngle: null,
        ankleAngle: null,
        neckAngle: null
      },
      biomarkers: {},
      newMotionState: null
    };
  }

  try {
    const result = await human.detect(videoElement);
    const angles = result?.body?.[0] ? getBodyAngles(result.body[0]) : {
      kneeAngle: null,
      hipAngle: null,
      shoulderAngle: null,
      elbowAngle: null,
      ankleAngle: null,
      neckAngle: null
    };
    
    return { 
      result, 
      error: null,
      angles,
      biomarkers: {},
      newMotionState: null
    };
  } catch (error) {
    console.error("Detection error:", error);
    return { 
      result: null, 
      error: error instanceof Error ? error.message : "Unknown detection error",
      angles: {
        kneeAngle: null,
        hipAngle: null,
        shoulderAngle: null,
        elbowAngle: null,
        ankleAngle: null,
        neckAngle: null
      },
      biomarkers: {},
      newMotionState: null
    };
  }
};
