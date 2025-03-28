import { useState, useRef, useEffect, useCallback } from 'react';
import { human } from '@/lib/human/core';
import { BodyAngles, FeedbackType, DetectionStatus } from '@/lib/human/types';
import { calculateBodyAngles } from '@/lib/human/angles';

export interface UseHumanDetectionProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isActive: boolean;
  onAngleUpdate?: (angles: BodyAngles) => void;
  onPoseDetected?: (pose: any) => void;
}

export interface HumanDetectionResult {
  isModelLoading: boolean;
  pose: any | null;
  angles: BodyAngles;
  detectionStatus: DetectionStatus;
  feedback: {
    message: string | null;
    type: FeedbackType;
  };
  startDetection: () => void;
  stopDetection: () => void;
  resetDetection: () => void;
  isDetecting: boolean;
  isModelLoaded: boolean;
  detectionFps: number | null;
  resetSession: () => void;
  stats: {
    totalReps: number;
    goodReps: number;
    badReps: number;
    caloriesBurned: number | null;
  };
  result: any | null;
  detectionError: string | null;
}

export function useHumanDetection({
  videoRef,
  canvasRef,
  isActive,
  onAngleUpdate,
  onPoseDetected
}: UseHumanDetectionProps): HumanDetectionResult {
  // State for pose detection
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);
  const [pose, setPose] = useState<any | null>(null);
  const [result, setResult] = useState<any | null>(null);
  
  // Stats tracking
  const [stats, setStats] = useState({
    totalReps: 0,
    goodReps: 0,
    badReps: 0,
    caloriesBurned: 0
  });
  
  // Angles state
  const [angles, setAngles] = useState<BodyAngles>({
    kneeAngle: null,
    hipAngle: null,
    shoulderAngle: null,
    elbowAngle: null,
    ankleAngle: null,
    neckAngle: null
  });
  
  // Detection status
  const [detectionStatus, setDetectionStatus] = useState<DetectionStatus>({
    isDetecting: false,
    fps: null,
    confidence: null
  });
  
  // Feedback state
  const [feedback, setFeedback] = useState({
    message: null as string | null,
    type: FeedbackType.INFO
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
        setFeedback({
          message: "AI model loaded successfully",
          type: FeedbackType.SUCCESS
        });
      } catch (error) {
        console.error('Error loading pose detection model:', error);
        setModelError('Failed to load pose detection model');
        setIsModelLoading(false);
        setFeedback({
          message: "Error loading AI model. Please refresh and try again.",
          type: FeedbackType.ERROR
        });
      }
    };
    
    loadModel();
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      // Attempt to clean up Human.js resources
      human.reset();
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
      const detectionResult = await human.detect(videoRef.current);
      setResult(detectionResult);
      
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
      if (detectionResult.body && detectionResult.body.length > 0) {
        const detectedPose = detectionResult.body[0];
        setPose(detectedPose);
        
        if (onPoseDetected) {
          onPoseDetected(detectedPose);
        }
        
        // Update detection confidence
        setDetectionStatus(prev => ({
          ...prev,
          confidence: detectedPose.score || null,
          detectedKeypoints: detectedPose.keypoints?.length || 0
        }));
        
        // Calculate angles from detection
        const calculatedAngles = calculateBodyAngles(detectedPose);
        setAngles(calculatedAngles);
        
        if (onAngleUpdate) {
          onAngleUpdate(calculatedAngles);
        }
      } else {
        // No body detected
        if (detectionStatus.confidence !== null) {
          setDetectionStatus(prev => ({
            ...prev,
            confidence: null
          }));
        }
      }
      
      // Draw pose keypoints on canvas
      await human.draw.all(canvasRef.current, detectionResult);
      
    } catch (error) {
      console.error('Error in pose detection:', error);
      setFeedback({
        message: "Detection error occurred. Please retry.",
        type: FeedbackType.ERROR
      });
    }
    
    // Continue the detection loop
    requestRef.current = requestAnimationFrame(processFrame);
  }, [videoRef, canvasRef, modelLoaded, detectionStatus.confidence, onAngleUpdate, onPoseDetected]);
  
  // Start detection
  const startDetection = useCallback(() => {
    if (!isActive || !modelLoaded) {
      if (!modelLoaded) {
        setFeedback({
          message: "AI model is not loaded yet. Please wait.",
          type: FeedbackType.WARNING
        });
      } else if (!isActive) {
        setFeedback({
          message: "Camera is not active. Please start camera first.",
          type: FeedbackType.WARNING
        });
      }
      return;
    }
    
    setDetectionStatus(prev => ({
      ...prev,
      isDetecting: true
    }));
    
    setFeedback({
      message: "Motion detection active. Position yourself in frame.",
      type: FeedbackType.INFO
    });
    
    requestRef.current = requestAnimationFrame(processFrame);
  }, [isActive, modelLoaded, processFrame]);
  
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
    
    setFeedback({
      message: "Motion detection paused",
      type: FeedbackType.INFO
    });
  }, []);
  
  // Reset detection
  const resetDetection = useCallback(() => {
    stopDetection();
    setPose(null);
    setAngles({
      kneeAngle: null,
      hipAngle: null,
      shoulderAngle: null,
      elbowAngle: null,
      ankleAngle: null,
      neckAngle: null
    });
    
    setFeedback({
      message: "Motion detection reset. Ready to start.",
      type: FeedbackType.INFO
    });
  }, [stopDetection]);
  
  // Reset session (stats and counters)
  const resetSession = useCallback(() => {
    resetDetection();
    setStats({
      totalReps: 0,
      goodReps: 0,
      badReps: 0,
      caloriesBurned: 0
    });
    
    setFeedback({
      message: "Session reset. Ready to start new session.",
      type: FeedbackType.INFO
    });
  }, [resetDetection]);
  
  // Auto-start/stop based on isActive
  useEffect(() => {
    if (isActive && modelLoaded && !detectionStatus.isDetecting) {
      startDetection();
    } else if (!isActive && detectionStatus.isDetecting) {
      stopDetection();
    }
  }, [isActive, modelLoaded, detectionStatus.isDetecting, startDetection, stopDetection]);
  
  return {
    isModelLoading,
    pose,
    angles,
    detectionStatus,
    feedback,
    startDetection,
    stopDetection,
    resetDetection,
    isDetecting: detectionStatus.isDetecting,
    isModelLoaded: modelLoaded,
    detectionFps: detectionStatus.fps,
    resetSession,
    stats,
    result,
    detectionError: modelError
  };
}
