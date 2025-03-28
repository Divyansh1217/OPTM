
import { useRef, useState } from 'react';
import { useHumanDetection as useBaseHumanDetection } from './hooks/useHumanDetection';
import { BodyAngles, FeedbackType, MotionState } from '@/lib/human/types';
import { getPostureFeedback, estimateCaloriesBurned } from './utils/detectionUtils';

// Higher-level hook that wraps the base useHumanDetection
const useHumanDetection = (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  // Track session metrics
  const [sessionStartTime] = useState(Date.now());
  const [repCount, setRepCount] = useState({ total: 0, good: 0, bad: 0 });
  const prevKneeAngle = useRef<number | null>(null);
  const isInSquat = useRef(false);
  const [motionState, setMotionState] = useState<MotionState>(MotionState.STANDING);

  // Use the base detection hook
  const detection = useBaseHumanDetection({
    videoRef,
    canvasRef,
    isActive: true,
    onAngleUpdate: (angles: BodyAngles) => {
      handleAngleUpdate(angles);
    }
  });

  // Process angle updates to count reps and provide feedback
  const handleAngleUpdate = (angles: BodyAngles) => {
    const { kneeAngle } = angles;
    
    // Simple squat detection logic
    if (kneeAngle !== null && prevKneeAngle.current !== null) {
      // Going down into squat
      if (kneeAngle < 120 && prevKneeAngle.current >= 120 && !isInSquat.current) {
        setMotionState(MotionState.DESCENDING);
        isInSquat.current = true;
      }
      // In full squat
      else if (kneeAngle < 100 && isInSquat.current) {
        setMotionState(MotionState.FULL_MOTION);
      }
      // Coming up from squat
      else if (kneeAngle > 120 && prevKneeAngle.current <= 120 && isInSquat.current) {
        isInSquat.current = false;
        setMotionState(MotionState.STANDING);
        
        // Count the rep
        const isGoodForm = Math.random() > 0.3; // Simulate good/bad form detection
        setRepCount(prev => ({
          total: prev.total + 1,
          good: isGoodForm ? prev.good + 1 : prev.good,
          bad: isGoodForm ? prev.bad : prev.bad + 1
        }));
      }
    }
    
    prevKneeAngle.current = kneeAngle;
  };

  // Calculate session stats
  const sessionDuration = Date.now() - sessionStartTime;
  const caloriesBurned = estimateCaloriesBurned(sessionDuration / 1000, repCount.total * 0.1);
  
  const stats = {
    totalReps: repCount.total,
    goodReps: repCount.good,
    badReps: repCount.bad,
    caloriesBurned
  };

  // Reset the session
  const resetSession = () => {
    setRepCount({ total: 0, good: 0, bad: 0 });
    isInSquat.current = false;
    setMotionState(MotionState.STANDING);
    detection.resetDetection();
  };

  return {
    ...detection,
    stats,
    resetSession,
    isDetecting: detection.detectionStatus.isDetecting,
    isModelLoaded: !detection.isModelLoading,
    detectionFps: detection.detectionStatus.fps,
    result: detection.result,
    detectionError: null
  };
};

export default useHumanDetection;
