
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

/**
 * Handles camera device setup, permissions, and error handling
 */
export const useCameraSetup = () => {
  /**
   * Requests camera access and returns the media stream
   */
  const requestCameraAccess = useCallback(async () => {
    try {
      console.log("Requesting camera access...");
      
      // Request camera permission and turn on camera
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
          frameRate: { ideal: 30 }
        },
        audio: false
      });
      
      console.log("Camera access granted");
      return { stream, error: null };
    } catch (error) {
      console.error('Error accessing camera:', error);
      
      // Handle specific errors
      let errorMessage = "Failed to access camera";
      
      if (error instanceof DOMException) {
        if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          errorMessage = "No camera found. Please connect a camera and try again.";
        } else if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          errorMessage = "Camera access denied. Please allow camera access in your browser settings.";
          return { stream: null, error: errorMessage, permissionDenied: true };
        } else if (error.name === 'AbortError') {
          errorMessage = "Camera access was aborted. Please try again.";
        }
      }
      
      toast({
        title: "Camera Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      return { stream: null, error: errorMessage };
    }
  }, []);
  
  return {
    requestCameraAccess
  };
};
