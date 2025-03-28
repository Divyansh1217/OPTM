
import { useCallback } from 'react';

interface UseVideoSetupProps {}

export const useVideoSetup = (props?: UseVideoSetupProps) => {
  // Set up the video element with the camera stream
  const setupVideoElement = useCallback(async (
    videoRef: React.MutableRefObject<HTMLVideoElement | null>,
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
    stream: MediaStream
  ): Promise<boolean> => {
    try {
      if (!videoRef.current) {
        console.error("Video element not found while setting up");
        return false;
      }
      
      // Set video source to the stream
      videoRef.current.srcObject = stream;
      
      // Wait for video metadata to load (dimensions, etc.)
      await videoRef.current.play();
      
      // Set canvas dimensions to match video
      if (canvasRef.current && videoRef.current.videoWidth && videoRef.current.videoHeight) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
      }
      
      return true;
    } catch (error) {
      console.error("Error setting up video element:", error);
      return false;
    }
  }, []);
  
  return { setupVideoElement };
};
