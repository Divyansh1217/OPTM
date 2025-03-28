
import { useState, useRef, useCallback, useEffect } from 'react';
import { VideoStatus } from '../hooks/detection/types';
import { useVideoElement } from './useVideoElement';
import { useCameraToggle } from './useCameraToggle';

export const useCamera = () => {
  // State
  const [cameraActive, setCameraActive] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [permission, setPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [videoStatus, setVideoStatus] = useState<VideoStatus>({
    isReady: false,
    hasStream: false,
    resolution: null,
    lastCheckTime: 0,
    errorCount: 0
  });
  
  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mountedRef = useRef<boolean>(true);
  const setupTimeoutRef = useRef<number | null>(null);
  
  // Get video element utilities
  const { setupVideoElement, ensureVideoIsPlaying, checkVideoStatus } = useVideoElement();
  
  // Request camera access
  const requestCameraAccess = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return {
          stream: null,
          error: 'Camera access not supported in this browser'
        };
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });
      
      return { stream, error: null };
    } catch (err: any) {
      console.error('Error accessing camera:', err);
      
      // Handle permission denied error
      if (err.name === 'NotAllowedError') {
        return {
          stream: null,
          error: 'Camera access was denied. Please allow camera access.',
          permissionDenied: true
        };
      }
      
      // Handle device not found error
      if (err.name === 'NotFoundError') {
        return {
          stream: null,
          error: 'No camera found. Please connect a camera and try again.'
        };
      }
      
      // Handle other errors
      return {
        stream: null,
        error: `Camera error: ${err.message || 'Unknown error'}`
      };
    }
  }, []);
  
  // Stop the camera stream
  const stopCamera = useCallback(() => {
    try {
      // Clean up any timeout
      if (setupTimeoutRef.current) {
        window.clearTimeout(setupTimeoutRef.current);
        setupTimeoutRef.current = null;
      }
      
      // Stop all tracks in the stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      // Clear video source
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      // Reset state
      setCameraActive(false);
      setVideoStatus(prev => ({
        ...prev,
        isReady: false,
        hasStream: false
      }));
      
      console.log('Camera stopped successfully');
    } catch (error) {
      console.error('Error stopping camera:', error);
    }
  }, []);
  
  // Wait for video element to be available
  const waitForVideoElement = useCallback(async (
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
  ): Promise<boolean> => {
    // Check if video element exists
    if (!videoRef.current) {
      console.error("Video element not found in DOM");
      return false;
    }
    
    return true;
  }, []);
  
  // Use camera toggle hook
  const { toggleCamera } = useCameraToggle({
    cameraActive,
    isInitializing,
    videoRef,
    canvasRef,
    streamRef,
    mountedRef,
    setupTimeoutRef,
    setCameraActive,
    setPermission,
    setCameraError,
    setIsInitializing,
    setVideoStatus,
    stopCamera,
    requestCameraAccess,
    setupVideoElement,
    ensureVideoIsPlaying,
    checkVideoStatus,
    waitForVideoElement
  });
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      stopCamera();
    };
  }, [stopCamera]);
  
  return {
    videoRef,
    canvasRef,
    cameraActive,
    isInitializing,
    videoStatus,
    permission,
    cameraError,
    toggleCamera,
    stopCamera
  };
};
