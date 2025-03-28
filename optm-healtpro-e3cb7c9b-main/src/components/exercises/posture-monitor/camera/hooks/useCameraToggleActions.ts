
import { useCallback } from 'react';
import { VideoStatus } from '../../hooks/detection/types';

interface UseCameraToggleActionsProps {
  requestCameraAccess: () => Promise<{ stream: MediaStream | null; error: string | null; permissionDenied?: boolean }>;
  streamRef: React.MutableRefObject<MediaStream | null>;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  setupTimeoutRef: React.MutableRefObject<number | null>;
  mountedRef: React.MutableRefObject<boolean>;
  setPermission: (permission: 'granted' | 'denied' | 'prompt') => void;
  setCameraError: (error: string | null) => void;
  setVideoStatus: React.Dispatch<React.SetStateAction<VideoStatus>>;
  setIsInitializing: (initializing: boolean) => void;
  stopCamera: () => void;
  setupVideoElement: (
    videoRef: React.MutableRefObject<HTMLVideoElement | null>,
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
    stream: MediaStream
  ) => Promise<boolean>;
  ensureVideoIsPlaying: (
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
  ) => Promise<boolean>;
}

export const useCameraToggleActions = ({
  requestCameraAccess,
  streamRef,
  videoRef,
  canvasRef,
  setupTimeoutRef,
  mountedRef,
  setPermission,
  setCameraError,
  setVideoStatus,
  setIsInitializing,
  stopCamera,
  setupVideoElement,
  ensureVideoIsPlaying
}: UseCameraToggleActionsProps) => {
  
  // Request camera permission and get stream
  const getCameraStream = useCallback(async (): Promise<boolean> => {
    // Request camera permission and turn on camera
    const { stream, error, permissionDenied } = await requestCameraAccess() || {};
    
    if (error) {
      setCameraError(error);
      if (permissionDenied) {
        setPermission('denied');
      }
      setIsInitializing(false);
      return false;
    }
    
    if (!stream) {
      setCameraError("Failed to access camera stream");
      setIsInitializing(false);
      return false;
    }
    
    streamRef.current = stream;
    
    // Update video status with stream
    setVideoStatus(prevStatus => ({
      ...prevStatus,
      hasStream: true,
      lastCheckTime: Date.now()
    }));
    
    return true;
  }, [requestCameraAccess, streamRef, setPermission, setCameraError, setVideoStatus, setIsInitializing]);
  
  // Set up video element with stream
  const setupVideo = useCallback(async (stream: MediaStream): Promise<boolean> => {
    if (!videoRef.current) {
      console.error("Video element not found in DOM after check");
      setCameraError("Video element not available. Please reload and try again.");
      stopCamera();
      return false;
    }
    
    // Setup video element
    const videoSetupSuccess = await setupVideoElement(videoRef, canvasRef, stream);
    
    if (!videoSetupSuccess) {
      setCameraError("Failed to setup video element");
      stopCamera();
      return false;
    }
    
    // Wait a bit longer to ensure video is ready
    await new Promise(resolve => {
      const timeoutId = window.setTimeout(resolve, 800);
      setupTimeoutRef.current = timeoutId as unknown as number;
    });
    
    // Double-check component is still mounted
    if (!mountedRef.current) {
      stopCamera();
      return false;
    }
    
    return true;
  }, [videoRef, canvasRef, setCameraError, stopCamera, setupVideoElement, setupTimeoutRef, mountedRef]);
  
  // Ensure video is playing and recover if needed
  const ensureVideoPlayback = useCallback(async (): Promise<boolean> => {
    if (!videoRef.current) return false;
    
    // Double-check video state and try to recover if needed
    if (videoRef.current.paused) {
      console.log("Video not playing after setup, trying again");
      
      const playSuccess = await ensureVideoIsPlaying(videoRef);
      if (!playSuccess) {
        console.error("Failed to play video after retry");
        setCameraError("Could not start video playback. Please try again.");
        stopCamera();
        return false;
      }
    }
    
    return true;
  }, [videoRef, ensureVideoIsPlaying, setCameraError, stopCamera]);
  
  return {
    getCameraStream,
    setupVideo,
    ensureVideoPlayback
  };
};
