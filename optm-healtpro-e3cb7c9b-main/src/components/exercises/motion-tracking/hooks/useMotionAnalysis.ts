
import { useState, useRef, useEffect } from 'react';
import { BodyAngles, MotionState, FeedbackType } from '@/lib/human/types';

export const useMotionAnalysis = (
  motionState: MotionState,
  onGoodRep?: () => void,
  onBadRep?: () => void
) => {
  const [lastAngles, setLastAngles] = useState<BodyAngles>({
    kneeAngle: null,
    hipAngle: null,
    shoulderAngle: null,
    elbowAngle: null,
    ankleAngle: null,
    neckAngle: null
  });
  
  const [feedback, setFeedback] = useState<{
    message: string | null;
    type: FeedbackType;
  }>({
    message: null,
    type: FeedbackType.INFO
  });
  
  const repInProgress = useRef(false);
  const repQuality = useRef<'good' | 'bad' | null>(null);
  
  // Process angle updates to analyze exercise form
  const processAngles = (angles: BodyAngles) => {
    setLastAngles(angles);
    
    // Simple analysis based on knee and hip angles
    if (angles.kneeAngle !== null && angles.hipAngle !== null) {
      // Check for bad form
      if (angles.kneeAngle < 80 && angles.hipAngle < 120) {
        setFeedback({
          message: "Be careful not to bend your knees too much",
          type: FeedbackType.WARNING
        });
        repQuality.current = 'bad';
      }
      // Check for good form
      else if (angles.kneeAngle > 100 && angles.hipAngle > 140) {
        setFeedback({
          message: "Good form, keep it up!",
          type: FeedbackType.SUCCESS
        });
        repQuality.current = 'good';
      }
    }
  };
  
  // Watch for state changes to track rep completion
  useEffect(() => {
    if (motionState === MotionState.FULL_MOTION && !repInProgress.current) {
      repInProgress.current = true;
      repQuality.current = null;
      setFeedback({
        message: "Hold at the bottom of the movement",
        type: FeedbackType.INFO
      });
    } 
    else if (motionState === MotionState.STANDING && repInProgress.current) {
      // Rep completed
      repInProgress.current = false;
      
      if (repQuality.current === 'good') {
        if (onGoodRep) onGoodRep();
        setFeedback({
          message: "Great rep! Keep going.",
          type: FeedbackType.SUCCESS
        });
      } 
      else if (repQuality.current === 'bad') {
        if (onBadRep) onBadRep();
        setFeedback({
          message: "Try to maintain better form on the next rep",
          type: FeedbackType.WARNING
        });
      }
      
      // Reset for next rep
      repQuality.current = null;
    }
  }, [motionState, onGoodRep, onBadRep]);
  
  return {
    feedback,
    lastAngles,
    processAngles
  };
};
