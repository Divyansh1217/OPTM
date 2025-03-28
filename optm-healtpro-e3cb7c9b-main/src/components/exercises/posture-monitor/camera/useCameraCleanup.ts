
import { useCallback } from 'react';
import { VideoStatus } from '../hooks/detection/types';

interface UseCameraCleanupProps {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  streamRef: React.MutableRefObject<MediaStream | null>;
  setCameraActive: (active: boolean) => void;
  setCameraError: (error: string | null) => void;
  setVideoStatus: React.Dispatch<React.SetStateAction<VideoStatus>>;
  setupTimeoutRef: React.MutableRefObject<number | null>;
}

export const useCameraCleanup = ({
  videoRef,
  streamRef,
  setCameraActive,
  setCameraError,
  setVideoStatus,
  setupTimeoutRef
}: UseCameraCleanupProps) => {
  
  const cleanupVideoStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [videoRef, streamRef]);
  
  const cleanupTimeouts = useCallback(() => {
    if (setupTimeoutRef.current) {
      window.clearTimeout(setupTimeoutRef.current);
      setupTimeoutRef.current = null;
    }
  }, [setupTimeoutRef]);
  
  const resetCameraState = useCallback(() => {
    setCameraActive(false);
    setCameraError(null);
    setVideoStatus(prevStatus => ({
      ...prevStatus,
      isReady: false,
      hasStream: false,
      lastCheckTime: Date.now()
    }));
  }, [setCameraActive, setCameraError, setVideoStatus]);
  
  const stopCamera = useCallback(() => {
    console.log("Stopping camera...");
    cleanupVideoStream();
    cleanupTimeouts();
    resetCameraState();
  }, [cleanupVideoStream, cleanupTimeouts, resetCameraState]);
  
  return { stopCamera };
};

