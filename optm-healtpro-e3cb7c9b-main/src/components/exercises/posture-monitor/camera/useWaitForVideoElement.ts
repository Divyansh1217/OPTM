
import { useCallback } from 'react';

interface UseWaitForVideoElementProps {
  mountedRef: React.MutableRefObject<boolean>;
}

/**
 * Provides functionality to wait for a video element to be available in the DOM
 */
export const useWaitForVideoElement = ({ mountedRef }: UseWaitForVideoElementProps) => {
  /**
   * Wait for the video element reference to be available
   */
  const waitForVideoElement = useCallback(async (
    videoRef: React.MutableRefObject<HTMLVideoElement | null>
  ): Promise<boolean> => {
    if (videoRef.current) return true;
    
    try {
      // Wait for video element to be available (max 5 seconds)
      let attempts = 0;
      const maxAttempts = 50; // 50 * 100ms = 5 seconds
      
      while (!videoRef.current && attempts < maxAttempts && mountedRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }
      
      if (!mountedRef.current) {
        console.log("Component unmounted while waiting for video element");
        return false;
      }
      
      if (!videoRef.current) {
        console.error("Video element not available after waiting");
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error waiting for video element:", error);
      return false;
    }
  }, [mountedRef]);
  
  return { waitForVideoElement };
};
