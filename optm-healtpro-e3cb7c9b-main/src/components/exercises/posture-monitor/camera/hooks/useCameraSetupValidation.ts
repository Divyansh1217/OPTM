
import { useCallback } from 'react';

interface UseCameraSetupValidationProps {
  setCameraError: (error: string | null) => void;
  setIsInitializing: (initializing: boolean) => void;
  waitForVideoElement: (videoRef: React.MutableRefObject<HTMLVideoElement | null>) => Promise<boolean>;
}

export const useCameraSetupValidation = ({
  setCameraError,
  setIsInitializing,
  waitForVideoElement
}: UseCameraSetupValidationProps) => {
  
  // Validate video element exists and is ready
  const validateVideoElement = useCallback(async (): Promise<boolean> => {
    try {
      // Wait for video element to be available in DOM
      const videoElementReady = await waitForVideoElement({
        current: document.querySelector('video')
      } as React.MutableRefObject<HTMLVideoElement | null>);
      
      if (!videoElementReady) {
        setCameraError("Video element not found or not ready");
        setIsInitializing(false);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error validating video element:", error);
      setCameraError(`Video element validation failed: ${error}`);
      setIsInitializing(false);
      return false;
    }
  }, [setCameraError, setIsInitializing, waitForVideoElement]);
  
  return {
    validateVideoElement
  };
};
