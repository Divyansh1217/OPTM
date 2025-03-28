
import { useState, useRef, useEffect, useCallback } from 'react';
import { human } from '@/lib/human/core';
import { SquatState, FeedbackType, DetectionStatus } from '@/lib/human/types';
import { toast } from 'sonner';

export default function usePoseDetection(
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  cameraActive: boolean
) {
  // State for pose detection
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);
  const [pose, setPose] = useState<any | null>(null);
  
  // Angle measurements
  const [kneeAngle, setKneeAngle] = useState<number | null>(null);
  const [hipAngle, setHipAngle] = useState<number | null>(null);
  const [shoulderAngle, setShoulderAngle] = useState<number | null>(null);
  
  // Squat state tracking
  const [currentSquatState, setCurrentSquatState] = useState<SquatState>(SquatState.STANDING);
  
  // Detection status
  const [detectionStatus, setDetectionStatus] = useState<DetectionStatus>({
    isDetecting: false,
    fps: null,
    confidence: null
  });
  
  // Animation frame reference
  const requestRef = useRef<number | null>(null);
  
  // Performance metrics
  const fpsCounter = useRef(0);
  const lastFpsUpdate = useRef(Date.now());
  
  // Load model on component mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsModelLoading(true);
        setModelError(null);
        
        await human.load();
        
        setModelLoaded(true);
        setIsModelLoading(false);
        
        console.log("Human.js model loaded successfully");
      } catch (error) {
        console.error('Error loading pose detection model:', error);
        setModelError('Failed to load pose detection model');
        setIsModelLoading(false);
      }
    };
    
    loadModel();
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  // Process frame with pose detection
  const processFrame = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !modelLoaded || !videoRef.current.readyState) {
      requestRef.current = requestAnimationFrame(processFrame);
      return;
    }
    
    try {
      // Run pose detection
      const result = await human.detect(videoRef.current);
      
      // Update FPS counter
      fpsCounter.current++;
      const now = Date.now();
      if (now - lastFpsUpdate.current > 1000) {
        setDetectionStatus(prev => ({
          ...prev,
          fps: fpsCounter.current
        }));
        fpsCounter.current = 0;
        lastFpsUpdate.current = now;
      }
      
      // Check if we have body detection
      if (result.body && result.body.length > 0) {
        setPose(result.body[0]);
        
        // Update detection confidence
        setDetectionStatus(prev => ({
          ...prev,
          confidence: result.body[0].score || null
        }));
        
        // Extract angles from detection results
        // These would typically come from a utility function
        // For now we're using placeholder values that will be updated later
        if (result.body[0].keypoints) {
          const knees = result.body[0].keypoints.filter(kp => kp.name.includes('knee'));
          const hips = result.body[0].keypoints.filter(kp => kp.name.includes('hip'));
          
          if (knees.length > 0 && knees[0].score > 0.5) {
            setKneeAngle(calculateAngle(result.body[0], 'knee') || 170);
          }
          
          if (hips.length > 0 && hips[0].score > 0.5) {
            setHipAngle(calculateAngle(result.body[0], 'hip') || 160);
          }
        }
        
        // Determine squat state based on knee angle
        if (kneeAngle !== null) {
          if (kneeAngle > 160) {
            setCurrentSquatState(SquatState.STANDING);
          } else if (kneeAngle < 100) {
            setCurrentSquatState(SquatState.BOTTOM);
          } else if (currentSquatState === SquatState.STANDING) {
            setCurrentSquatState(SquatState.DESCENDING);
          } else if (currentSquatState === SquatState.BOTTOM) {
            setCurrentSquatState(SquatState.ASCENDING);
          }
        }
      }
    } catch (error) {
      console.error('Error in pose detection:', error);
    }
    
    // Continue the detection loop
    requestRef.current = requestAnimationFrame(processFrame);
  }, [videoRef, canvasRef, modelLoaded, currentSquatState, kneeAngle]);
  
  // Simple placeholder function to calculate angles
  const calculateAngle = (pose: any, jointType: string): number | null => {
    // This is a very simplified placeholder
    // A real implementation would use the keypoints to calculate actual angles
    if (!pose || !pose.keypoints) return null;
    
    // Return placeholder values for now
    if (jointType === 'knee') return 160;
    if (jointType === 'hip') return 170;
    if (jointType === 'shoulder') return 180;
    
    return null;
  };
  
  // Start detection
  const startDetection = useCallback(() => {
    if (!cameraActive || !modelLoaded) {
      if (!modelLoaded) {
        toast.error("AI model is not loaded yet");
      } else if (!cameraActive) {
        toast.error("Camera is not active");
      }
      return;
    }
    
    setDetectionStatus(prev => ({
      ...prev,
      isDetecting: true
    }));
    
    requestRef.current = requestAnimationFrame(processFrame);
    toast.success("Pose detection started");
  }, [cameraActive, modelLoaded, processFrame]);
  
  // Stop detection
  const stopDetection = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
    
    setDetectionStatus(prev => ({
      ...prev,
      isDetecting: false
    }));
    
    toast.info("Pose detection stopped");
  }, []);
  
  // Reset detection
  const resetDetection = useCallback(() => {
    stopDetection();
    setKneeAngle(null);
    setHipAngle(null);
    setShoulderAngle(null);
    setCurrentSquatState(SquatState.STANDING);
  }, [stopDetection]);
  
  // Add resetSession alias for resetDetection to match API
  const resetSession = resetDetection;
  
  return {
    isModelLoading,
    modelError,
    pose,
    kneeAngle,
    hipAngle,
    shoulderAngle,
    currentSquatState,
    detectionStatus,
    startDetection,
    stopDetection,
    resetDetection,
    resetSession
  };
}
