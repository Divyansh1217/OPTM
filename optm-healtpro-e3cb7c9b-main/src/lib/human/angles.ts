
import { BodyAngles } from './types';

// Calculate body angles based on Human.js pose keypoints
export function calculateBodyAngles(pose: any): BodyAngles {
  if (!pose || !pose.keypoints) {
    return {
      kneeAngle: null,
      hipAngle: null,
      shoulderAngle: null,
      elbowAngle: null,
      ankleAngle: null,
      neckAngle: null
    };
  }
  
  // Get keypoints
  const keypoints = pose.keypoints.reduce((acc: any, kp: any) => {
    acc[kp.name] = kp;
    return acc;
  }, {});
  
  // Calculate knee angle
  const kneeAngle = calculateAngle(
    keypoints['right_hip'] || keypoints['left_hip'],
    keypoints['right_knee'] || keypoints['left_knee'],
    keypoints['right_ankle'] || keypoints['left_ankle']
  );
  
  // Calculate hip angle
  const hipAngle = calculateAngle(
    keypoints['right_shoulder'] || keypoints['left_shoulder'],
    keypoints['right_hip'] || keypoints['left_hip'],
    keypoints['right_knee'] || keypoints['left_knee']
  );
  
  // Calculate shoulder angle
  const shoulderAngle = calculateAngle(
    keypoints['right_elbow'] || keypoints['left_elbow'],
    keypoints['right_shoulder'] || keypoints['left_shoulder'],
    keypoints['right_hip'] || keypoints['left_hip']
  );
  
  // Calculate elbow angle
  const elbowAngle = calculateAngle(
    keypoints['right_shoulder'] || keypoints['left_shoulder'],
    keypoints['right_elbow'] || keypoints['left_elbow'],
    keypoints['right_wrist'] || keypoints['left_wrist']
  );
  
  // Calculate ankle angle
  const ankleAngle = calculateAngle(
    keypoints['right_knee'] || keypoints['left_knee'],
    keypoints['right_ankle'] || keypoints['left_ankle'],
    keypoints['right_foot_index'] || keypoints['left_foot_index']
  );
  
  // Calculate neck angle
  const neckAngle = calculateAngle(
    keypoints['nose'],
    keypoints['right_shoulder'] || keypoints['left_shoulder'],
    keypoints['right_hip'] || keypoints['left_hip']
  );
  
  return {
    kneeAngle,
    hipAngle,
    shoulderAngle,
    elbowAngle,
    ankleAngle,
    neckAngle
  };
}

// Helper function to calculate angle between three points
function calculateAngle(a: any, b: any, c: any): number | null {
  if (!a || !b || !c || a.score < 0.5 || b.score < 0.5 || c.score < 0.5) {
    return null;
  }
  
  const ab = { x: b.x - a.x, y: b.y - a.y };
  const bc = { x: c.x - b.x, y: c.y - b.y };
  
  // Calculate dot product
  const dotProduct = ab.x * bc.x + ab.y * bc.y;
  
  // Calculate magnitudes
  const abMagnitude = Math.sqrt(ab.x * ab.x + ab.y * ab.y);
  const bcMagnitude = Math.sqrt(bc.x * bc.x + bc.y * bc.y);
  
  // Calculate angle in radians
  const angleRadians = Math.acos(dotProduct / (abMagnitude * bcMagnitude));
  
  // Convert to degrees
  const angleDegrees = angleRadians * (180 / Math.PI);
  
  return angleDegrees;
}
