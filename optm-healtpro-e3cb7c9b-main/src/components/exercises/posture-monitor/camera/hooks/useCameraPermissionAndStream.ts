
import { useCallback } from 'react';
import { VideoStatus } from '../../hooks/detection/types';

interface UseCameraPermissionAndStreamProps {
  requestCameraAccess: () => Promise<{ stream: MediaStream | null; error: string | null; permissionDenied?: boolean }>;
  streamRef: React.MutableRefObject<MediaStream | null>;
  setPermission: (permission: 'granted' | 'denied' | 'prompt') => void;
  setCameraError: (error: string | null) => void;
  setVideoStatus: React.Dispatch<React.SetStateAction<VideoStatus>>;
  setIsInitializing: (initializing: boolean) => void;
}

export const useCameraPermissionAndStream = ({
  requestCameraAccess,
  streamRef,
  setPermission,
  setCameraError,
  setVideoStatus,
  setIsInitializing
}: UseCameraPermissionAndStreamProps) => {
  
  // Request camera access and handle permission responses
  const handleCameraPermission = useCallback(async (): Promise<boolean> => {
    // Request camera permission and stream
    const { stream, error, permissionDenied } = await requestCameraAccess();
    
    // Handle errors in permission or getting stream
    if (error) {
      setCameraError(error);
      if (permissionDenied) {
        setPermission('denied');
      }
      setIsInitializing(false);
      return false;
    }
    
    // Ensure we got a valid stream
    if (!stream) {
      setCameraError("Failed to access camera stream");
      setIsInitializing(false);
      return false;
    }
    
    // Store stream for later use
    streamRef.current = stream;
    
    // Update video status with stream information
    setVideoStatus(prevStatus => ({
      ...prevStatus,
      hasStream: true,
      lastCheckTime: Date.now()
    }));
    
    return true;
  }, [requestCameraAccess, streamRef, setPermission, setCameraError, setVideoStatus, setIsInitializing]);
  
  return {
    handleCameraPermission
  };
};
