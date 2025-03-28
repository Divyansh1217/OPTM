
import { useCallback } from 'react';
import { useCameraSetupValidation } from './useCameraSetupValidation';

interface UseCameraToggleStateProps {
  mountedRef: React.MutableRefObject<boolean>;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  setCameraError: (error: string | null) => void;
  stopCamera: () => void;
  setIsInitializing: (initializing: boolean) => void;
  waitForVideoElement: (videoRef: React.MutableRefObject<HTMLVideoElement | null>) => Promise<boolean>;
  checkVideoStatus: (videoRef: React.MutableRefObject<HTMLVideoElement | null>) => { isReady: boolean, details: string, resolution: { width: number, height: number } | null };
}

export const useCameraToggleState = ({
  mountedRef,
  videoRef,
  setCameraError,
  stopCamera,
  setIsInitializing,
  waitForVideoElement,
  checkVideoStatus
}: UseCameraToggleStateProps) => {
  
  // Use the validation hook
  const { validateVideoElement } = useCameraSetupValidation({
    setCameraError,
    setIsInitializing,
    waitForVideoElement
  });
  
  // Validate component is still mounted
  const validateComponentMounted = useCallback((): boolean => {
    if (!mountedRef.current) {
      console.log("Component unmounted during camera setup");
      stopCamera();
      return false;
    }
    
    return true;
  }, [mountedRef, stopCamera]);
  
  // Perform final status check
  const performFinalStatusCheck = useCallback(async (): Promise<boolean> => {
    if (!videoRef.current) return false;
    
    // Check video status
    const status = checkVideoStatus(videoRef);
    
    console.log("Final video status check:", status);
    
    if (!status.isReady) {
      console.warn("Video is not ready:", status.details);
      return false;
    }
    
    return true;
  }, [videoRef, checkVideoStatus]);
  
  return {
    validateVideoElement,
    validateComponentMounted,
    performFinalStatusCheck
  };
};
