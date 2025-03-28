
import { useCallback } from 'react';
import { VideoStatus } from '../../hooks/detection/types';

interface UseVideoSetupManagerProps {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  streamRef: React.MutableRefObject<MediaStream | null>;
  setupTimeoutRef: React.MutableRefObject<number | null>;
  mountedRef: React.MutableRefObject<boolean>;
  setCameraError: (error: string | null) => void;
  stopCamera: () => void;
  setupVideoElement: (
    videoRef: React.MutableRefObject<HTMLVideoElement | null>,
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
    stream: MediaStream
  ) => Promise<boolean>;
  ensureVideoIsPlaying: (
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
  ) => Promise<boolean>;
  checkVideoStatus: (videoRef: React.MutableRefObject<HTMLVideoElement | null>) => { 
    isReady: boolean, 
    details: string,
    resolution: { width: number, height: number } | null 
  };
  setVideoStatus: React.Dispatch<React.SetStateAction<VideoStatus>>;
}

export const useVideoSetupManager = ({
  videoRef,
  canvasRef,
  streamRef,
  setupTimeoutRef,
  mountedRef,
  setCameraError,
  stopCamera,
  setupVideoElement,
  ensureVideoIsPlaying,
  checkVideoStatus,
  setVideoStatus
}: UseVideoSetupManagerProps) => {
  
  // Set up video element with stream
  const setupVideo = useCallback(async (stream: MediaStream): Promise<boolean> => {
    if (!videoRef.current) {
      console.error("Video element not found in DOM after check");
      setCameraError("Video element not available. Please reload and try again.");
      stopCamera();
      return false;
    }
    
    // Setup video element with stream
    const videoSetupSuccess = await setupVideoElement(videoRef, canvasRef, stream);
    
    if (!videoSetupSuccess) {
      setCameraError("Failed to setup video element");
      stopCamera();
      return false;
    }
    
    // Allow some time for video to initialize
    await new Promise(resolve => {
      const timeoutId = window.setTimeout(resolve, 800);
      setupTimeoutRef.current = timeoutId as unknown as number;
    });
    
    // Check component is still mounted
    if (!mountedRef.current) {
      stopCamera();
      return false;
    }
    
    return true;
  }, [videoRef, canvasRef, setCameraError, stopCamera, setupVideoElement, setupTimeoutRef, mountedRef]);
  
  // Ensure video is playing correctly
  const ensureVideoPlayback = useCallback(async (): Promise<boolean> => {
    if (!videoRef.current) return false;
    
    // Check if video is paused and try to play it
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
  
  // Finalize camera setup and update state
  const finalizeCameraSetup = useCallback((isSuccessful: boolean) => {
    if (isSuccessful) {
      // Update video status with successful setup
      setVideoStatus({
        isReady: true,
        hasStream: true,
        resolution: checkVideoStatus(videoRef).resolution,
        lastCheckTime: Date.now(),
        errorCount: 0
      });
      return true;
    }
    return false;
  }, [checkVideoStatus, videoRef, setVideoStatus]);
  
  return {
    setupVideo,
    ensureVideoPlayback,
    finalizeCameraSetup
  };
};
