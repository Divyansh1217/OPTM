
import { useCallback, useRef, useState, useEffect } from 'react';
import { toast } from 'sonner';
import * as Human from '@vladmandic/human';
import { human } from '@/lib/human';
import { warmupModel, resetModel } from '@/lib/human';
import { DetectionResult, DetectionState } from './types';
import { performDetection } from '../utils/detectionUtils';

export const useDetectionService = (videoRef: React.RefObject<HTMLVideoElement>) => {
  // Detection state
  const [detectionState, setDetectionState] = useState<DetectionState>({
    isDetecting: false,
    detectionFps: null,
    isModelLoaded: false,
    detectionError: null,
  });

  // Detection loop references
  const requestRef = useRef<number>();
  const lastFrameTime = useRef<number>(0);
  const frameCount = useRef<number>(0);
  const lastFpsUpdateTime = useRef<number>(0);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCount = useRef<number>(0);
  const maxRetries = 3;
  
  // Performance monitoring
  const memoryUsageRef = useRef<number[]>([]);
  const memoryCheckInterval = useRef<NodeJS.Timeout | null>(null);

  // Cleanup function
  useEffect(() => {
    // Monitor memory usage in development
    if (process.env.NODE_ENV === 'development') {
      memoryCheckInterval.current = setInterval(() => {
        if ((window as any).tf && (window as any).tf.memory) {
          try {
            const mem = (window as any).tf.memory();
            memoryUsageRef.current.push(mem.numBytes);
            // Keep only last 10 readings
            if (memoryUsageRef.current.length > 10) {
              memoryUsageRef.current.shift();
            }
            
            // Check for memory leak - if usage keeps increasing significantly
            if (memoryUsageRef.current.length >= 5) {
              const first = memoryUsageRef.current[0];
              const last = memoryUsageRef.current[memoryUsageRef.current.length - 1];
              const increase = (last - first) / first;
              
              if (increase > 0.5) { // 50% increase
                console.warn('Potential memory leak detected. Memory usage increasing rapidly.');
                // Force cleanup
                if ((window as any).tf && (window as any).tf.engine) {
                  (window as any).tf.engine().disposeVariables();
                  memoryUsageRef.current = [];
                }
              }
            }
          } catch (e) {
            console.error('Error monitoring memory:', e);
          }
        }
      }, 5000);
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      if (memoryCheckInterval.current) {
        clearInterval(memoryCheckInterval.current);
      }
    };
  }, []);

  // Tensor memory cleanup
  const cleanupTensorMemory = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).tf && (window as any).tf.engine) {
      try {
        console.log('Cleaning up tensor memory...');
        (window as any).tf.engine().disposeVariables();
        return true;
      } catch (e) {
        console.error('Error cleaning up tensor memory:', e);
        return false;
      }
    }
    return false;
  }, []);

  // Ensure model is loaded with better error handling and retry logic
  const loadModel = useCallback(async () => {
    if (detectionState.isModelLoaded) {
      return true;
    }
    
    // Cancel any existing loading timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    
    try {
      setDetectionState(prev => ({ 
        ...prev, 
        detectionError: null,
        isModelLoading: true
      }));
      
      // Clean up any existing tensors before loading
      cleanupTensorMemory();
      
      // Set a timeout to prevent UI from hanging
      const loadingPromise = warmupModel();
      
      loadingTimeoutRef.current = setTimeout(() => {
        if (!detectionState.isModelLoaded) {
          console.warn('Model loading is taking longer than expected');
          toast.warning('Model loading is taking longer than expected. Please wait...');
        }
      }, 5000);
      
      await loadingPromise;
      
      // Clear the timeout since loading succeeded
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
      
      setDetectionState(prev => ({ 
        ...prev, 
        isModelLoaded: true,
        isModelLoading: false,
        detectionError: null
      }));
      
      toast.success('Motion detection model loaded successfully');
      retryCount.current = 0;
      return true;
    } catch (error) {
      console.error('Error loading Human.js model:', error);
      
      // Clear the timeout since loading failed
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
      
      // Implement retry logic
      if (retryCount.current < maxRetries) {
        retryCount.current += 1;
        toast.error(`Failed to load model. Retrying (${retryCount.current}/${maxRetries})...`);
        
        // Reset the model before retrying
        await resetModel();
        
        setDetectionState(prev => ({ 
          ...prev, 
          isModelLoading: false,
          detectionError: `Loading, retry ${retryCount.current}/${maxRetries}` 
        }));
        
        // Retry after a short delay
        setTimeout(() => loadModel(), 1500);
        return false;
      }
      
      setDetectionState(prev => ({ 
        ...prev, 
        isModelLoading: false,
        detectionError: 'Failed to load motion detection model' 
      }));
      
      toast.error('Failed to load motion detection model. Please try refreshing the page.');
      return false;
    }
  }, [detectionState.isModelLoaded, cleanupTensorMemory]);

  // Perform detection on a single frame with improved error handling
  const detectFrame = useCallback(async (
    time: number,
    onDetectionResult: (result: DetectionResult) => void
  ) => {
    if (!videoRef.current || !detectionState.isModelLoaded) {
      requestRef.current = requestAnimationFrame(
        (newTime) => detectFrame(newTime, onDetectionResult)
      );
      return;
    }
    
    // Calculate FPS
    const elapsed = time - lastFrameTime.current;
    
    // Limit detection rate for performance (aim for ~20-30 FPS)
    if (elapsed < 33) { // ~30 FPS
      requestRef.current = requestAnimationFrame(
        (newTime) => detectFrame(newTime, onDetectionResult)
      );
      return;
    }
    
    lastFrameTime.current = time;
    frameCount.current++;
    
    // Update FPS counter every second
    if (time - lastFpsUpdateTime.current >= 1000) {
      setDetectionState(prev => ({
        ...prev,
        detectionFps: frameCount.current
      }));
      frameCount.current = 0;
      lastFpsUpdateTime.current = time;
      
      // Periodic tensor memory cleanup (every 5 seconds)
      if (frameCount.current % 5 === 0) {
        cleanupTensorMemory();
      }
    }
    
    try {
      setDetectionState(prev => ({ ...prev, isDetecting: true }));
      
      // Check video element is ready
      if (videoRef.current.readyState < 2) {
        console.warn('Video not fully loaded for detection');
        requestRef.current = requestAnimationFrame(
          (newTime) => detectFrame(newTime, onDetectionResult)
        );
        return;
      }
      
      // Perform detection
      const detectionResult = await performDetection(videoRef.current);
      
      // Pass detection result to callback
      if (detectionResult) {
        onDetectionResult(detectionResult);
      }
      
      setDetectionState(prev => ({ 
        ...prev, 
        isDetecting: true,
        detectionError: null
      }));
    } catch (error) {
      console.error('Error in detection:', error);
      setDetectionState(prev => ({ 
        ...prev, 
        isDetecting: false,
        detectionError: 'Detection failed'
      }));
      
      // Check if we need to reset model due to recurring errors
      if ((error as any)?.message?.includes('memory') || (error as any)?.message?.includes('tensor')) {
        cleanupTensorMemory();
      }
    }
    
    // Continue detection loop
    requestRef.current = requestAnimationFrame(
      (newTime) => detectFrame(newTime, onDetectionResult)
    );
  }, [videoRef, detectionState.isModelLoaded, cleanupTensorMemory]);

  // Start detection
  const startDetection = useCallback((
    onDetectionResult: (result: DetectionResult) => void
  ) => {
    if (!detectionState.isDetecting && detectionState.isModelLoaded) {
      console.log('Starting detection loop');
      requestRef.current = requestAnimationFrame(
        (time) => detectFrame(time, onDetectionResult)
      );
      setDetectionState(prev => ({ ...prev, isDetecting: true }));
    } else if (!detectionState.isModelLoaded) {
      // Try to load the model and then start detection
      loadModel().then(success => {
        if (success) {
          console.log('Starting detection loop after model load');
          requestRef.current = requestAnimationFrame(
            (time) => detectFrame(time, onDetectionResult)
          );
          setDetectionState(prev => ({ ...prev, isDetecting: true }));
        }
      });
    }
  }, [detectFrame, detectionState.isDetecting, detectionState.isModelLoaded, loadModel]);

  // Stop detection
  const stopDetection = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      setDetectionState(prev => ({ ...prev, isDetecting: false }));
      console.log('Stopping detection loop');
      cleanupTensorMemory();
    }
  }, [cleanupTensorMemory]);
  
  return {
    detectionState,
    loadModel,
    startDetection,
    stopDetection,
    requestRef
  };
};
