
import * as Human from '@vladmandic/human';
import { BodyAngles } from './types';

/**
 * Extracts biomarkers from Human.js detection result and angles
 */
export const extractBiomarkers = (
  result: Human.Result,
  angles: BodyAngles
): Record<string, number | null> => {
  // Default biomarkers with null values
  const biomarkers: Record<string, number | null> = {
    postureScore: null,
    movementQuality: null,
    rangeOfMotion: null,
    stabilityScore: null,
    symmetry: null,
    balance: null
  };
  
  // Check if we have valid detection data
  if (!result?.body || result.body.length === 0) {
    return biomarkers;
  }
  
  // Get body detection
  const body = result.body[0];
  const keypoints = body.keypoints;
  
  // Calculate posture score based on alignment
  if (angles.shoulderAngle !== null && angles.hipAngle !== null) {
    // Ideal posture has shoulder and hip aligned vertically
    const shoulderHipAlignment = Math.abs(180 - (angles.shoulderAngle || 180));
    
    // Convert to a 0-100 score where 100 is perfect
    biomarkers.postureScore = Math.max(0, 100 - shoulderHipAlignment * 2);
  }
  
  // Calculate range of motion based on knee angle
  if (angles.kneeAngle !== null) {
    // For squats, lower knee angle means better range of motion
    // 90 degrees is considered excellent (100 score)
    const idealKneeAngle = 90;
    const kneeAngleDiff = Math.abs(angles.kneeAngle - idealKneeAngle);
    
    // Convert to 0-100 score
    biomarkers.rangeOfMotion = Math.max(0, 100 - kneeAngleDiff * 1.5);
  }
  
  // Calculate stability score based on keypoint movement variance
  if (keypoints && keypoints.length > 0) {
    // For this example, we'll use a simplified approach
    // In a real implementation, we'd track keypoint positions over time
    const confidenceScores = keypoints.map(kp => kp.score || 0);
    const avgConfidence = confidenceScores.reduce((a, b) => a + b, 0) / confidenceScores.length;
    
    // Use detection confidence as a proxy for stability
    biomarkers.stabilityScore = Math.min(100, avgConfidence * 100);
  }
  
  // Calculate overall movement quality as a combination of other metrics
  if (
    biomarkers.postureScore !== null &&
    biomarkers.rangeOfMotion !== null &&
    biomarkers.stabilityScore !== null
  ) {
    // Weight the components as needed
    const weights = {
      posture: 0.4,
      range: 0.3,
      stability: 0.3
    };
    
    biomarkers.movementQuality =
      (biomarkers.postureScore * weights.posture) +
      (biomarkers.rangeOfMotion * weights.range) +
      (biomarkers.stabilityScore * weights.stability);
  }
  
  return biomarkers;
};
