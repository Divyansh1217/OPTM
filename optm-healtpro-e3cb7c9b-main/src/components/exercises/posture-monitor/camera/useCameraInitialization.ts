
import { useEffect } from 'react';

interface UseCameraInitializationProps {
  mountedRef: React.MutableRefObject<boolean>;
  stopCamera: () => void;
  setupTimeoutRef: React.MutableRefObject<number | null>;
}

export const useCameraInitialization = ({
  mountedRef,
  stopCamera,
  setupTimeoutRef
}: UseCameraInitializationProps) => {
  // Set up mounted ref
  useEffect(() => {
    // Update mountedRef at mount
    mountedRef.current = true;
    
    return () => {
      // Update mountedRef at unmount
      mountedRef.current = false;
      stopCamera();
      
      if (setupTimeoutRef.current) {
        window.clearTimeout(setupTimeoutRef.current);
      }
    };
  }, [mountedRef, stopCamera, setupTimeoutRef]);
};
